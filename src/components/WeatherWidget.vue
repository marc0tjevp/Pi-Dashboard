<template>
  <div class="widget widget--weather">
    <b-card
      bg-variant="dark"
      header="Weather"
      text-variant="white"
      class="text-center h-100 shadow"
    >
      <b-card-text>
        <b-card
          bg-variant="info"
          text-variant="white"
          class="text-center widget--weather__now"
        >
          <b-card-text>
            <b-row>
              <b-col>
                <skycon
                  :condition="weatherForecast.currently.icon"
                  width="75"
                  height="75"
                  color="white"
                />
              </b-col>
              <b-col class="d-flex h-100">
                <h1>
                  {{ formatTemperature(weatherForecast.currently.temperature) }}
                </h1>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>

        <table class="table table-dark widget--weather__inner">
          <tr
            v-for="day in weatherForecast.daily.data.slice(1, 6)"
            :key="day.time"
          >
            <td>{{ formatDate(day.time) }}</td>
            <td>
              <skycon
                :condition="day.icon"
                width="30"
                height="30"
                color="white"
              />
            </td>
            <td>{{ formatTemperature(day.temperatureHigh) }}</td>
          </tr>
        </table>
      </b-card-text>
      <template #footer>
        <small class="text-muted">Updated: {{ lastRefresh }}</small>
        <b-icon
          class="float-right h5 mt-2"
          v-on:click="getWeatherForecast()"
          icon="arrow-clockwise"
        />
      </template>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { formatUnixDate, formatTemperature, getCurrentTime } from "../helpers";
import WeatherDataService from "../services/WeatherDataService";

@Component
export default class WeatherWidget extends Vue {
  private weatherForecast = {};
  private lastRefresh = "";

  getWeatherForecast() {
    WeatherDataService.getForecast()
      .then(response => {
        this.weatherForecast = response.data;
        this.lastRefresh = getCurrentTime();
      })
      .catch(() => this.createToast("Unable to fetch Weather", "error"));
  }

  formatDate(day: number) {
    return formatUnixDate(day);
  }

  formatTemperature(temp: number) {
    return formatTemperature(temp);
  }

  createToast(text: string, type: string) {
    this.$toast.open({
      message: text,
      position: "top",
      type: type
    });
  }

  mounted() {
    this.getWeatherForecast();

    setInterval(() => {
      this.getWeatherForecast();
    }, 10 * 60 * 1000);
  }
}
</script>

<style scoped lang="scss">
.widget--weather {
  .card-body {
    overflow: hidden !important;

    padding: 0px;
  }

  &__inner {
    padding: 1.25rem;
  }

  &__now {
    padding: 1.25rem !important;
    height: 125px;
    margin: 0;
    padding: 0;
    border-radius: 0;
  }
}
</style>
