import { defineStore } from 'pinia';
import {LoginService} from "@/services/LoginService";
import {CreateUserService} from "@/services/CreateUserService";
import type {CreateUserRequestDTO} from "@/models/CreateUserRequestDTO";
import type {CreateUserResponseDTO} from "@/models/CreateUserResponseDTO";


export const useUserStore = defineStore('users', {
    state: () => ({
        user: { username: ""},
        token: '',
        isAuthenticated: false,
    }),

    actions: {
        async login(username: string, password: string) {
            const loginService = new LoginService();
            try {
                const response = await loginService.login({username, password});
                this.isAuthenticated = true;
            } catch (err){
                console.log(err)
            }

        },

        async registerUser(username: string, password: string, email: string, name: string, surname: string) {
            const createUserRequestDTO: CreateUserRequestDTO = {username, password, email, name, surname};
            const createUserService = new CreateUserService();

            try {
                const response: CreateUserResponseDTO = await createUserService.createUser(createUserRequestDTO);
                this.isAuthenticated = true;

            } catch (err){
                console.log(err)
            }


        },
    },
});