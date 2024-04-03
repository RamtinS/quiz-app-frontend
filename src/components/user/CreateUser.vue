<script setup lang="ts">

import {ref, watch} from "vue";
import axios from 'axios';
import {useUserStore} from '@/stores/UserStore';
import type {CreateUserRequestDTO} from "@/models/user/CreateUserRequestDTO";
import router from "@/router";

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const email = ref('')
const name = ref('')
const surname = ref('')
const store = useUserStore();
const errorMessage = ref('');

async function register() {

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Password conformation not correct.";
    return;
  }

  const user: CreateUserRequestDTO = {
    username: username.value,
    password: password.value,
    email: email.value,
    name: name.value,
    surname: surname.value,
  };

  try {
    await store.registerUser(user);
    await router.push('/');
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      switch (err.response.status) {
        case 400:
          errorMessage.value = err.response.data.errorMessage;
          console.error("Registration failed: " + err.response.data.errorMessage, err);
          break;
        case 409:
          errorMessage.value = err.response.data.errorMessage;
          console.error("Registration failed: " + err.response.data.errorMessage, err);
          break;
        case 500:
          errorMessage.value = "Registration error. Please try again later.";
          console.error("Registration failed: " + err.response.data.errorMessage, err);
          break;
        default:
          errorMessage.value = "Registration error. Please try again later."
          console.error("Unexpected status: " + err.response.data.errorMessage, err);
      }
    } else {
      errorMessage.value = "Registration error. Please try again later."
      console.error("Unexpected error: ", err);
    }
  }
}

watch([username, password, confirmPassword, email, name, surname], () => {
  errorMessage.value = '';
});

</script>

<template>
  <div class="flex">
    <div class="grid">
          <form @submit.prevent="register">
            <div class="item-1">
              <h1>
                Register!
              </h1>
            </div>

            <div class="item-2">
              <label for="fusername">Username:</label>
              <input type="text" id="fusername" v-model="username" placeholder="Enter your username" required/>
            </div>

            <div class="item-2">
              <label for="femail">Email:</label>
              <input type="text" id="femail" v-model="email" placeholder="Email" required/>
            </div>

            <div class="item-3">
              <label for="first-name">First name:</label>
              <input type="text" id="first-name" v-model="name" placeholder="First name" required/>
            </div>


              <div class="item-4">
                <label for="sur-name">Sur name:</label>
                <input type="text" id="sur-name" v-model="surname" placeholder="Surname" required/>
              </div>


            <div class="item-3">
              <label for="password">Password:</label>
              <input class="input-field" type="password" id="password" v-model="password" placeholder="Enter your password" required/>
            </div>

            <div class="item-4">
              <label for="confirm-password">Confirm Password:</label>
              <input  class="input-field" type="password" id="confirm-password" v-model="confirmPassword" placeholder="Confirm password" required/>
            </div>

            <div class="item-2 button">
              <input type="submit" value="Register"/><br>
            </div>

            <div v-if="errorMessage" class="error-message item-5">{{ errorMessage }}</div>

            <div class="item-5">
              <div class="login-route-container">
                <p>Already have an account?</p><router-link to="/login">Login</router-link>
              </div>
            </div>
          </form>
    </div>
  </div>

</template>

<style scoped >
.flex {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-family: "Inter", sans-serif;
}

.grid {
  display: flex;
  border-radius: 35px;
  max-width: 800px;
  height: 600px;
  background: rgba(255, 255, 255, 0.93);
  box-shadow: 0 4px 4px -2px #000000;
  padding: 2em;
}

input[type="text"], input[type="password"]{
  border: 2px solid rgba(0, 0, 0, 0.17);
  font-weight: bold;
  padding: 10px 10px;
  border-radius: 15px;
}

input[type=submit] {
  display: inline;
  font-weight: bold;
  width: 100%;
  background-color: #242062;
  color: white;
  padding: 14px 20px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 16px;
}

label {
  font-size: 14px;
  font-weight: bold;
}

.error-message {
  color: red;
  text-align: center;
  font-size: 90%;
}

.login-route-container p {
  margin-top: 0;
}

form {
  display: grid;
  gap: 20px;
}

.item-1 {
  text-align: center;
  grid-column: 1/5;
}

.item-2, .item-5 {
  display: inherit;
  grid-column: 2/4;
}

.item-3 {
  display: inherit;
  grid-column: 2/3;
}

.item-4 {
  display: inherit;

  grid-column: 3/4;
}

.item-5 {
  text-align: center;
}

/*
 Query for mobile screens.
*/
@media (max-width: 700px) {
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  form {
    align-items: flex-end;
  }

  .item-1 {
    align-self: center;
  }

  .item-2.button {
    align-self: center;
    width: 100%;
  }

  .item-5 {
    align-self: center;
  }

  label {
    padding-right: 15px;
    align-self: center;
  }

  .error-message {
    align-self: center;
  }
}

</style>