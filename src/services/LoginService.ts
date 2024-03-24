import axios from 'axios';

import type { AxiosResponse } from 'axios';
import type {LoginRequestDTO} from "@/models/user/LoginRequestDTO";
import type {LoginResponseDTO} from "@/models/user/LoginResponseDTO";
export class LoginService {
    private readonly api_url = "http://localhost:8080/api/v1/auth"

    async login(loginRequest: LoginRequestDTO) {
        try {
            console.log('Trying to log in with u:' + loginRequest.username + ' pw:' + loginRequest.password);

            const result: AxiosResponse<LoginResponseDTO> = await axios.post(this.api_url + "/login", loginRequest);
            if (result.status === 200) {
                console.log("token is " + result.data.token)
                return result.data;
            }
        } catch (err) {
            console.log('error: ' + err);
            throw err;
        }
    }
}