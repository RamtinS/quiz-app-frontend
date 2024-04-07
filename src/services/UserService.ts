import type { PublicUserInformationDTO } from "@/models/user/PublicUserInformationDTO";
import axios from "axios";
import type { AxiosResponse } from "axios";
import type { UserStatsDTO } from "@/models/user/UserStatsDTO";

/**
 * Service class for user related operations.
 */
export class UserService {
  private static readonly api_url = "http://localhost:8080/api/v1/users";

  public static async searchUserByUsername(
    username: string,
    page: number,
    pageSize: number,
  ): Promise<PublicUserInformationDTO[]> {
    const url =
      this.api_url +
      "/public?" +
      "search=" +
      username +
      "&page=" +
      page +
      "&size=" +
      pageSize;
    console.log("url: " + url);
    try {
      const response: AxiosResponse<PublicUserInformationDTO[]> =
        await axios.get(url);
      return response.data;
    } catch (err) {
      console.log("error in search service: " + err);
      throw err;
    }
  }

  /**
   * Fetches the user stats of the currently logged-in user.
   */
  public static async getUserStats(): Promise<UserStatsDTO> {
    try {
      const response: AxiosResponse<UserStatsDTO> = await axios.get(
        this.api_url + "/stats",
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Fetches the public user information of a user with the given username.
   * @param username The username of the user.
   */
  public static async getPublicUserInformationFromUsername(
    username: string,
  ): Promise<PublicUserInformationDTO> {
    try {
      const request = this.api_url + "/public/" + username;
      console.log("request: " + request);
      const response: AxiosResponse<PublicUserInformationDTO> =
        await axios.get(request);
      return response.data;
    } catch (err) {
      throw err;
    }
  }
}
