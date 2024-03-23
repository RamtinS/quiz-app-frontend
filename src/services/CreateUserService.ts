import axios from 'axios';
import type {CreateUserRequestDTO} from "@/models/user/CreateUserRequestDTO";
import type {CreateUserResponseDTO} from "@/models/user/CreateUserResponseDTO";

export class CreateUserService {
    private readonly api_url = "http://localhost:8080/api/v1"

    async createUser(createUserRequestDTO: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
        try {
            const response = await axios.post(this.api_url + "/register", createUserRequestDTO);
            return response.data;
        } catch (err) {
            console.log('error: ' + err);
            throw err;
        }
    }
}