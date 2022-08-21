<template>
<div>
    <div class="navbar">
    <router-link class="links" to="/">Login</router-link>
    <router-link class="links" to="/game_page">Game Page</router-link>
  </div>
</div>
  
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
div{
    background-color: aqua;
    display: grid;
    justify-items: start;
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
