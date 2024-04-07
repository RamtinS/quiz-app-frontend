import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/UserStore";
import QuizBrowser from "@/components/quiz/browser/QuizBrowser.vue";
import NotFound from "@/components/navigation/redirects/NotFound.vue";
import FeedbackPage from "@/components/feedback/FeedbackPage.vue";
import QuizCreator from "@/components/quiz/creation/questions/QuizCreator.vue";
import QuizRunnerMenu from "@/components/quiz/quizplayer/QuizRunnerWrapper.vue";
import UserQuizzesView from "@/views/user/UserQuizzesView.vue";
import UserProfileView from "@/views/user/UserProfileView.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import CreateUserView from "@/views/user/CreateUserView.vue";
import UserLogout from "@/components/user/UserLogout.vue";
import QuizEditWrapper from "@/components/quiz/creation/questions/QuizEditWrapper.vue";

import UserStatsView from "@/views/user/UserStatsView.vue";
import PublicProfile from "@/components/user/PublicProfile.vue";

/**
 * The router for the application
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: QuizBrowser,
      meta: { authRequired: false },
    },
    {
      path: "/login/:tokenStatus?",
      name: "login",
      component: UserLoginView,
      meta: { authRequired: false },
    },
    {
      path: "/logout",
      name: "logout",
      component: UserLogout,
      meta: { authRequired: false },
      beforeEnter: (_to, _from, next) => {
        logOut();
        next();
      },
    },
    {
      path: "/register-user",
      name: "register",
      component: CreateUserView,
      meta: { authRequired: false },
    },
    {
      path: "/user-profile",
      name: "user-profile",
      component: UserProfileView,
      meta: { authRequired: true },
    },
    {
      path: "/user-stats",
      name: "user-stats",
      component: UserStatsView,
      meta: { authRequired: true },
    },
    {
      path: "/user-quizzes",
      name: "user-quizzes",
      component: UserQuizzesView,
      meta: { authRequired: true },
    },
    {
      path: "/quiz-runner/:quizId",
      name: "quiz-runner",
      component: QuizRunnerMenu,
      meta: { authRequired: false },
    },
    {
      path: "/contact",
      name: "contact",
      component: FeedbackPage,
      meta: { authRequired: false },
    },
    {
      path: "/quiz-creator",
      name: "quiz-creator",
      component: QuizCreator,
      meta: { authRequired: true },
    },
    {
      path: "/quiz-editor/:quizId",
      name: "quiz-editor",
      component: QuizEditWrapper,
      meta: { authRequired: true },
    },
    {
      path: "/user/:username",
      name: "profile-viewer",
      component: PublicProfile,
      meta: { authRequired: true },
    },
    {
      path: "/:pathName(.*)",
      name: "not-found",
      component: NotFound,
      meta: { authRequired: false },
    },
  ],
});

/**
 * Returns whether the user is authenticated or not
 */
function isAuthenticated() {
  const store = useUserStore();
  return store.isAuthenticated;
}

/**
 * Logs the user out
 */
function logOut() {
  const store = useUserStore();
  store.logout();
}

/**
 * Before each route, check if the user is authenticated, if the route requires authentication,
 * send the user to the login page with a redirect query.
 */
router.beforeEach(async (to, _from) => {

  if (to.meta.authRequired) {
    if (isAuthenticated()) {
      return true;
    } else {
      return {
        name: "login",
        query: { redirect: to.fullPath }, // store the route the user was trying to access
      };
    }
  } else {
    return true;
  }
});

export default router;
