import { createRouter, createWebHistory } from 'vue-router'
import UserLogin from "@/components/user/UserLogin.vue";
import {useUserStore} from "@/stores/UserStore";
import HomeView from "@/components/home/HomeView.vue";
import QuizBrowser from "@/components/quiz/QuizBrowser.vue";
import QuizRunner from "@/components/quiz/QuizRunner.vue";
import CreateUser from "@/components/user/CreateUser.vue";
import NotFound from "@/components/navigation/NotFound.vue";

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
      path: '/register-user',
      name: 'register',
      component: CreateUser,
      meta: {authRequired: false}
    },
    {
      path: '/quiz-browser',
      name: 'quiz-browser',
      component: QuizBrowser,
      meta: {authRequired: false}
    },
    {
      path: '/quiz-runner/:quizId',
      name: 'quiz-runner',
      component: QuizRunner,
      meta: {authRequired: false}
    },
    {
      path: '/:pathName(.*)',
      name: 'not-found',
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
