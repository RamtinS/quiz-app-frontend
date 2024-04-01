import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type {CreateUserRequestDTO} from "@/models/user/CreateUserRequestDTO";
import type {CreateUserResponseDTO} from "@/models/user/CreateUserResponseDTO";

export class CreateUserService {
  private static readonly api_url = "http://localhost:8080/api/v1/auth"

  public static async createUser(createUserRequestDTO: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    try {
      const response: AxiosResponse<CreateUserResponseDTO> = await axios.post(this.api_url + "/register", createUserRequestDTO);

      if (response.status === 201) {
        return response.data;
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }

    } catch (err) {
      throw err;
    }
  }
}