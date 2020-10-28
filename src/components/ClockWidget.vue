<template>
  <div class="widget widget--clock">
    <b-card
      bg-variant="dark"
      text-variant="white"
      class="text-center h-100 shadow"
    >
      <b-card-text>
        <h1 class="time">{{ currentTime }}</h1>
        {{ currentDate }}
      </b-card-text>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getCurrentDate, getCurrentTimeWithSeconds } from "../helpers";

@Component
export default class ClockWidget extends Vue {
  private currentTime = "";
  private currentDate = "";

  time() {
    setInterval(() => {
      this.currentTime = getCurrentTimeWithSeconds();
    }, 1000);
  }

  date() {
    this.currentDate = getCurrentDate();
  }

  mounted() {
    this.time();
    this.date();
  }
}
</script>

<style scoped lang="scss">
.widget--clock {
  .time {
    font-size: 55px;
  }
}
</style>
