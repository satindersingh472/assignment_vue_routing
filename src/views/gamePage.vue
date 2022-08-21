<template>
  <div>
    <page-header></page-header>
    <div ref="table">
      <table v-if="cookies_exist !== undefined">
        <tr>
          <td> <button v-on:click="get_number"> Play</button></td>
          <th>WINS</th>
          <th>LOSSES</th>
        </tr>
        <tr>
          <td>Scores</td>
          <td></td>
          <td></td>
        </tr>
      </table>
      <div v-else-if="cookies_exist === undefined">
        <h2>
          Please <router-link class="links" to="/">login In</router-link> first
          to access this page
        </h2>
      </div>
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
    if (Cookies.get(`token`)) {
      this.cookies_exist = true;
    }
  },
  methods: {
    get_number() {
      axios
        .request({
          url: `https://www.randomnumberapi.com/api/v1.0/randomnumber`,
        })
        .then((response) => {
          response;
        })
        .catch((error) => {
          error;
        });
    },
  },
  data() {
    return {
      cookies_exist: undefined,
    };
  },
};
</script>

<style lang="scss" scoped>
td,
th {
  border: 2px solid grey;
  padding: 20px;
  button {
    background-color: aqua;
    padding: 6px;
  }
}
.links {
  text-decoration: none;
}
</style>
