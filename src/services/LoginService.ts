import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type {LoginRequestDTO} from "@/models/user/LoginRequestDTO";
import type {LoginResponseDTO} from "@/models/user/LoginResponseDTO";

export class LoginService {
  private static readonly api_url = "http://localhost:8080/api/v1/auth"

  public static async login(loginRequest: LoginRequestDTO) : Promise<LoginResponseDTO> {
    try {
      const response: AxiosResponse<LoginResponseDTO> = await axios.post(this.api_url + "/login", loginRequest);

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }

    } catch (err) {
      throw err;
    }
  }
}