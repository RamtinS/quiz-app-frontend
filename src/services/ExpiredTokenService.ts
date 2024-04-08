import router from "@/router";
import { useUserStore } from "@/stores/UserStore";

/**
 * Service for handling expired tokens.
 */
export class ExpiredTokenService {
  /**
   * Pushes the user to the login page with a message that their token has expired.
   */
  public static async refreshAccessToken() {
    const store = useUserStore();
    store.logout();
    await router.push({
      name: "login",
      params: { tokenStatus: "expired" },
      query: { redirect: router.currentRoute.value.fullPath },
    });
  }
}
