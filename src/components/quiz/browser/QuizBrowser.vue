<script setup lang="ts">
import QuizPost from "@/components/quiz/browser/QuizPost.vue";
import { onMounted, ref, watch } from "vue";
import type { QuizPreviewDTO } from "@/models/quiz/QuizPreviewDTO";
import { QuizService } from "@/services/QuizService";
import { ErrorHandlingService } from "@/services/ErrorHandlingService";

const previews = ref<QuizPreviewDTO[]>([]);
let page = ref(0);
const searchField = ref<string>("");
let searchByCategory = false;
let searchByTags = false;
const errorMessage = ref<string>("");

/**
 * Calls on getSearchResult() on component mount.
 */
onMounted(() => {
  getSearchResult();
});

/**
 * Fetches search results based on current criteria.
 */
async function getSearchResult() {
  try {
    previews.value = await QuizService.getQuizBySpecifiedCriteria(
      6,
      page.value,
      searchField.value,
      searchByCategory,
      searchByTags,
    );
  } catch (err) {
    errorMessage.value = await ErrorHandlingService.handleRequestError(
      err,
      "Quizzes could not be loaded",
    );
  }
}

/**
 * Watch for changes in page number.
 */
watch(page, async () => {
  await getSearchResult();
});

/**
 * Increases the current page number.
 */
function increasePage() {
  if (page.value >= 0) {
    page.value++;
  }
}

/**
 * Toggles the search by category flag.
 */
async function changeCategory() {
  searchByCategory = !searchByCategory;
}

/**
 * Toggles the search by tags flag.
 */
async function changeTags() {
  searchByTags = !searchByTags;
}

/**
 * Decreases the current page number.
 */
function decreasePage() {
  if (page.value > 0) {
    page.value--;
  }
}

const props = defineProps({
  title: { type: String, required: false, default: "Browse quizzes:" },
  username: { type: String, required: false },
  quizzesAreFromCurrentUser: { type: Boolean, required: false, default: false },
});
</script>

<template>
  <div class="quiz-browser" data-cy="quiz-browser">
    <div class="options-container" data-cy="options-container">
      <h1>{{ props.title }}</h1>

      <div class="search-container">
        <input
          @keydown.enter="getSearchResult"
          v-model="searchField"
          type="search"
          id="search"
          placeholder="Enter"
          data-cy="search-input"
        />

        <button
          id="search-button"
          @click="getSearchResult"
          data-cy="search-button"
        >
          Search
        </button>
      </div>

      <div>
        <label for="tags">Search by tags</label>
        <input
          name="tags"
          type="checkbox"
          id="tags"
          @change="changeTags"
          data-cy="search-by-tags"
        />

        <label for="category">Search by category</label>
        <input
          name="category"
          id="category"
          type="checkbox"
          @change="changeCategory"
          data-cy="search-by-category"
        />
      </div>
    </div>

    <div class="quiz-grid" data-cy="quiz-grid">
      <QuizPost
        v-for="(quiz, index) in previews"
        :key="index"
        :post="quiz"
        :is-owned-by-user="quizzesAreFromCurrentUser"
        class="quiz-post"
      >
      </QuizPost>
    </div>

    <div class="browser-navigator">
      <button id="previous" @click="decreasePage" data-cy="previous-button">
        Previous
      </button>
      <p data-cy="page-number">Page: {{ page }}</p>
      <button id="next" @click="increasePage" data-cy="next-button">
        Next
      </button>
    </div>
  </div>

  <div
    v-if="errorMessage"
    id="error"
    class="error-message"
    data-cy="error-message"
  >
    {{ errorMessage }}
  </div>
</template>

<style scoped>
h1 {
  color: black;
}

.quiz-browser {
  min-width: 400px;
}

.browser-navigator {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  font-weight: bold;
}

button {
  padding: 10px;
  font-size: 17px;
  font-weight: bold;
}

.quiz-grid {
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
  justify-content: center;
}

.options-container h1 {
  text-align: center;
}

input {
  margin: 15px;
  font-size: 15px;
}

.error-message {
  margin-top: 2%;
  color: red;
  text-align: center;
  font-weight: bold;
  font-size: 1.5em;
}

@media screen and (max-width: 600px) {
  .search-container {
    display: flex;
    flex-direction: column;
  }
}

input[type="checkbox"] {
  width: 15px;
  height: 15px;
  padding-bottom: 20px;
}
</style>
