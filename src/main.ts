// Vue
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// External
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import VueSkycons from "vue-skycon";
import VueToast from "vue-toast-notification";

import "vue-toast-notification/dist/theme-sugar.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(VueSkycons);
Vue.use(VueToast);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
