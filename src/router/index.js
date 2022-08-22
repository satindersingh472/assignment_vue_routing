import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from "@/views/loginPage.vue";
import GamePage from "@/views/gamePage.vue";
import LogoutPage from "@/views/logoutPage";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: LoginPage,
    meta:[
      {
        title: `Game_Login`
      },
      {
        name:`description`,
        content: `Welcome to the login page`
      },
      {
        name: `author`,
        content: `satinder singh`
      },
      {
        name: `keywords`,
        content: `secure, easy, quick `
      }
    ]
  },
  {
    path: "/game_page",
    component: GamePage,
    meta:[
      {
        title: `Game_Page`
      },
      {
        name:`description`,
        content: `Welcome to the Game`
      },
      {
        name: `author`,
        content: `satinder singh`
      },
      {
        name: `keywords`,
        content: `fun, enjoy, learn `
      }
    ]
  },
  {
    path: "/log_out",
    component: LogoutPage,
    meta:[
      {
        title: `Game_Logout`
      },
      {
        name:`description`,
        content: `would like to see you back`
      },
      {
        name: `author`,
        content: `satinder singh`
      },
      {
        name: `keywords`,
        content: `thanks, goodbye, see you `
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
 let current_meta_tags = document.querySelectorAll(`meta`);
 for(let i=0; i< current_meta_tags.length;i++){
  current_meta_tags[i].remove();
 }
 let new_meta_tags = to[`meta`];
 document.querySelector(`title`)[`innerText`] = new_meta_tags[0][`title`];

 for (let i = 1; i<new_meta_tags.length; i++){
  document.querySelector(`head`).insertAdjacentHTML(`beforeEnd`,
  `<meta name="${new_meta_tags[i][`name`]}" content="${new_meta_tags[i][`content`]}"/>`);
 }
document.querySelector(`head`).insertAdjacentHTML(`afterbegin`,
`<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width,initial-scale=1.0">`);

  from;
  next();
});

export default router
