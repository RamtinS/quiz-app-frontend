import axios from "axios";
import type { AxiosResponse } from "axios";
import type { LoginRequestDTO } from "@/models/user/LoginRequestDTO";
import type { LoginResponseDTO } from "@/models/user/LoginResponseDTO";
import type { ErrorResponseDTO } from "@/models/errors/ErrorResponseDTO";

/**
 * Service class for login related operations.
 */
export class LoginService {
  private static readonly api_url = "http://localhost:8080/api/v1/auth";

  /**
   * Logs in a user.
   * @param loginRequest The login request.
   */
  public static async login(
    loginRequest: LoginRequestDTO,
  ): Promise<LoginResponseDTO | ErrorResponseDTO> {
    try {
      const response: AxiosResponse<LoginResponseDTO> = await axios.post(
        this.api_url + "/login",
        loginRequest,
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
}
