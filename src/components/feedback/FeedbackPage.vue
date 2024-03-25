<script setup lang="ts">
import {computed, ref} from "vue";
import {FeedbackService} from "@/services/FeedbackService";
import type {ContactRequestDTO} from "@/models/contact/ContactRequestDTO";
import type {ContactResponseDTO} from "@/models/contact/ContactResponseDTO";

const feedbackService = FeedbackService;

const text = ref<string>('')
const submitted = ref<boolean>(false)
const firstName = ref<string>('')
const surname = ref<string>('')
const mail = ref<string>('')

const mailValid = computed(() => {
  const stringValue = String(mail.value)
  if (!stringValue.includes('@')) {
    return false
  }
  return mail.value !== ''
})

const firstNameValid = computed(() => {
  return firstName.value !== ''
})

const lastNameValid = computed(() => {
  return surname.value !== ''
})

const textValid = computed(() => {
  return text.value !== ''
})

const allValid = computed(() => mailValid.value && firstNameValid.value && lastNameValid.value && textValid.value)


async function handleSubmit() {
  try {
    const contactRequest: ContactRequestDTO = {
      email: mail.value,
      firstName: firstName.value,
      surname: surname.value,
      message: text.value
    }

    const result: ContactResponseDTO = await feedbackService.sendFeedback(contactRequest)
    alert("Feedback submitted: " + result.responseMessage)

  } catch (error) {
    console.log(error)
  }
}

</script>

<template>

  <div id="headline">
    <h1 v-show="!submitted">
      Contact us
    </h1>
  </div>

  <form id="form"
        ref="htmlForm"
        @submit.prevent="handleSubmit"
        v-show="!submitted"
        :class="{ 'entered': firstName != null}">
    <div>
      <span class="material-icons"
            :class="mailValid ? 'valid-input' : 'invalid-input'"
            title="Enter a valid email address"
      >mail</span>
      <input required
             name="mail"
             v-model="mail"
             type="email"
             placeholder="E-mail"
             class="entered"
      >
    </div>

    <div>
      <span class="material-icons"
            :class="firstNameValid ? 'valid-input' : 'invalid-input'"
            title="Please enter your first name"
      >face
      </span>
      <input name="first-name"
             v-model="firstName"
             required type="text"
             placeholder="First name"
             pattern=".{2,}"
             title="Name must be at least 2 characters long"
      >
    </div>
    <div>
      <span class="material-icons"
            :class="lastNameValid ? 'valid-input' : 'invalid-input'"
            title="Please enter 1 name, and 1 name only">badge</span>
      <input name="last-name"
             v-model="surname"
             required type="text"
             placeholder="Last name"
             pattern="^\b[a-zA-Z0-9_]+\b$"
             title="Please only enter 1 name/word">
    </div>
    <div>
      <span class="material-icons"
            :class="textValid ? 'valid-input' : 'invalid-input'"
      >assignment
      </span>
      <textarea name="text"
                v-model="text"
                required placeholder="Enter message here"
                title="Message cannot be empty">
      </textarea>
    </div>
    <div>
      <button type="submit"
              id="submit-button"
              title="submit by pressing her"
              :class="allValid ? 'valid-input' : 'invalid-input'" :disabled="!allValid">
        Submit
      </button>
    </div>


  </form>
  <div v-show="submitted"
       id="after-submission">
    <h2>
      Thank you
    </h2>
    <h4>
      Your feedback means the world to us
    </h4>
  </div>


</template>

<style scoped>

body {
  --accent-color: #FF4500FF;
  --background-color: #efeaea;
}

form {
  height: auto;
  width: 100%;
  background-color: var(--background-color);
  color: black;
  align-items: center;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  div {
    margin: 30px;
    display: flex;
    align-items: center;
    width: 50%;
    justify-content: space-between;
  }
}


input {
  height: 50px;
  flex: 1;
}

textarea {
  height: 50px;
  flex: 1;
}

button.invalid-input {
  cursor: not-allowed;
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
  border: 2px var(--accent-color) solid;
  padding: 0;
  margin: 0;
  border-radius: 10px;

}


#submit-button {
  height: 50%;
  width: 50%;
  margin-left: auto;
  margin-right: auto;

}

#headline {
  padding: 10px;
  margin: 0;
}

#after-submission h2, #after-submission h4 {
  text-align: center;
}

@media screen and (max-width: 400px) {
  .material-icons {
    display: none;
  }
}
</style>