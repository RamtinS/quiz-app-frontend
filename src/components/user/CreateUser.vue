<script setup lang="ts">

import {ref} from "vue";
import axios from 'axios';
import {useUserStore} from '@/stores/UserStore';
import {CreateUserService} from "@/services/CreateUserService";
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


const service = new CreateUserService();
async function register() {
  const user: CreateUserRequestDTO = {
    username: username.value,
    password: password.value,
    email: password.value,
    name: name.value,
    surname: surname.value,
  };

  try {
    await store.registerUser(user);
    await router.push('/');
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      switch (err.response.status) {
        case 409:
          errorMessage.value = "User already exists.";
          console.error("Registration failed because user already exists.", err.message);
          break;
        case 500:
          errorMessage.value = "Registration failed due to an internal server error.";
          console.error("Registration failed due to an internal server error.", err);
          break;
        default:
          errorMessage.value = "Unexpected error."
          console.error("Unexpected status: " + err.response.status);
      }
    } else {
      errorMessage.value = "Unexpected error."
      console.error("Unexpected error: ", err);
    }
    setTimeout(() => {
      errorMessage.value = '';
    }, 5000);
  }
}
</script>

<template>
  <div class="flex">
    <div class="grid">

      <div class="form-container-1">

          <form @submit.prevent="register">
              <label for="fusername">Username:</label><br>
              <input type="text" id="fusername" v-model="username" placeholder="Enter your username" required/><br>

              <label for="femail">Email:</label><br>
              <input type="text" id="email" v-model="email" placeholder="Email" required/><br>

            <div class="name-container">
              <label for="first-name">First name:</label><br>
              <input type="text" id="first-name" v-model="name" placeholder="First name" required/><br>

              <label for="sur-name">Sur name:</label><br>
              <input type="text" id="sur-name" v-model="surname" placeholder="Surname" required/><br>
            </div>

              <label for="password">Password:</label><br>
              <input type="password" id="password" v-model="password" placeholder="Enter your password" required/><br>

              <label for="confirm-password">Confirm Passowrd:</label><br>
              <input type="password" id="confirm-password" v-model="confirmPassword" placeholder="Confirm password" required/><br>

              <input type="submit" value="Register"/>
            <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
          </form>

          <p>Already have an account?</p><router-link to="/login">Login</router-link>

        </div>

      <div class="info-container">
        <div class="item-1">
          <h1>Welcome!</h1>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum nihil placeat possimus quasi quisquam tempora
          veniam. Accusantium, atque beatae blanditiis consectetur culpa ducimus labore laboriosam nulla officiis
          ratione repellendus, voluptates!
        </p>
      </div>
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 20px;
  width: 90%;
  max-width: 900px;
  height: 600px;
  background: rgba(255, 255, 255, 0.96);
}

.form-container-1, .info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.name-container {
  display: flex;
  flex-direction: row;
}
.info-container {
  margin: 10%;
}


input[type=submit] {
  width: 90%;
  font-weight: bold;
  margin-top: 8%;
  background-color: #242062;
  color: white;
  padding: 14px 20px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 16px;
}

input[type="text"], input[type="password"] {
  border: 2px solid rgba(0, 0, 0, 0.17);
  padding: 7px 7px;
}

label {
  font-weight: bold;
  float: left;
}

input {
  font-weight: bold;
  border-radius: 15px;
  padding: 5px;
  margin: 5px;
}

.error-message {
  color: red;
}

@media (max-width: 700px) {

  .info-container {
    display: none;
  }

  .form-container-1 {
    grid-column: 1/3;
  }
}


</style>