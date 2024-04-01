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
          console.error("Login failed du to bad credentials: ", err.message);
          break;
        default:
          errorMessage.value = "Server error. Please try again later.";
          console.error("Login failed du to unexpected status code: " + err.response.status);
      }
    } else {
      errorMessage.value = "Unexpected error. Please try again later."
      console.error("Login failed du to unexpected error: ", err);
    }
    setTimeout(() => {
      errorMessage.value = '';
    }, 5000);
  }
}
</script>


<template>

  <div id="rectangle-container">
    <div id="welcome-message">
      <h1>
        Welcome to Quiz App
      </h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab amet blanditiis deserunt dolores eos esse et
        incidunt ipsa labore nisi odit optio porro quae quaerat, quam quibusdam repellendus sint ut?
      </p>

    </div>
    <div id="login-form">

      <h2>User Login</h2>

      <form @submit.prevent="login">

        <div>
          <span class="material-icons" title="Enter a valid username">person</span>
          <input type="text" v-model="username" placeholder="Enter your username" required/>
        </div>

        <div>
          <span class="material-icons" title="Enter a valid username">lock</span>
          <input type="password" v-model="password" placeholder="Enter your password" required/>
        </div>

        <button type="submit">Log in</button>

        <p>
          Don't have an account? <router-link to="/register-user">Register</router-link>
        </p>

      </form>

      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    </div>
  </div>


</template>

<style scoped>

#rectangle-container {
  display: flex;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 5%;
  height: 700px;
  border-radius: 20px;
  box-shadow: grey 0 0 20px 10px;
}

@media (max-width: 600px){
  #rectangle-container {
    flex-direction: column;
    height: auto;
    margin: 0;
    border-radius: 0;
  }
  #welcome-message, #login-form{
    width: 100%;
  }
  #welcome-message{
    background: linear-gradient(180deg, var(--primary-light) 0%, var(--secondary) 50%, var(--secondary-light) 100%);
  }
}

@media (min-width: 600px){
  #welcome-message, #login-form{
    width: 50%;
  }
  #welcome-message{
    background: linear-gradient(90deg, var(--primary-light) 0%, var(--secondary) 50%, var(--secondary-light) 100%);
  }
}

p, h1, h2{
  color: white;
  text-align: center;
  text-shadow: black 0 0 15px;
}

h1 {
  font-size: 3em;
}

p {
  padding: 0 10%;
}

#welcome-message {
  padding-top: 50px;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}

#login-form {
  padding-top: 50px;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: var(--secondary-light);
  h2{
    color: white;
    font-size: 2em;
  }

  form {
    padding-top: 50px;

    border-radius: inherit;

    display: flex;
    flex-direction: column;
    overflow: hidden;

    div, button {
      width: 50%;
      max-width: 300px;
      text-align: center;
      margin: auto auto 20px;
      border-radius: 10px;
      height: 40px;
      box-shadow: grey 5px 5px 5px;
    }

    div {
      display: flex;
      background-color: white;
      align-items: center;
      :hover {
        cursor: pointer;
      }

      input {
        outline: none;
        border-radius: inherit;

        width: 100%;
        box-sizing: border-box;
        border: none;
        height: 90%;
      }
      span{
        display: flex;
      }
    }
    button:hover {
      cursor: pointer;
      scale: 1.05;
    }
  }
}

.error-message {
  margin-top: 25px;
  color: red;
}

</style>