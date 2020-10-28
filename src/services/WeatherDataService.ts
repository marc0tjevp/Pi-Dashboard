import http from "../http-common";

class WeatherDataService {
  private forecastUrl =
    "https://api.darksky.net/forecast/8b088c420a2de405435555ab9a3a4e22/51.58307,4.7769505?units=si";
  private proxyUrl = process.env.VUE_APP_PROXY_API_URL;

  /**
   * Returns the weather forecast for specified location
   *
   * @returns {AxiosStatic} Axios call promise
   * @memberof WeatherDataService
   */
  getForecast() {
    return http.get(`${this.proxyUrl}${this.forecastUrl}`);
  }
}

export default new WeatherDataService();
