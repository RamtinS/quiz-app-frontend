import router from "@/router";

export class ExpiredTokenService {
  /**
   * Pushes the user to the login page with a message that their token has expired.
   */
  public static async refreshAccessToken() {
    await router.push({
      name: 'login',
      params: { tokenStatus: "expired" },
      query: { redirect: router.currentRoute.value.fullPath }
    });
  }
}