import Vue from "vue";
import VueRouter from "vue-router";
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  // {
  //   path: "/basic-table",
  //   name: "BasicTable",
  //   component: () => import("../views/BasicTableView.vue"),
  // },
  {
    path: "/expand-table",
    name: "ExpandTable",
    component: () => import("../views/ExpandTable.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
