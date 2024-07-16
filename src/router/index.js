import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginOrg from "../views/LoginOrg.vue";
import AddOrg from "../views/AddOrg.vue";
import EditOrg from "../views/EditOrg.vue";
import AssetsView from "../views/AssetsView.vue";
import AddAssets from "../views/AddAssets.vue";
import EditAssets from "../views/EditAssets.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginOrg,
  },
  {
    path: "/add-org",
    name: "AddOrg",
    component: AddOrg,
    meta: { requiresAuth: true },
  },
  {
    path: "/edit-org",
    name: "EditOrg",
    component: EditOrg,
    meta: { requiresAuth: true },
  },
  {
    path: "/assets",
    name: "Assets",
    component: AssetsView,
    meta: { requiresAuth: true },
  },
  {
    path: "/add-assets",
    name: "AddAssets",
    component: AddAssets,
    meta: { requiresAuth: true },
  },
  {
    path: "/edit-assets/:id",
    name: "EditAsset",
    component: EditAssets,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const token = document.cookie
    .split(";")
    .find((c) => c.trim().startsWith("authToken="));

  if (requiresAuth && !token) {
    next("/login");
  } else {
    next();
  }
});

export default router;
