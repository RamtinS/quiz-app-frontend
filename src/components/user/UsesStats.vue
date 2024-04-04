<script setup lang="ts">

import UserProfileHeader from "@/components/user/UserProfileHeader.vue";

const quizData = [5, 10, 20, 15, 35, 5, 20];

const width = 700 ; // Width of the graph
const height = 500; // Height of the graph
const xScale = 80; // Scale for x-axis
const yScale = 6; // Scale for y-axis

</script>

<template>
  <div class="user-progress">

    <UserProfileHeader></UserProfileHeader>

    <div class="grid-container">

      <div class="graph-container">

        <p>The amount of quizzes completed the last 7 days</p>

        <svg :width="width" :height="height">

          <g id="y-axis" class="axis" >
            <line x1="120" y1="0" x2="120" y2="400"></line>
          </g>

          <g id="x-axis" class="axis">
            <line x1="120" y1="400" x2="650" y2="400"></line>
          </g>

          <g class="y-labels">

            <text x="73" y="15">+65</text>
            <text x="80" y="45">60</text>
            <text x="80" y="75">55</text>
            <text x="80" y="105">50</text>
            <text x="80" y="135">45</text>
            <text x="80" y="165">40</text>
            <text x="80" y="195">35</text>
            <text x="80" y="225">30</text>
            <text x="80" y="255">25</text>
            <text x="80" y="285">20</text>
            <text x="80" y="315">15</text>
            <text x="80" y="345">10</text>
            <text x="85" y="375">5</text>
            <text x="85" y="405">0</text>
            <text x="0" y="200" class="label-title">Quizzes</text>
          </g>

          <g class="x-labels">
            <text x="100" y="430">Day 1</text>
            <text x="180" y="430">Day 2</text>
            <text x="260" y="430">Day 3</text>
            <text x="340" y="430">Day 4</text>
            <text x="420" y="430">Day 5</text>
            <text x="500" y="430">Day 6</text>
            <text x="580" y="430">Day 7</text>
          </g>

          <!-- Data points and lines -->
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
          <div class="stats-label">Total Quizzes Completed:</div>
          <div class="stats-value">20</div>
        </div>
        <div class="stats-item">
          <div class="stats-label">Total Score:</div>
          <div class="stats-value">350</div>
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
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  border: 4px solid purple;
}

.graph-container {
  padding: 2%;

  height: calc(100vh - 220px);
  overflow: auto;
  border: 2px solid black;
}

.axis {
  stroke: black;
  stroke-width: 3;
}

.point {
  fill: blue;
}

svg {
  padding-top: 3%;
  border: 2px solid green;
}

.graph-line {
  stroke: blue;
  stroke-width: 2;
}

.stats-container {
  padding: 2%;
  border: 2px solid blue;
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

@media (max-width: 700px) {
  .grid-container {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
}

</style>
