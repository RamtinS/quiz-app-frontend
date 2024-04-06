import {createRouter, createWebHistory} from 'vue-router'
import {useUserStore} from "@/stores/UserStore";
import HomeView from "@/components/home/HomeView.vue";
import QuizBrowser from "@/components/quiz/QuizBrowser.vue";
import NotFound from "@/components/navigation/NotFound.vue";
import FeedbackPage from "@/components/feedback/FeedbackPage.vue";
import QuizCreator from "@/components/quiz/QuizCreator.vue";
import QuizRunnerMenu from "@/components/quiz/QuizHandler/QuizRunnerMenu.vue";
import UserQuizzesView from "@/views/user/UserQuizzesView.vue";
import UserProfileView from "@/views/user/UserProfileView.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import CreateUserView from "@/views/user/CreateUserView.vue";
import UserLogout from "@/components/user/UserLogout.vue";
import QuizEditWrapper from "@/components/quiz/QuizEditWrapper.vue";

import UserStatsView from "@/views/user/UserStatsView.vue";

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
      path: '/login/:tokenStatus?',
      name: 'login',
      component: UserLoginView,
      meta: {authRequired: false}
    },
    {
      path: '/logout',
      name: 'logout',
      component: UserLogout,
      beforeEnter: (_to, _from, next) => {
        logOut();
        next();
      }
    },
    {
      path: '/register-user',
      name: 'register',
      component: CreateUserView,
      meta: {authRequired: false}
    },
    {
      path: '/user-profile',
      name: 'user-profile',
      component: UserProfileView,
      meta: {authRequired: true}
    },
    {
      path: '/user-stats',
      name: 'user-stats',
      component: UserStatsView,
      meta: {authRequired: true}
    },
    {
      path: '/user-quizzes',
      name: 'user-quizzes',
      component: UserQuizzesView,
      meta: {authRequired: true}
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
      component: QuizRunnerMenu,
      meta: {authRequired: false}
    },
    {
      path: '/contact',
      name: 'contact',
      component: FeedbackPage,
      meta: {authRequired: false}
    },
    {
      path: '/quiz-creator',
      name: 'quiz-creator',
      component: QuizCreator,
      meta: {authRequired: false}
    },
    {
      path: '/quiz-editor/:quizId',
      name: 'quiz-editor',
      component: QuizEditWrapper,
    },
    {
      path: '/:pathName(.*)',
      name: 'not-found',
      component: NotFound,
      meta: {authRequired: false}
    }
  ]
})

function isAuthenticated() {
  const store = useUserStore();
  return store.isAuthenticated;
}

function logOut() {
  const store = useUserStore();
  store.logout();
}

router.beforeEach(async (to, from) => {
  console.log('Trying to go from ' + from.name?.toString() + ' to: ' + to.name?.toString())

  if (to.meta.authRequired) {
    if (isAuthenticated()) {
      return true;
    } else {
      return {
        name: 'login',
        query: {redirect: to.fullPath} // store the route the user was trying to access
      }
    }
  } else {
    return true;
  }

})

export default router
