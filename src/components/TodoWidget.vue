<template>
  <div class="widget widget--todo">
    <b-card
      bg-variant="dark"
      header="Todo"
      text-variant="white"
      class="text-center h-100 shadow"
    >
      <b-card-text class="text-left">
        <table class="table table-dark widget--todo__inner">
          <tr v-for="item in items" :key="item.id">
            <td>
              <b-icon
                variant="info"
                v-on:click="closeItem(item)"
                :icon="item.completed ? 'check-square' : 'square'"
              >
              </b-icon>
            </td>
            <td>{{ item.content }}</td>
          </tr>
          <tr v-for="item in completedItems" :key="item.id">
            <td>
              <b-icon
                variant="info"
                :icon="item.completed ? 'check-square' : 'square'"
              >
              </b-icon>
            </td>
            <td>{{ item.content }}</td>
          </tr>
        </table>
      </b-card-text>
      <template #footer>
        <small class="text-muted">Updated: {{ lastRefresh }}</small>
        <b-icon
          class="float-right h5 mt-2"
          v-on:click="getItems()"
          icon="arrow-clockwise"
        />
      </template>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getCurrentTime } from "../helpers";

import { TodoItem } from "../types/Todo.types";
import TodoistDataService from "../services/TodoistDataService";

@Component
export default class TodoWidget extends Vue {
  private items: TodoItem[] = [];
  private completedItems: TodoItem[] = [];
  private lastRefresh = "";

  closeItem(item: TodoItem) {
    TodoistDataService.closeItem(item.id)
      .then(() => {
        this.createToast("Todo Item succesfully closed", "success");
        this.getItems();
      })
      .catch(() => this.createToast("Todo Item couldn't be closed", "error"));
    item.completed = true;
    this.completedItems.push(item);
  }

  getItems() {
    TodoistDataService.getItems()
      .then(result => {
        this.items = result.data;
        this.lastRefresh = getCurrentTime();
      })
      .catch(() => this.createToast("Unable to fetch Todo Items", "error"));
  }

  createToast(text: string, type: string) {
    this.$toast.open({
      message: text,
      position: "top",
      type: type
    });
  }

  mounted() {
    this.getItems();

    setInterval(() => {
      this.getItems();
    }, 10 * 60 * 1000);
  }
}
</script>

<style scoped lang="scss">
.widget--todo {
  .card-body {
    padding: 0px;
  }

  &__inner {
    padding: 1.25rem;
    margin-bottom: 0;
  }
}
</style>
