<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useUserStore} from "@/stores/UserStore";
import {UserDetailService} from "@/services/UserDetailService";
import type {EditUserDTO} from "@/models/user/EditUserDTO";
import UserProfileHeader from "@/components/user/UserProfileHeader.vue";
import {ErrorHandlingService} from "@/services/ErrorHandlingService";

const userStore = useUserStore();
const email = ref(userStore.email);
const firstName = ref(userStore.name);
const surname = ref(userStore.surname);
const password = ref('');
const editMode = ref(false);
const errorMessageEdit = ref('');
const errorMessageRetrieval = ref('');

onMounted(retrieveUserDetailsIfNeeded);

async function retrieveUserDetailsIfNeeded() {
  if (email.value === "" || firstName.value === "" || surname.value === "") {
    await retrieveUserDetails();
  }
}

async function retrieveUserDetails() {
  try {
    const userDetailsDTO = await UserDetailService.retrieveUserDetails();
    email.value = userDetailsDTO.email;
    firstName.value = userDetailsDTO.name;
    surname.value = userDetailsDTO.surname;
  } catch (error) {
    errorMessageRetrieval.value = "Failed to retrieve user details. Please try again later.";
    console.error("Failed to retrieve user details.", error);
  }
}

async function toggleEdit() {

  if (editMode.value && userDetailsChanged()) {
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

      errorMessageEdit.value = await ErrorHandlingService
          .handleRequestError(err, "Failed to update user details");

      restoreUserDetails();

      setTimeout(() => {
        errorMessageEdit.value = '';
      }, 5000);
    }
  }
  editMode.value = !editMode.value
}

function userDetailsChanged(): boolean {
  return (
      email.value !== userStore.email ||
      firstName.value !== userStore.name ||
      surname.value !== userStore.surname ||
      password.value !== ""
  );
}

function restoreUserDetails() {
  email.value = userStore.email;
  firstName.value = userStore.name;
  surname.value = userStore.surname;
}

function preventSpace(event: any) {
  if (event.key === ' ' || event.code === 'Space') {
    event.preventDefault();
  }
}

</script>

<template>
  <div class="user-profile" data-cy="user-profile-header">

    <UserProfileHeader data-cy="user-profile-header"></UserProfileHeader>

    <div class="profile-info" v-if="!errorMessageRetrieval" data-cy="profile-info">

      <div class="info-item">
        <p class="info-label"> First name: </p>
        <div class="info-value">
          <p v-if="!editMode" data-cy="first-name">{{ firstName }}</p>
          <input v-else v-model.trim="firstName" type="text" placeholder="Enter new first name"
                 @keydown="preventSpace" data-cy="edit-first-name"/>
        </div>
      </div>

      <div class="info-item">
        <p class="info-label"> Surname: </p>
        <div class="info-value">
          <p v-if="!editMode" data-cy="surname"> {{ surname }} </p>
          <input v-else v-model="surname" type="text" placeholder="Enter new surname"
                 @keydown="preventSpace" data-cy="edit-surname"/>
        </div>
      </div>

      <div class="info-item">
        <p class="info-label"> Email: </p>
        <div class="info-value">
          <p v-if="!editMode" data-cy="email"> {{ email }} </p>
          <input v-else v-model="email" type="text" placeholder="Enter new email"
                 @keydown="preventSpace" data-cy="edit-email"/>
        </div>
      </div>

      <div class="info-item">
        <p class="info-label"> Password: </p>
        <div class="info-value">
          <p v-if="!editMode" data-cy="password"> ********* </p>
          <input v-else v-model="password" type="password" placeholder="Enter new password" @keydown="preventSpace"/>
        </div>
      </div>

      <div class="button-container">
        <button @click="toggleEdit" data-cy="edit-button"> {{ editMode ? 'Save' : 'Edit' }} </button>
      </div>

      <div v-if="errorMessageEdit"
           class="error-message-edit"
           data-cy="edit-error-message">
        {{ errorMessageEdit }}
      </div>

    </div>

    <div v-if="errorMessageRetrieval"
         class="error-message-retrieval"
         data-cy="retrieval-error-message">
      {{ errorMessageRetrieval }}
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

.error-message-edit {
  margin-top: 2%;
  color: red;
  text-align: center;
}

.error-message-retrieval {
  margin-top: 5%;
  color: red;
  text-align: center;
  font-weight: bold;
  font-size: 1.5em;
}

</style>