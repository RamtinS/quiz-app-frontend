<script setup lang="ts" generic="">

import type {MultipleChoiceQuestionDTO} from "@/models/quiz/MultipleChoiceQuestionDTO";

const props = defineProps(
    {
        question: {type: Object as () => MultipleChoiceQuestionDTO, required: true}
    }
);

//TODO: Implement answer picker
//TODO: Implement emit to parent component for answer clicked


</script>

<template>
    <div id="multiple-choice-answer-picker">
        {{props.question}}
    </div>

</template>

<style scoped>

</style>