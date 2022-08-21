<template>
  <div class="body">
    <!-- page header component will carry the navigation section -->
    <page-header></page-header>
    <!-- login form will have the input fields and submit button -->
    <div class="login_form">
      <p>Email:</p>
      <input type="text" ref="email" placeholder="eve.holt@reqres.in" />
      <p>Password:</p>
      <input
        type="text"
        name="password"
        ref="password"
        placeholder="Any Password"
      />
      <input type="submit" value="submit" @click="login" />
    </div>
    <!-- following div will be displayed based on condition if logged in is true -->
    <div v-if="logged_in === true">
        <h2>Login successfull, redirecting to the game page</h2>
    </div>
    <!-- following div will get displayed of logged in is false -->
    <div v-else-if="logged_in !== undefined">
        <h2>{{logged_in}}</h2>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/pageHeader.vue";
import axios from "axios";
import cookies from "vue-cookies";
export default {
  components: {
    PageHeader,
  },
  methods: {
    // login method is triggered by submit button in form
    login() {
        // following variables will store value from form inputs
      this.email_value = this.$refs[`email`][`value`];
      this.password_value = this.$refs[`password`][`value`];
      axios
        .request({
          url: `https://reqres.in/api/login`,
          method: `POST`,
          data: {
            email: this.email_value,
            password: this.password_value,
          },
        })
        .then((response) => {
            // if we get response it will be set to cookies under name token
          cookies.set(`token`, response[`data`][`token`]);
        //   after setting cookies it will change the value of logged in which helps displaying message
          this.logged_in = true;
        //   if response successful and cookies created then after 2 seconds it will redirect to game page
          setTimeout(() => {
            this.$router.push(`game_page`);
          }, 2000);
        })
        // if there is an error in getting api then logged in variable
        // will have the value that is given here
        .catch((error) => {
          this.logged_in = `Login failed due to ${error[`response`][`data`][`error`]}`;
        });
    },
  },
  data() {
    return {
      email_value: undefined,
      password_value: undefined,
      logged_in: undefined

    };
  },
};
</script>

<style scoped>
h2{
    color: red;
    font-weight: 300;
}
</style>
