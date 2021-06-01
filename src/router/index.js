import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/register",
    name: "Registration",
    component: () => import("../views/registration.vue"),
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: () => import("../views/checkout.vue"),
  },
  {
    path: "/transaction-summary", // to be converted to parameter
    name: "TransactionSummary",
    component: () => import("../components/transactrionSummary.vue"),
  },
  {
    path: "*",
    name: "Page Not Found",
    component: () => import("../views/404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;