import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import cookie from "js-cookie";
import axios from "axios";
import { createBootstrap } from "bootstrap-vue-next";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "@/assets/style.scss";

const axiosinstance = axios.create({
  baseURL: "https://payrollium.b2camp.id/",
  timeout: 180000,
  headers: {
    "Content-Type": "application/json",
  },
});

const app = createApp(App);
app.use(store);
app.use(router);
app.use(createBootstrap({ components: true, directives: true }));
app.config.globalProperties.$axios = { ...axiosinstance };
app.config.globalProperties.$cookie = cookie;

router.beforeEach((to, from, next) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const authToken = cookie.get("authToken");

  if (authRequired && !authToken) {
    return next("/login");
  }

  next();
});

app.mount("#app");
