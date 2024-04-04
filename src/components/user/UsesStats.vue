<script setup lang="ts">

import UserProfileHeader from "@/components/user/UserProfileHeader.vue";
import {onMounted, ref} from "vue";
import {UserService} from "@/services/UserService";

const xScale = 80;
const yScale = 30;

const yAxisLabels = ref<Array<number>>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
const xAxisLabels = ref<Array<string>>([])
const quizData = ref<Array<number>>([]);
const totalAttempts = ref<number>(0);
const totalScore = ref<number>(0);
const errorMessage = ref<string>("")

onMounted(async () => {
  try {
    const UserStatsDTO = await UserService.getUserStats();

    const attemptsPerDayMap = UserStatsDTO.quizAttemptsLastSevenDays;

    if (Object.keys(attemptsPerDayMap).length > 0) {
      quizData.value = Object.values(attemptsPerDayMap);
      const dates = Object.keys(attemptsPerDayMap);
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      xAxisLabels.value = dates.map(dateString => days[new Date(dateString).getDay()]);
    }

    totalAttempts.value = UserStatsDTO.totalQuizAttempts;
    totalScore.value = UserStatsDTO.totalScore;

  } catch (err) {
    errorMessage.value = "An error occurred while retrieving the statistics. Please try again later."
    console.error(err);
  }
})

</script>

<template>
  <div class="user-progress">

    <UserProfileHeader></UserProfileHeader>

    <div v-if="errorMessage" class="error-message"> {{ errorMessage }} </div>

    <div v-else class="grid-container">

      <div class="graph-container">

        <p class="graph-title">The amount of quizzes completed the last 7 days</p>

        <svg width="700" height="450">

          <g id="y-axis" class="axis" >
            <line x1="120" y1="0" x2="120" y2="400"></line>
          </g>

          <g id="x-axis" class="axis">
            <line x1="120" y1="400" x2="650" y2="400"></line>
          </g>

          <g class="y-labels">
            <text v-for="(label, index) in yAxisLabels" :key="index" x="80" :y="405 - index * 30"> {{label}} </text>
            <text x="0" y="200" class="label-title">Quizzes</text>
          </g>

          <g class="x-labels">
            <text v-for="(label, index) in xAxisLabels" :key="index" :x="100 + index * 82" y="430">{{ label }}</text>
          </g>

          <template v-for="(quiz, index) in quizData" :key="index">

            <circle class="point" :cx="(index * xScale) + 120" :cy="400 - quiz * yScale" r="5"/>

            <line class="graph-line"
                  v-if="index > 0"
                  :x1="((index - 1) * xScale) + 120"
                  :y1="400 - quizData[index - 1] * yScale"
                  :x2="index * xScale + 120"
                  :y2="400 - (quiz * yScale)"/>

          </template>

        </svg>
      </div>

      <div class="stats-container">

        <div class="stats-item">
          <div class="stats-label">All-time completed quizzes:</div>
          <div class="stats-value">{{ totalAttempts }}</div>
        </div>

        <div class="stats-item">
          <div class="stats-label">All-time score:</div>
          <div class="stats-value">{{ totalScore }}</div>
        </div>

      </div>

    </div>

  </div>

</template>

<style scoped>

.user-progress {
  padding: 2%;
}

.grid-container {
  padding-left: 2%;
  padding-right: 2%;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
}

.graph-container {
  overflow: auto;
}

.graph-title {
  margin-top: 2%;
  margin-bottom: 0;
  text-align: center;
  text-decoration: underline;
}

.axis {
  stroke: black;
  stroke-width: 3;
}

.point {
  fill: blue;
}

svg {
  padding-top: 2%;
}

.graph-line {
  stroke: blue;
  stroke-width: 2;
}

.stats-container {
  padding: 2%;
}

.stats-item {
  display: flex;
  justify-content: center;
  margin-top: 6%;
}

.stats-label {
  flex: 1.3;
  text-align: right;
  margin-right: 1rem;
}

.stats-value {
  flex: 1;
}

.error-message {
  color: red;
  font-size: 150%;
  font-weight: bold;
  text-align: center;
  margin-top: 10%;
}

@media (max-width: 700px) {
  .grid-container {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
}

</style>
