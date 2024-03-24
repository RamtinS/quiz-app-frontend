import axios from 'axios';
import type {CreateUserRequestDTO} from "@/models/user/CreateUserRequestDTO";
import type {CreateUserResponseDTO} from "@/models/user/CreateUserResponseDTO";
import type {EditUserDTO} from "@/models/user/EditUserDTO";

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

    async editUser(newInformation: EditUserDTO): Promise<CreateUserResponseDTO> {
        try {
            const response = await axios.put(this.api_url + "/edit", newInformation);
            return response.data;
        } catch (err) {
            console.log('error: ' + err);
            throw err;
        }
    }
}