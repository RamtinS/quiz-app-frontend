<script setup lang="ts">

import {ref} from "vue";
import {CreateUserService} from "@/services/CreateUserService";
import type {CreateUserRequestDTO} from "@/models/user/CreateUserRequestDTO";
import type {CreateUserResponseDTO} from "@/models/user/CreateUserResponseDTO";

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const email = ref('')
const name = ref('')
const surname = ref('')

const service = new CreateUserService();
async function register() {
  let user: CreateUserRequestDTO = {
    username: username.value,
    password: password.value,
    email: password.value,
    name: name.value,
    surname: surname.value,
  };
  try {
    const response: CreateUserResponseDTO = await service.createUser(user)
    console.log("response: " + response)
  } catch (err) {
    console.log("Error while creating user:" + err)
  }
}

</script>

<template>
  <div id="rectangle-container">
    <div id="welcome-message">
      <h1>
        Please tell us about yourself
      </h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab amet blanditiis deserunt dolores eos esse et
        incidunt ipsa labore nisi odit optio porro quae quaerat, quam quibusdam repellendus sint ut?
      </p>

    </div>
    <div id="create-form">

      <h2>Create account</h2>
      <form @submit.prevent="register">
        <div>
          <span class="material-icons" title="Username">person</span>
          <input type="text" v-model="username" placeholder="Enter your username" required/>
        </div>

        <div>
          <span class="material-icons" title="Email address">email</span>
          <input type="text" v-model="email" placeholder="Email" required/>
        </div>
        <div>
          <span class="material-icons" title="First name">badge</span>
          <input type="text" v-model="name" placeholder="First name" required/>
        </div>
        <div>
          <span class="material-icons" title="Surname">badge</span>
          <input type="text" v-model="surname" placeholder="Surname" required/>
        </div>
        <div>
          <span class="material-icons" title="Password">lock</span>
          <input type="password" v-model="password" placeholder="Enter your password" required/>
        </div>
        <div>
          <span class="material-icons" title="Password confirmation">lock</span>
          <input type="password" v-model="confirmPassword" placeholder="Confirm password" required/>
        </div>
        <button type="submit">Register</button>
        <p>
          Already have an account?
          <router-link to="/login">Login</router-link>
        </p>
      </form>
    </div>
  </div>
</template>


<style scoped >
#rectangle-container {
  display: flex;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 5%;
  height: 700px;
  border-radius: 20px;
  box-shadow: grey 0 0 20px 10px;

}

@media (max-width: 600px) {
  #rectangle-container {
    flex-direction: column;
    height: auto;
    margin: 0;
    border-radius: 0;
  }

  #welcome-message, #create-form {
    width: 100%;
  }

  #welcome-message {
    background: linear-gradient(180deg, var(--primary-light) 0%, var(--secondary) 50%, var(--secondary-light) 100%);
  }
}

@media (min-width: 600px) {
  #welcome-message, #create-form {
    width: 50%;
  }

  #welcome-message {
    background: linear-gradient(90deg, var(--primary-light) 0%, var(--secondary) 50%, var(--secondary-light) 100%);
  }
}

p, h1, h2 {
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


#create-form {
  padding-top: 50px;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: var(--secondary-light);

  h2 {
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

      span {
        display: flex;
      }
    }

    button:hover {
      cursor: pointer;
      scale: 1.05;
    }
  }

}
</style>