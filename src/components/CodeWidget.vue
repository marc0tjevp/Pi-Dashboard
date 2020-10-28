<template>
  <div class="widget widget--code">
    <b-card
      bg-variant="dark"
      footer-tag="footer"
      text-variant="white"
      class="h-100 shadow text-center"
    >
      <b-card-text class="text-left">
        <div class="widget--code__inner">
          <h4 class="widget--code__total">
            <b-icon class="widget--code__icon" icon="clock"></b-icon>
            {{ codingStats.human_readable_total }}
          </h4>

          <small>
            Daily average: {{ codingStats.human_readable_daily_average }}
          </small>

          <br />

          <small>
            <span
              v-for="l in codingStats.languages.slice(0, 3)"
              v-bind:key="l.name"
            >
              <b-badge variant="info" class="widget--code__badge">
                {{ l.name }} ({{ l.percent }}%)
              </b-badge>
            </span>
          </small>
        </div>
      </b-card-text>
      <template #footer>
        <small class="text-muted">Updated: {{ lastRefresh }}</small>
        <b-icon
          class="float-right h5 mt-2"
          v-on:click="getCodingStats()"
          icon="arrow-clockwise"
        />
      </template>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getCurrentTime } from "../helpers";
import WakatimeDataService from "../services/WakaTimeDataService";

@Component
export default class CodeWidget extends Vue {
  private userInfo = {};
  private codingStats = {};
  private lastRefresh = "";

  getUserInfo() {
    WakatimeDataService.getUserInfo().then(
      result => (this.userInfo = result.data)
    );
  }

  getCodingStats() {
    WakatimeDataService.getCodingStats()
      .then(result => {
        this.codingStats = result.data.data;
        this.lastRefresh = getCurrentTime();
      })
      .catch(() => this.createToast("Unable to fetch Coding Stats", "error"));
  }

  createToast(text: string, type: string) {
    this.$toast.open({
      message: text,
      position: "top",
      type: type
    });
  }

  mounted() {
    this.getUserInfo();
    this.getCodingStats();

    setInterval(() => {
      this.getCodingStats();
    }, 10 * 60 * 1000);
  }
}
</script>

<style scoped lang="scss">
.widget--code {
  &__total {
    margin-bottom: 0;
  }
  &__icon {
    margin-right: 5px;
  }
  &__badge {
    margin-right: 2.5px;
  }
  .card-body {
    padding: 0px;
  }

  &__inner {
    padding: 1.25rem;
    padding-bottom: 2px;
  }
}
</style>
