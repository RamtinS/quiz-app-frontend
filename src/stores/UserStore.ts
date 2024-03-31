import axios from 'axios';
import {defineStore} from 'pinia';
import {LoginService} from "@/services/LoginService";
import {CreateUserService} from "@/services/CreateUserService";
import type {CreateUserRequestDTO} from "@/models/user/CreateUserRequestDTO";
import type {CreateUserResponseDTO} from "@/models/user/CreateUserResponseDTO";
import type {LoginResponseDTO} from "@/models/user/LoginResponseDTO";
import {UserDetailService} from "@/services/UserDetailService";
import type {UserDetailsDTO} from "@/models/user/UserDetailsDTO";

export const useUserStore = defineStore('user', {

  state: () => ({
    isAuthenticated: false,
  }),

  actions: {
    async loginUser(username: string, password: string): Promise<void> {
      try {
        const response: LoginResponseDTO = await LoginService.login({username, password});

        this.setAuthToken(response.token);

        try {
          const userDetails: UserDetailsDTO = await UserDetailService.retrieveUserDetails();

          this.storeUserData(username, userDetails.email, userDetails.name, userDetails.surname);

        } catch (err) {
          console.error("Error retrieving user details:", err);
        }

      } catch (err) {
        throw err;
      }
    },

    async registerUser(createUserRequestDTO: CreateUserRequestDTO): Promise<void> {
      try {
        const response: CreateUserResponseDTO = await CreateUserService.createUser(createUserRequestDTO);

        this.setAuthToken(response.token);

        this.storeUserData(createUserRequestDTO.username, createUserRequestDTO.email,
          createUserRequestDTO.name, createUserRequestDTO.surname);

      } catch (err) {
        throw err;
      }
    },

    logout(): void {
      this.resetToken();
      this.resetUserData();
    },

    setAuthToken(token: string): void {
      sessionStorage.setItem("token", token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      this.isAuthenticated = true;
    },

    storeUserData(username: string, email: string, name: string, surname: string): void {
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("surname", surname);
    },

    getUserData(key: string): string {
      const value: string | null = sessionStorage.getItem(key);
      return (value !== null && value !== "null") ? value : '';
    },

    updateUserNames(name: string, surname: string): void {
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("surname", surname);
    },

    updateUserEmail(email: string): void {
      sessionStorage.setItem("email", email);
    },

    resetToken(): void {
      sessionStorage.removeItem("token");
      axios.defaults.headers.common['Authorization'] = '';
    },

    resetUserData(): void {
      this.isAuthenticated = false;

      sessionStorage.removeItem("username");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("surname");
    },
  },
});