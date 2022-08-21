<template>
  <div>
    <!-- logout page is seperatly created to log out of the game just by clicking the log out link
    after clicking the logout link it will try to redirect to logout page and once logout page is created 
    the lifecycle will help removing the cookies and redirecting to login page -->
    <page-header></page-header>
    <h2 v-if="logged_out !== false">Saved! to continue login again</h2>
  </div>
</template>

<script>
import PageHeader from "@/components/pageHeader.vue";
import Cookies from "vue-cookies";
export default {
  components: {
    PageHeader,
  },
  mounted() {
    // after everything mounted the cookies named token will get removed 
    // and set the logged out to true to show some message on the screen
    // set timeout will redirect to login page in 2 seconds
    Cookies.remove(`token`);
    this.logged_out = true;
    setTimeout(() => {
      this.$router.push("/");
    }, 2000);
  },
  data() {
    return {
      logged_out: false,
    };
  },
};
</script>

<style lang="scss" scoped></style>
