<script setup lang="ts">
import {ref} from 'vue'
import axios from 'axios';
import {useUserStore} from '@/stores/UserStore';
import router from "@/router";
import {useRoute} from "vue-router";

const username = ref('')
const password = ref('')
const store = useUserStore();
const errorMessage = ref('');
const route = useRoute();


async function login() {
  try {
    await store.loginUser(username.value, password.value);
    if (route.query.redirect) {
      await router.push(route.query.redirect as string)
    } else {
      await router.push('/')
    }
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      switch (err.response.status) {
        case 401:
          errorMessage.value = "Your username or password was incorrect."
          console.error("Login failed.", err.message);
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
      <!-- First item is the welcome container -->
      <div class="container-1">
        <img src="../../assets/logos/logo.svg" alt="logo" class="img-center" >
        <h1>
          Welcome to Quiz App!
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum nihil placeat possimus quasi quisquam tempora
          veniam.
        </p>
      </div>

      <!-- Second Item is the login container -->
      <div class="container-2">
        <div class="form-container-1">
          <h1>Log in!</h1>
            <form @submit.prevent="login">

              <label for="fusername">Username:</label><br>
              <input class="input" type="text" id="fusername" v-model="username" required/>
              <i class="fa fa-user icon"></i><br>

              <label for="fpassword">Password:</label><br>
              <input class="input" type="password" id="fpassword" v-model="password" name="fpassword" required/>
              <i class="fa fa-lock icon"></i><br>

              <input type="submit" value="Login"/>
            </form>
        </div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <p>
          <router-link to="/register-user">Create your account --></router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
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
  border-radius: 35px;
  max-width: 900px;
  height: 600px;
  background: rgba(255, 255, 255, 0.93);
  box-shadow: 0 4px 4px -2px #000000;

}

.container-1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 10%;
}

.img-center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
  height: 70%;
}

.container-2 {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  padding: 50px;
}

input[type=submit] {
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

input[type="text"], input[type="password"]{
  border: 2px solid rgba(0, 0, 0, 0.17);
  font-weight: bold;
  padding: 14px 20px;
  border-radius: 15px;
  margin: 10px 0 35px 0;
}

label {
  font-weight: bold;
  margin-top: 10px;
}

.error-message {
  color: red;
}

.icon {
  padding-left: 10px;
}

/*
 Query for mobile screens.
*/
@media (max-width: 700px) {
  .container-1 {
    display: none;
  }
  .container-2 {
    grid-column: 1/3;
    min-width: 250px;
  }
}
</style>