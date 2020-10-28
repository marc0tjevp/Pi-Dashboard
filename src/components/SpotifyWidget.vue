<template>
  <div class="widget widget--spotify">
    <b-card
      bg-variant="dark"
      text-variant="white"
      class="text-center h-100 shadow widget--spotify__playing"
      :style="
        `background-image: linear-gradient(rgba(0,0,0,.8),rgba(0,0,0,.5)),url(${this.albumImage})`
      "
    >
      <b-card-text>
        <template v-if="!token">
          <b-btn variant="info" :href="getAuthorizationUrl()">
            Login to Spotify
          </b-btn>
        </template>
        <template v-else>
          <h4>{{ currentlyPlaying.item.name }}</h4>
          <p>{{ currentlyPlaying.item.artists[0].name }}</p>
        </template>
      </b-card-text>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SpotifyDataService from "../services/SpotifyDataService";
import { CurrentlyPlaying } from "../types/Spotify.types";

@Component
export default class SpotifyWidget extends Vue {
  private token = "";
  private hash: { "/access_token"?: string } = {};
  private currentlyPlaying: CurrentlyPlaying = {};
  private albumImage = "https://placekitten.com/1000/300";

  getAuthorizationUrl() {
    return SpotifyDataService.getAuthorizationUrl();
  }

  getCurrentlyPlaying() {
    SpotifyDataService.getCurrentlyPlaying(this.token).then(result => {
      this.currentlyPlaying = result.data;
      this.getCardImage();
    });
  }

  getCardImage() {
    this.albumImage = this.currentlyPlaying.item?.album.images[0].url ?? "";
  }

  getTokenAfterRedirect() {
    this.hash = window.location.hash
      .substring(1)
      .split("&")
      .reduce((initial, item) => {
        if (item) {
          const parts = item.split("=");
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});
    window.location.hash = "";
  }

  setToken() {
    const _token = this.hash["/access_token"];
    if (_token) {
      this.token = _token;
    }
  }

  mounted() {
    this.getTokenAfterRedirect();
    this.setToken();

    if (this.token) {
      this.getCurrentlyPlaying();
    }

    setInterval(() => {
      if (this.token) this.getCurrentlyPlaying();
    }, 0.1 * 60 * 1000);
  }
}
</script>

<style scoped lang="scss">
.widget--spotify {
  .card {
    border: 0;
  }
  &__playing {
    background-size: cover;
    background-position: center;
    repeat: none;
  }
}
</style>
