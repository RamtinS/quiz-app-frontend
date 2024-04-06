<script setup lang="ts">
import {computed, ref} from "vue";
import {FeedbackService} from "@/services/FeedbackService";
import type {ContactRequestDTO} from "@/models/contact/ContactRequestDTO";

const message = ref<string>('');
const firstName = ref<string>('');
const surname = ref<string>('');
const email = ref<string>('');
const submitted = ref<boolean>(false);
const conformationMessage = ref<string>('');

const mailValid = computed(() => {
  const stringValue = String(email.value)
  if (!stringValue.includes('@')) {
    return false
  }
  return email.value !== ''
})

const firstNameValid = computed(() => {
  return firstName.value !== ''
})

const lastNameValid = computed(() => {
  return surname.value !== ''
})

const textValid = computed(() => {
  return message.value !== ''
})

const allValid = computed(() => mailValid.value && firstNameValid.value && lastNameValid.value && textValid.value)

async function handleSubmit() {
  const contactRequest: ContactRequestDTO = {
    email: email.value,
    name: firstName.value,
    surname: surname.value,
    content: message.value
  }

  try {
    await FeedbackService.sendFeedback(contactRequest);
    handleSubmissionSuccess();
  } catch (error) {
    handleSubmissionError(error);
  }
}

function handleSubmissionSuccess() {
  submitted.value = true;
  conformationMessage.value = "Form successfully submitted!";
  resetForm();
}

function handleSubmissionError(error: any) {
  submitted.value = true;
  conformationMessage.value = "An error occurred during form submission.";
  console.log(conformationMessage.value, error);
  resetForm();
}

function resetForm() {
  email.value = "";
  firstName.value = "";
  surname.value = "";
  message.value = "";

  setTimeout(() => {
    submitted.value = false;
    conformationMessage.value = "";
  }, 5000);
}

</script>

<template>

  <div id="form-container">
    <h1 id="headline"> Contact us </h1>
    <form @submit.prevent="handleSubmit" v-show="!submitted"
          :class="{ 'entered': firstName != null}"
    >

      <div>
      <span class="material-icons"
            :class="mailValid ? 'valid-input' : 'invalid-input'"
            title="Enter a valid email address">mail</span>
        <input required
               id="email"
               name="mail"
               v-model="email"
               type="email"
               placeholder="E-mail"
               class="entered">
      </div>

      <div>
        <span class="material-icons"
            :class="firstNameValid ? 'valid-input' : 'invalid-input'"
            title="Please enter your first name"> face
        </span>

        <input name="first-name"
               id="first-name"
               v-model="firstName"
               required type="text"
               placeholder="First name"
               pattern=".{2,}"
               title="Name must be at least 2 characters long">
      </div>

      <div>
        <span class="material-icons"
            :class="lastNameValid ? 'valid-input' : 'invalid-input'"
            title="Please enter 1 name, and 1 name only">badge</span>
        <input name="last-name"
               id="last-name"
               v-model="surname"
               required type="text"
               placeholder="Last name"
               pattern="^\b[a-zA-Z0-9_]+\b$"
               title="Please only enter 1 name/word">
      </div>

      <div>

        <span class="material-icons"
              title="Please enter a message"
            :class="textValid ? 'valid-input' : 'invalid-input'"> assignment
        </span>

        <textarea name="message"
                  id="message"
                  v-model="message"
                  required placeholder="Enter message here"
                  title="Message cannot be empty">
        </textarea>
      </div>

      <div class="submit-container">
        <button type="submit"
                id="submit-button"
                title="submit by pressing her"
                :class="allValid ? 'valid-input' : 'invalid-input'" :disabled="!allValid">
          Submit
        </button>
      </div>

    </form>

    <div v-show="submitted" id="confirmation-message"> {{conformationMessage}} </div>

  </div>

</template>

<style scoped>

#form-container {
  margin: auto;
  width: 60%;
  padding: 5% 15%;
  text-align: center;
}

@media (max-width: 900px) {
  #form-container {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
  }
}

form {
  height: 100%;
  width: 100%;
  background-color: var(--neutral);
  color: black;
  align-items: center;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  div {
    margin: 25px;
    display: flex;
    align-items: center;
    width: 50%;
    justify-content: space-between;
  }
}

input {
  height: 40px;
  flex: 1;
}

textarea {
  flex: 1;
  height: 70px;
  resize: none;
}

.material-icons {
  margin-right: 10px;
  border: grey 2px solid;
  border-radius: 10px;
}

.valid-input {
  background-color: lightgreen;
  border-color: seagreen;
}

.invalid-input {
  background-color: lightpink;
  border-color: red;
}

.material-icons {
  font-size: 48px;
}

h1 {
  font-weight: bold;
  text-align: center;
  padding: 0;
  margin: 0;
  border-radius: 10px;
}

button {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  aspect-ratio: 4/1;
}

button[disabled] {
  cursor: not-allowed;
}

#headline {
  padding: 10px;
  margin: 0;
}

#after-submission h2, #after-submission h4 {
  text-align: center;
}

#confirmation-message {
  margin-top: 10%;
  font-size: 30px;
}

@media screen and (max-width: 400px) {
  .material-icons {
    display: none;
  }
}
</style>