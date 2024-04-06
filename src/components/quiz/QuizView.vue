<script setup lang="ts">
import {ref, watch} from "vue";
import QuizPost from "@/components/quiz/QuizPost.vue";

const page = ref(0);
const emit = defineEmits(['page-change'])
const props = defineProps({
      previews: {type: Array, required: false},
      title: {type: String, required: false, default: "Browse quizzes:"},
      userOwnsThem: {type: Boolean, required: false, default: false}
    }
)
watch(page, async () => {
  emit('page-change', page.value)
})

let previews = props.previews;
const username = props.username;
let doesUserOwnThem = props.userOwnsThem;

watch(props, async () => {
  console.log("Lol")
  previews = props.previews
})

function increasePage() {
  if (page.value >= 0) {
    page.value++
  }
}

function decreasePage() {
  if (page.value > 0) {
    page.value--
  }
}

</script>
<template>
  <div class="">
    <div id="quiz-browser">
      <div class="options-container">
        <h1>{{ props.title }}</h1>
      </div>

      <div id="quiz-grid">
        <QuizPost v-for="(quiz, index) in previews"
                  :key="index"
                  :post="quiz"
                  :is-owned-by-user="doesUserOwnThem"
                  class="quiz-post">
        </QuizPost>
      </div>

      <div class="browser-navigator">
        <button @click="decreasePage">
          Previous
        </button>
        <p>Page: {{ page }}</p>
        <button @click="increasePage">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: black;
}

#quiz-browser {
}

.browser-navigator {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

#quiz-grid {
  display: flex;
  flex-wrap: wrap;
  overflow-x: hidden;
  justify-content: center;
  height: auto;
  gap: 50px;
  width: 90%;
  padding-left: 5%;
}

.options-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.options-container h1 {
  text-align: center;
}

input {
  margin: 30px;
  font-size: 20px;
}

</style>