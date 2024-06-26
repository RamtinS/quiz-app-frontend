import axios from "axios";
import type { AxiosResponse } from "axios";
import type { EditUserDTO } from "@/models/user/EditUserDTO";
import type { UserDetailsDTO } from "@/models/user/UserDetailsDTO";

/**
 * Service class for user detail operations.
 */
export class UserDetailService {
  private static readonly api_url = "http://localhost:8080/api/v1/users";

  /**
   * Edits the user details of the currently logged-in user.
   * @param newUserDetails The new user details to be set.
   */
  public static async editUserDetails(
    newUserDetails: EditUserDTO,
  ): Promise<void> {
    try {
      await axios.put(this.api_url, newUserDetails);
    } catch (err) {
      throw err;
    }
  }

  /**
   * Retrieves the user details of the currently logged-in user.
   */
  public static async retrieveUserDetails(): Promise<UserDetailsDTO> {
    try {
      const response: AxiosResponse<UserDetailsDTO> = await axios.get(
        this.api_url + "/details",
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
}
