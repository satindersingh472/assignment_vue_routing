<template>
  <div>
    <div class="navbar">
      <!-- this router link will redirct to login page  -->
      <router-link v-if="logged_in === false" class="links" to="/"
        >LogIn</router-link
      >
      <!-- this router link will logout if logged in true  -->
      <router-link v-if="logged_in === true" class="links" to="/log_out"
        >LogOut</router-link
      >
      <!-- this router link will redirect to the game -->
      <router-link class="links" to="/game_page">Game Page</router-link>
    </div>
  </div>
</template>

<script>
import Cookies from "vue-cookies";
export default {
  mounted() {
    if (Cookies.get(`token`)) {
      this.logged_in = true;
    }
  },
  data() {
    return {
      logged_in: false,
    };
  },
};
</script>

<style lang="scss" scoped>
div {
  background-color: aqua;
  display: grid;
  justify-items: center;
}
.navbar {
  height: 10vh;
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  .links {
    text-decoration: none;
    padding: 20px;
  }
}
</style>
