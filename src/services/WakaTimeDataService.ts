import axios from "axios";

class WakaTimeDataService {
  private proxyUrl = process.env.VUE_APP_PROXY_API_URL;
  private url = process.env.VUE_APP_WAKATIME_API_BASE_URL;
  private token = process.env.VUE_APP_WAKATIME_API_USER_TOKEN;
  private username = process.env.VUE_APP_WAKATIME_API_USER_USERNAME;

  /**
   * Returns user info from WakaTime
   *
   * @returns {AxiosStatic} Axios call promise
   * @memberof WakaTimeDataService
   */
  getUserInfo() {
    return axios
      .create({
        headers: {
          "Content-type": "application/json",
          Authorization: "Basic " + this.token
        }
      })
      .get(`${this.proxyUrl}${this.url}/users/${this.username}`);
  }

  /**
   * Returns coding stats for specific user from WakaTime
   *
   * @returns {AxiosStatic} Axios call promise
   * @memberof WakaTimeDataService
   */
  getCodingStats() {
    return axios
      .create({
        headers: {
          "Content-type": "application/json",
          Authorization: "Basic " + this.token
        }
      })
      .get(`${this.proxyUrl}${this.url}/users/${this.username}/stats/last_7_days`);
  }
}

export default new WakaTimeDataService();
