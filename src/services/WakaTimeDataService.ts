import axios from "axios";

class WakaTimeDataService {
  private url = process.env.VUE_APP_BASE_URL;

  /**
   * Returns user info from WakaTime
   *
   * @returns {AxiosStatic} Axios call promise
   * @memberof WakaTimeDataService
   */
  getUserInfo() {
    return axios.get(`${this.url}/code/user`);
  }

  /**
   * Returns coding stats for specific user from WakaTime
   *
   * @returns {AxiosStatic} Axios call promise
   * @memberof WakaTimeDataService
   */
  getCodingStats() {
    return axios
      .get(`${this.url}/code/stats`);
  }
}

export default new WakaTimeDataService();
