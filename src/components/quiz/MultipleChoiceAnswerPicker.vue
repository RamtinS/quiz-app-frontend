<script setup lang="ts" generic="">

import type { MultipleChoiceQuestionDTO } from "@/models/quiz/MultipleChoiceQuestionDTO";
import type {AnswerDTO} from "@/models/quiz/AnswerDTO";

const props = defineProps(
    {
        question: { type: Object as () => MultipleChoiceQuestionDTO, required: true }
    }
);

console.log(props.question?.answers);

const emit = defineEmits(['answer-selected'])

//TODO: Implement answer picker
function selectAnswer(answer: AnswerDTO) {
  emit("answer-selected", answer)
}

//TODO: Implement emit to parent component for answer clicked


</script>
  <template>
    <div class="multiple-choice">
      <button
          v-for="(answer, index) in props.question?.answers" :key="index"
          @click="selectAnswer(answer)"
          :class="['button-type', `button-type-${index}`]"
      >
        {{ answer.answerText }}
      </button>
    </div>
  </template>

<style scoped>

.multiple-choice {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

button {
  border-radius: 10px;
  border: 0;
  color: white;
  padding: 50px;
  margin: 5px;
}

.button-type-0 {
  background: #8d0505;
}

.button-type-1 {
  background: #0c0d46;
}

.button-type-2 {
  background: #093102;
}

.button-type-3 {
  background: chocolate;
}

.button-type-0:hover {
  background: #3f0202;
}

.button-type-1:hover {
  background: #040828;
}

.button-type-2:hover {
  background: #051501;
}

.button-type-3:hover {
  background: #914b15;
}

</style>