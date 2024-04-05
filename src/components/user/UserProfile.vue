<script setup lang="ts">

import {ref} from "vue";
import {useUserStore} from "@/stores/UserStore";
import {UserDetailService} from "@/services/UserDetailService";
import type {EditUserDTO} from "@/models/user/EditUserDTO";
import axios from "axios";
import UserProfileHeader from "@/components/user/UserProfileHeader.vue";

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

    password.value = "";

    try {
      await UserDetailService.editUserDetails(newUserDetails);
      if (email.value !== "" && firstName.value !== "" && surname.value !== "") {
        userStore.updateUserDetails(email.value, firstName.value, surname.value);
      } else {
        restoreUserDetails();
      }
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

      restoreUserDetails();

      setTimeout(() => {
        errorMessage.value = '';
      }, 5000);
    }
  }
  editMode.value = !editMode.value
}

function restoreUserDetails() {
  email.value = userStore.getUserData("email");
  firstName.value = userStore.getUserData("name");
  surname.value = userStore.getUserData("surname");
}

function preventSpace(event: any) {
  if (event.key === ' ' || event.code === 'Space') {
    event.preventDefault();
  }
}

</script>

<template>
  <div class="user-profile">

    <UserProfileHeader></UserProfileHeader>

    <div class="profile-info">

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

      <div class="button-container">
        <button @click="toggleEdit"> {{ editMode ? 'Save' : 'Edit' }} </button>
      </div>

      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    </div>

  </div>

</template>

<style scoped>

.user-profile {
  padding: 2%;
}

.info-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-label {
  flex: 1;
  text-align: right;
  margin-right: 1rem;
}

.info-value {
  flex: 1;
  margin-left: 1rem;
}

.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  background-color: lightgray;
  color: black;
  margin-top: 2%;
  padding: 0.5% 2%;
  border-radius: 20px;
  font-size: 90%;
  transition: opacity  0.15s;
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