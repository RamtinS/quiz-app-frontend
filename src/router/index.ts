import { createRouter, createWebHistory } from 'vue-router'
import UserLogin from "@/components/user/UserLogin.vue";
import {useUserStore} from "@/stores/UserStore";
import NotFound from "@/components/navigation/NotFound.vue";
import HomeView from "@/components/home/HomeView.vue";

const whitelist = ['login'];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {authRequired: false}
    },
    {
      path: '/login',
      name: 'login',
      component: UserLogin,
      meta: {authRequired: false}
    },
    {
      path: '/:pathName(.*)',
      name: 'NotFound',
      component: NotFound,
      meta: {authRequired : false}
    }
  ]
})

function isAuthenticated() {
  const store= useUserStore();
  return store.isAuthenticated;
}

router.beforeEach(async (to, from) => {
  console.log('Trying to go from ' + from.name?.toString() + ' to: ' + to.name?.toString())

  if (to.meta.authRequired){
    if (isAuthenticated()){
      return true;
    } else {
      return { name: 'login' }
    }

  } else {
    return true;
  }

})


export default router
