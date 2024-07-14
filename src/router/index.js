import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddOrg from "../views/AddOrg.vue";
import EditOrg from "../views/EditOrg.vue";
import LoginOrg from "../views/LoginOrg.vue";
import AssetsView from "../views/AssetsView.vue"; // Import AssetsView

const routes = [
  {
    path: "/",
    name: "LoginOrg",
    component: LoginOrg,
  },
  {
    path: "/home",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/add-org",
    name: "AddOrg",
    component: AddOrg,
  },
  {
    path: "/edit-org",
    name: "EditOrg",
    component: EditOrg,
  },
  {
    path: "/assets",
    name: "AssetsView",
    component: AssetsView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const publicPages = ["/"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = !!document.cookie.match(/authToken/);

  if (authRequired && !loggedIn) {
    return next("/");
  }

  next();
});

export default router;
