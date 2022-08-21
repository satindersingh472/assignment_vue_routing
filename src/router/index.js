import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from "@/views/loginPage.vue";
import GamePage from "@/views/gamePage.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: LoginPage
  },
  {
    path: "/game_page",
    component: GamePage
  }

]

const router = new VueRouter({
  routes
})

export default router
