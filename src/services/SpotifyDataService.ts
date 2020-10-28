import axios from "axios";

class SpotifyDataService {
  private authEndpoint = process.env.VUE_APP_SPOTIFY_API_AUTH_URL;
  private url = process.env.VUE_APP_SPOTIFY_API_BASE_URL;
  private clientId = process.env.VUE_APP_SPOTIFY_API_CLIENT_ID;
  private redirectUrl = process.env.VUE_APP_SPOTIFY_API_REDIRECT_URL;
  private scopes = process.env.VUE_APP_SPOTIFY_API_SCOPES?.split(",") ?? [];

  /**
   * Returns a URL to the Spotify OAuth login screen
   *
   * @returns {string} Spotify API Authentication URL
   * @memberof SpotifyDataService
   */
  getAuthorizationUrl() {
    return `${this.authEndpoint}client_id=${this.clientId}&redirect_uri=${
      this.redirectUrl
    }&scope=${this.scopes.join("%20")}&response_type=token&show_dialog=true`;
  }

  /**
   * Returns currently playing song data
   *
   * @param {string} token Token that was passed on redirection from Spotify OAuth login screen.
   * @returns {AxiosStatic} Axios call promise
   * @memberof SpotifyDataService
   */
  getCurrentlyPlaying(token: string) {
    return axios
      .create({
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .get(`${this.url}me/player`);
  }
}

export default new SpotifyDataService();
