import axios from "axios";

class TodoistDataService {
  private url = process.env.VUE_APP_TODOIST_API_BASE_URL;
  private token = process.env.VUE_APP_TODOIST_API_USER_TOKEN;

  /**
   * Returns all active Todo Items
   *
   * @returns {AxiosStatic} Axios call promise
   * @memberof TodoistDataService
   */
  getItems() {
    return axios
      .create({
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + this.token
        }
      })
      .get(`${this.url}/tasks`);
  }

  /**
   * Closes a Todo Item
   *
   * @param {string} id The ID of the Todo Item
   * @returns {AxiosStatic} Axios call promise
   * @memberof TodoistDataService
   */
  closeItem(id: string) {
    return axios
      .create({
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + this.token
        },
        method: "post"
      })
      .post(`${this.url}/tasks/${id}/close`, {});
  }
}

export default new TodoistDataService();
