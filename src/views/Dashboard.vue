<template>
  <div class="dashboard">
    <b-container fluid variant="dark">
      <b-row class="h-75">
        <b-col cols="4"><CalendarWidget /></b-col>
        <b-col cols="4"><TodoWidget /></b-col>
        <b-col cols="4"><WeatherWidget /></b-col>
      </b-row>
      <b-row class="h-25">
        <b-col cols="4"><SpotifyWidget /></b-col>
        <b-col cols="4"><CodeWidget /></b-col>
        <b-col cols="4"><ClockWidget /></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CalendarWidget from "@/components/CalendarWidget.vue";
import TodoWidget from "@/components/TodoWidget.vue";
import WeatherWidget from "@/components/WeatherWidget.vue";
import SpotifyWidget from "@/components/SpotifyWidget.vue";
import CodeWidget from "@/components/CodeWidget.vue";
import ClockWidget from "@/components/ClockWidget.vue";

export default {
  name: "Dashboard",
  components: {
    CalendarWidget,
    TodoWidget,
    WeatherWidget,
    SpotifyWidget,
    CodeWidget,
    ClockWidget
  }
};
</script>

<style lang="scss">
.dashboard,
.container-fluid {
  height: calc(100vh - 20px);
}

.dashboard {
  padding: 20px;
}

.widget {
  height: 100%;
  max-height: 560px;
  padding-bottom: 20px;
  font-size: 22px;

  .card-body {
    overflow-x: hidden;
    overflow-y: auto;
  }
  .card-footer {
    padding: 5px 20px;
  }
}
.b-toast .toast .toast-body {
  display: block;
  font-size: 18px !important;
}

.toast-header {
  font-size: 18px !important;
}
</style>
