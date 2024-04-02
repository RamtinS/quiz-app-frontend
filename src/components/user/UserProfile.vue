<script setup lang="ts">

import {ref} from "vue";
import {useUserStore} from "@/stores/UserStore";
import {UserDetailService} from "@/services/UserDetailService";
import QuizBrowser from "@/components/quiz/QuizBrowser.vue";
import type {EditUserDTO} from "@/models/user/EditUserDTO";
import axios from "axios";

const userStore = useUserStore();
const email = ref(userStore.getUserData("email"));
const firstName = ref(userStore.getUserData("name"));
const surname = ref(userStore.getUserData("surname"));
const password = ref('');
const editMode = ref(false);
const errorMessage = ref('');

async function toggleEdit() {

  if (editMode.value) {
    const newUserDetails: EditUserDTO = {
      newPassword: password.value,
      newEmail: email.value,
      newName: firstName.value,
      newSurname: surname.value,
    };

    try {
      await UserDetailService.editUserDetails(newUserDetails);
      userStore.updateUserDetails(email.value, firstName.value, surname.value);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        switch (err.response.status) {
          case 400:
            errorMessage.value = err.response.data.errorMessage;
            console.error("Failed to update user details: " + err.response.data.errorMessage, err);
            break;
          case 404:
            errorMessage.value = err.response.data.errorMessage;
            console.error("Failed to update user details: " + err.response.data.errorMessage, err);
            break;
          case 409:
            errorMessage.value = err.response.data.errorMessage;
            console.error("Failed to update user details: " + err.response.data.errorMessage, err);
            break;
          case 500:
            errorMessage.value = "Server error. Please try again later.";
            console.error("Failed to update user details: " + err.response.data.errorMessage, err);
            break;
          default:
            errorMessage.value = "Error. Please try again later.";
            console.error("Failed to update user details. Unexpected status: " + err.response.status, err);
        }
      } else {
        errorMessage.value = "Error. Please try again later.";
        console.error("Failed to update user details. Unexpected error: ", err);
      }

      email.value = userStore.getUserData("email");
      firstName.value = userStore.getUserData("name");
      surname.value = userStore.getUserData("surname");

      setTimeout(() => {
        errorMessage.value = '';
      }, 5000);
    }
  }
  editMode.value = !editMode.value
}

function preventSpace(event: any) {
  if (event.key === ' ' || event.code === 'Space') {
    event.preventDefault();
  }
}

</script>

<template>

  <div id="profile-container">

    <div id ="profile-info">

      <div class="profile-header">
        <img src="https://via.placeholder.com/150" alt="profile picture" id="profile-picture" />
        <h3 id="username">{{ userStore.getUserData("username") }}</h3>
      </div>

      <div class="info-item">
        <p class="info-label"> First name: </p>
        <div class="info-value">
          <p v-if="!editMode">{{ firstName }}</p>
          <input v-else v-model.trim="firstName" type="text" placeholder="Enter new first name" @keydown="preventSpace"/>
        </div>
      </div>

      <div class="info-item">
        <p class="info-label"> Surname: </p>
        <div class="info-value">
          <p v-if="!editMode"> {{ surname }} </p>
          <input v-else v-model="surname" type="text" placeholder="Enter new surname" @keydown="preventSpace"/>
        </div>
      </div>

      <div class="info-item">
        <p class="info-label"> Email: </p>
        <div class="info-value">
          <p v-if="!editMode"> {{ email }} </p>
          <input v-else v-model="email" type="text" placeholder="Enter new email" @keydown="preventSpace"/>
        </div>
      </div>

      <div class="info-item">
        <p class="info-label"> Password: </p>
        <div class="info-value">
          <p v-if="!editMode"> ********* </p>
          <input v-else v-model="password" type="password" placeholder="Enter new password" @keydown="preventSpace"/>
        </div>
      </div>

      <button @click="toggleEdit"> {{ editMode ? 'Save' : 'Edit' }} </button>

      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    </div>

    <div id="user-quizzes">
      <QuizBrowser :title="'All user quizzes'" :username="userStore.getUserData('username')"></QuizBrowser>
    </div>

  </div>

</template>

<style scoped>

#profile-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
}

#profile-info {
  border: 3px solid #ccc;
  width: 30%;
  margin-top: 7%;
  margin-left: 7%;
  display: flex;
  gap: 5px;
  flex-direction: column;
  padding: 2%;
}

.info-item {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}

.info-label {
  width: 30%;
  text-align: right;
  margin-left: 16%;
}

.info-value {
  flex-grow: 1;
  max-width: 55%;
  overflow: auto;
  margin-left: 6%;
}

input {
  margin-left: 2%;
  padding-top: 7%;
  padding-bottom: 7%;
}

#user-quizzes {
  flex-grow: 1;
  max-height: 100vh;
  overflow-y: auto;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#profile-picture {
  width: 40%;
  border-radius: 50%;
  border: 5px solid var(--primary);
}

button {
  width: 20%;
  background-color: lightgray;
  color: black;
  margin-top: 20px;
  margin-left: 40%;
  margin-right: 40%;
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 90%;
  transition: opacity 0.15s;
}

button:hover {
  box-shadow: 5px 5px 5px gray;
}

.error-message {
  margin-top: 2%;
  color: red;
  text-align: center;
}

</style>