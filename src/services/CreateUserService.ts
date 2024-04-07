import axios from "axios";
import type { AxiosResponse } from "axios";
import type { CreateUserRequestDTO } from "@/models/user/CreateUserRequestDTO";
import type { CreateUserResponseDTO } from "@/models/user/CreateUserResponseDTO";
import type { ErrorResponseDTO } from "@/models/errors/ErrorResponseDTO";

/**
 * Service class for creating a new user.
 */
export class CreateUserService {
  private static readonly api_url = "http://localhost:8080/api/v1/auth";

  /**
   * Creates a new user.
   * @param createUserRequestDTO The user details to be created.
   * @throws Error if the user creation fails.
   */
  public static async createUser(
    createUserRequestDTO: CreateUserRequestDTO,
  ): Promise<CreateUserResponseDTO | ErrorResponseDTO> {
    try {
      const response: AxiosResponse<CreateUserResponseDTO> = await axios.post(
        this.api_url + "/register",
        createUserRequestDTO,
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
}
