<template>
  <div class="body">
    <page-header></page-header>
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
    <div v-if="logged_in === true">
        <h2>Login successfull, redirecting to the game page</h2>
    </div>
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
    login() {
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
          cookies.set(`token`, response[`data`][`token`]);
          this.logged_in = true;
          setTimeout(() => {
            this.$router.push(`game_page`);
          }, 2000);
        })
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
