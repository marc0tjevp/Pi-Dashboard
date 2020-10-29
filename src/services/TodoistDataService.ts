import axios from "axios";

class TodoistDataService {
  private url = process.env.VUE_APP_BASE_URL;

  /**
   * Returns all active Todo Items
   *
   * @returns {AxiosStatic} Axios call promise
   * @memberof TodoistDataService
   */
  getItems() {
    return axios.get(`${this.url}/todo`);
  }

  /**
   * Closes a Todo Item
   *
   * @param {string} id The ID of the Todo Item
   * @returns {AxiosStatic} Axios call promise
   * @memberof TodoistDataService
   */
  closeItem(id: string) {
    return axios.post(`${this.url}/todo/${id}/close`, {});
  }

  /**
   * Returns a Todo Item by id
   *
   * @param {string} id The ID of the Todo Item
   * @returns {AxiosStatic} Axios call promise
   * @memberof TodoistDataService
   */
  getItem(id: string) {
    return axios.get(`${this.url}/todo/${id}`, {});
  }
}

export default new TodoistDataService();
