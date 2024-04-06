import axios from 'axios';
import {defineStore} from 'pinia';
import {LoginService} from "@/services/LoginService";
import {CreateUserService} from "@/services/CreateUserService";
import {UserDetailService} from "@/services/UserDetailService";
import type {CreateUserRequestDTO} from "@/models/user/CreateUserRequestDTO";
import type {CreateUserResponseDTO} from "@/models/user/CreateUserResponseDTO";
import type {LoginResponseDTO} from "@/models/user/LoginResponseDTO";
import type {UserDetailsDTO} from "@/models/user/UserDetailsDTO";
import type {ErrorResponseDTO} from "@/models/ErrorResponseDTO";

export const useUserStore = defineStore('user', {

  state: () :{ surname: string; name: string; isAuthenticated: boolean;
    email: string; username: string; token: string } => ({

    username: sessionStorage.getItem("username") || "",
    email: sessionStorage.getItem("email") || "",
    name: sessionStorage.getItem("name") || "",
    surname: sessionStorage.getItem("surname") || "",
    token: sessionStorage.getItem("token") || "",
    isAuthenticated: sessionStorage.getItem("isAuthenticated") === "true"
  }),

  actions: {

    /**
     * Logs in a user with the provided username and password.
     *
     * @param username The username of the user.
     * @param password The password of the user.
     */
    async loginUser(username: string, password: string): Promise<void> {
      try {
        const response: LoginResponseDTO | ErrorResponseDTO = await LoginService.login({username, password});

        if ("errorMessage" in response) {
          throw new Error(response.errorMessage);
        } else {
          this.setAuthToken(response.token);
        }

      } catch (err) {
        throw err;
      }

      this.storeUsername(username);
      await this.fetchUserDetails();
      this.setAuthenticationState();
    },

    /**
     * Registers a new user with the provided user details.
     *
     * @param createUserRequestDTO The details of the user to be created.
     */
    async registerUser(createUserRequestDTO: CreateUserRequestDTO): Promise<void> {
      try {
        const response: CreateUserResponseDTO | ErrorResponseDTO = await CreateUserService.createUser(createUserRequestDTO);

        if ("errorMessage" in response) {
          throw new Error(response.errorMessage);
        } else {
          this.setAuthToken(response.token);
        }

      } catch (err) {
        throw err;
      }

      this.storeUsername(createUserRequestDTO.username)
      this.storeUserData(createUserRequestDTO.email, createUserRequestDTO.name, createUserRequestDTO.surname);
      this.setAuthenticationState();
    },

    /**
     * Logs out the current user.
     */
    logout(): void {
      this.resetToken();
      this.resetUserData();
    },

    /**
     * Fetches user details for the given username.
     */
    async fetchUserDetails(): Promise<void> {
      try {
        const userDetails: UserDetailsDTO = await UserDetailService.retrieveUserDetails();
        this.storeUserData(userDetails.email, userDetails.name, userDetails.surname);
      } catch (err) {
        console.error("Error retrieving user details:", err);
      }
    },

    /**
     * Sets the authentication token in both session storage and axios headers.
     *
     * @param token The authentication token.
     */
    setAuthToken(token: string): void {
      sessionStorage.setItem("token", token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },

    /**
     * Stores user data in session storage and updates state.
     *
     * @param email The email of the user.
     * @param name The name of the user.
     * @param surname The surname of the user.
     */
    storeUserData(email: string, name: string, surname: string): void {
      this.email = email;
      this.name = name;
      this.surname = surname;

      sessionStorage.setItem("email", email);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("surname", surname);
    },

    /**
     * Stores username in session storage and updates state.
     *
     * @param username The username of the user.
     */
    storeUsername(username: string): void {
      this.username = username.toLowerCase();
      sessionStorage.setItem("username", username.toLowerCase());
    },

    /**
     * Sets the authentication state to true.
     */
    setAuthenticationState() :void {
      this.isAuthenticated = true;
      sessionStorage.setItem("isAuthenticated", "true");
    },

    /**
     * Updates user details in session storage.
     *
     * @param email The updated email of the user.
     * @param name The updated name of the user.
     * @param surname The updated surname of the user.
     */
    updateUserDetails(email: string, name: string, surname: string): void {
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("surname", surname);
    },

    /**
     * Resets the authentication token.
     */
    resetToken(): void {
      this.token = "";
      sessionStorage.removeItem("token");
      axios.defaults.headers.common['Authorization'] = '';
    },

    /**
     * Resets user data and authentication state.
     */
    resetUserData(): void {
      this.isAuthenticated = false;
      this.username = "";
      this.email = "";
      this.name = "";
      this.surname = "";

      sessionStorage.removeItem("isAuthenticated");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("surname");
    },
  },
});