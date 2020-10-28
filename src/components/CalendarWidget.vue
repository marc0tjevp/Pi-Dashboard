<template>
  <div class="widget widget--calendar">
    <b-card
      bg-variant="dark"
      header="Calendar"
      text-variant="white"
      class="text-center h-100 shadow"
    >
      <b-card-text> </b-card-text>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CalendarDataService from "../services/CalendarDataService";

@Component
export default class CalendarWidget extends Vue {
  mounted() {
    CalendarDataService.init();
  }
}
</script>

<style scoped lang="scss"></style>
