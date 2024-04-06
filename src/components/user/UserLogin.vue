<script setup lang="ts">
import {computed, ref, watch, watchEffect} from 'vue'
import {useUserStore} from '@/stores/UserStore';
import router from "@/router";
import {useRoute} from "vue-router";
import {ErrorHandlingService} from "@/services/ErrorHandlingService";

const username = ref<string>('');
const password = ref<string>('');
const errorMessage = ref<string>('');
const store = useUserStore();
const route = useRoute();

/**
 * If the login has been routed because of an expired token, show an alert and set the error message.
 */
watchEffect(() => {
  if (route.params.tokenStatus === 'expired') {
    alert("expired")
    errorMessage.value = "Your session has expired. Please log in again.";
  }
});

/**
 * Watch for changes in username and password fields and clear error message.
 */
watch([username, password], () => {
  errorMessage.value = '';
});

/**
 * Attempts to log in the user.
 */
async function login() {
  try {
    await store.loginUser(username.value.trim(), password.value.trim());
    if (route.query.redirect) {
      await router.push(route.query.redirect as string)
    } else {
      await router.push('/')
    }
  } catch (err) {
    errorMessage.value = await ErrorHandlingService.handleRequestError(err, "Login failed")
  }
}

/**
 * Check if a string is blank.
 *
 * @param str The string to check.
 * @returns True if the string is blank, false otherwise.
 */
function isBlank(str: string) {
  return (!str || /^\s*$/.test(str));
}

// Computed property to check if both username and password fields are filled.
const fieldsFilled = computed(() => {
  return !isBlank(password.value) && !isBlank(username.value);
})

// Computed property to check if any input is invalid.
const allValid = computed(() => !fieldsFilled.value)

/**
 * Prevent entering space in input fields.
 *
 * @param event The keydown event object.
 */
function preventSpace(event: any) {
  if (event.key === ' ' || event.code === 'Space') {
    event.preventDefault();
  }
}

</script>

<template>
  <div class="flex">
    <div class="grid">
      <!-- First item is the welcome container -->
      <div class="container-1">
        <img src="../../assets/logos/owl-no-background.png" alt="logo" class="img-center" >
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
              <input class="input" type="text" id="username" v-model="username" required @keydown="preventSpace"/>
              <i class="fa fa-user icon"></i><br>


              <label for="fpassword">Password:</label><br>
              <input class="input" type="password" id="password" v-model="password" name="fpassword" required @keydown="preventSpace"/>
              <i class="fa fa-lock icon"></i><br>

              <input type="submit" value="Login" id="login" :disabled="allValid"/>
            </form>
        </div>
        <div v-if="errorMessage" id="error" class="error-message">{{ errorMessage }}</div>
        <p>
          <router-link id="register-link" to="/register-user">Create your account --></router-link>
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
   max-width: 800px;
   height: 600px;
   background: rgba(255, 255, 255, 0.93);
   box-shadow: 0 4px 4px -2px #000000;
 }

.container-1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 2em;
}

.img-center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
}

.container-2 {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  padding: 2em;
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

input[type=submit]:hover {
  background-color: #0f0e33;
}

input[type=submit]:disabled {
  background-color: #8b8a98;
}

input[type="text"], input[type="password"]{
  border: 2px solid rgba(0, 0, 0, 0.17);
  font-weight: bold;
  padding: 14px 20px;
  border-radius: 15px;
  margin: 10px 0 35px 0;
}

label {
  float: left;
  font-weight: bold;
  margin-top: 10px;
}


.error-message {
  color: red;
}

.icon {
  padding-left: 5px;
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