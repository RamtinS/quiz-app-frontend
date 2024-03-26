import axios from 'axios';
import {defineStore} from 'pinia';
import {LoginService} from "@/services/LoginService";
import {CreateUserService} from "@/services/CreateUserService";
import type {CreateUserRequestDTO} from "@/models/user/CreateUserRequestDTO";
import type {CreateUserResponseDTO} from "@/models/user/CreateUserResponseDTO";
import type {LoginResponseDTO} from "@/models/user/LoginResponseDTO";

export const useUserStore = defineStore('user', {

  state: () => ({
    user: {username: ""},
    token: '',
    isAuthenticated: false,
  }),

  actions: {
    async loginUser(username: string, password: string): Promise<void> {
      try {
        const loginService: LoginService = new LoginService();
        const response: LoginResponseDTO = await loginService.login({username, password});

        if (response) {
          this.token = response.token;

          sessionStorage.setItem("token", response.token);

          axios.defaults.headers.common = {'Authorization': `Bearer ${this.token}`}
          this.isAuthenticated = true;
        } else {
          throw new Error("Invalid response.");
        }
      } catch (err) {
        throw err;
      }
    },

    async registerUser(createUserRequestDTO: CreateUserRequestDTO): Promise<void> {

      const createUserService: CreateUserService = new CreateUserService();

      try {
        const response: CreateUserResponseDTO = await createUserService.createUser(createUserRequestDTO);
        if (response) {
          this.token = response.token;

          sessionStorage.setItem("token", response.token);

          axios.defaults.headers['Authorization'] = `Bearer ${this.token}`;

          this.isAuthenticated = true;
        } else {
          throw new Error("Invalid response.");
        }
      } catch (err) {
        throw err;
      }
    },

    logout(): void {
      sessionStorage.removeItem("token");
      this.token = '';
      axios.defaults.headers['Authorization'] = '';
      this.isAuthenticated = false;
    },
  },
});