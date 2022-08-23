<template>
  <div class="game_page">
    <!-- page component will be present -->
    <page-header></page-header>
    <!--following div has 2 children display table or msg depending on condition -->
    <div class="table">
      <!-- if cookies exist with token or if user is logged in table will be displayed  -->
      <table v-if="cookies_exist !== undefined">
        <tr>
          <!-- row 1 has button to play by triggerring get number function and restart button to resrtart the game-->
          <td class="buttons">
            <button v-on:click="get_number">Play</button>
            <button v-on:click="reset_game">Restart</button>
          </td>
          <th>WINS</th>
          <th>LOSSES</th>
        </tr>
        <!-- following row will have score data -->
        <tr>
          <th>Scores</th>
          <td>{{ win_count }}</td>
          <td>{{ loss_count }}</td>
        </tr>
      </table>
      <!-- if no cookies named token exists or cookies exist is undefined msg is shown inside h2 tag -->
      <div v-else-if="cookies_exist === undefined">
        <h2>
          Please <router-link class="links" to="/">login In</router-link> first
          to access this page
        </h2>
      </div>
    </div>
    <!-- if there is an error then message variable will be set to error from api 
    and message varibale will be not undefined because it will contain some value and then the conditional will display the following div -->
    <div v-if="cookies_exist !== undefined" class="inform">
      <h2 v-if="message !== undefined">
        Press Play Again to play <br />
        Scoreboard was not able to update due to {{ message }}
      </h2>
      <!-- if there is no error then message will stay undefined and the following html will get displayed -->
      <h2 v-if="message === undefined">Score must be 50 or above to win!!!</h2>
      <h2 class="score" v-if="message === undefined">SCORE: {{ score }}</h2>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/pageHeader.vue";
import Cookies from "vue-cookies";
import axios from "axios";
export default {
  components: {
    PageHeader,
  },
  mounted() {
    // following code will check for cookies of  levels
    // if page get refresh the user will still have same difficulty selected and resume the game
    if (Cookies.get(`level`)) {
      this.number = Number(Cookies.get(`level`));
    } else {
      // if there is a fresh start then the level will be one 
      // because the level is decided by number
      this.number = 1;
    }
    this.$root.$on(`send_number`, this.change_number);
    // when page is loaded it will check for cookies names token and set cookies_exist equal to true
    // which then help table div to show something on the page according to conditions
    if (Cookies.get(`token`)) {
      this.cookies_exist = true;
    }
    // if cookies win and loss exist on refreshing the page then the value of win and loss count
    // will be set to existing values of win and loss cookies which then help check count function
    // to resume adding number to win and loss count
    if (Cookies.get(`win`) && Cookies.get(`loss`)) {
      this.win_count = Cookies.get(`win`);
      this.loss_count = Cookies.get(`loss`);
    } else {
      // if above condition is not true then in any other condition win and loss count will be 0 or stay 0.
      this.win_count = 0;
      this.loss_count = 0;
    }
  },
  methods: {
    change_number(number) {
      this.number = number;
    },
    // reset game will get triggered by restart button
    // it will set the variables to zero
    reset_game() {
      this.win_count = 0;
      Cookies.remove(`win`);
      this.loss_count = 0;
      Cookies.remove(`loss`);
      this.score = 0;
    },
    // check count is triggered by api response if it is successful
    // it will check the score value which is set though response
    // if score value is greater than or equal to 50 it will increase only win count by one
    // and update the cookies value of win equal to the new win count
    check_count() {
      if (this.score >= 50) {
        this.win_count = Number(this.win_count) + Number(this.number);
        Cookies.set(`win`, this.win_count);
      } else if (this.score < 50) {
        // else if score value is less than 50 then it will increase only the loss count by one
        // and update the cookies value of loss equal to the new loss count
        this.loss_count = Number(this.loss_count) + Number(this.number);
        Cookies.set(`loss`, this.loss_count);
      }
    },
    // get number method is triggered by button present in table
    // get number will send axios the axios request
    get_number() {
      axios
        .request({
          url: `https://www.randomnumberapi.com/api/v1.0/randomnumber`,
        })
        // if there is response then the score variable will get updated to the newer value of response
        // and call the check count function
        .then((response) => {
          this.score = response[`data`][0];
          // will check for cookies named level if it is there then refreshing page will not change the level of difficulty
            this.check_count();
        })
        // if there is an error with api then message variable will store the value of the error
        .catch((error) => {
          this.message = error[`message`];
        });
    },
  },
  data() {
    return {
      // cookies exist variable will be used for loggin purpose
      cookies_exist: undefined,
      //   score will be used for response of the api
      score: 0,
      //   win count will be used for counting wins
      win_count: 0,
      //   loss count will be used for counting losses
      loss_count: 0,
      //   message will be used for storing error messages
      message: undefined,
      // number will be used to store value from other component and help showing win and loss count
      number: undefined,
    };
  },
};
</script>

<style lang="scss" scoped>
.game_page {
  margin: auto;
  .table {
    display: grid;
    grid-auto-flow: column;
  }
}
td,
th,
.td {
  text-align: center;
  border: 2px solid grey;
  padding: 20px;
  button {
    background-color: aqua;
    padding: 20px;
    font-size: 2rem;
  }
}
.buttons {
  display: grid;
  gap: 10px;
}
.links {
  text-decoration: none;
}
.inform {
  h2 {
    color: red;
    font-weight: 300;
  }
  .score {
    font-size: 4rem;
  }
}
</style>
