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
    path: "/register",
    name: "Registration",
    component: () => import("../views/registration.vue"),
  },
  {
    path: "/signin",
    name: "SiginIn",
    component: () => import("../views/signIn.vue"),
  },
  {
    path: "/forgot-password",
    name: "forgotPassword",
    component: () => import("../views/forgotPassword.vue"),
  },
  {
    path: "/search-trip",
    name: "SearchTrip",
    component: () => import("../views/searchTrip.vue"),
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () => import("../views/checkout.vue"),
  },
  {
    path: "/transaction-summary", // to be converted to parameter
    name: "TransactionSummary",
    component: () => import("../components/transactionSummary.vue"),
  },
  {
    path: "/profile",
    component: () => import("../layout/profileLayout.vue"),
    children: [
      {
        path: "/",
        name: "profile",
        component: () => import("../views/auth/profile/profile.vue"),
      },
      {
        path: "/my-reservations",
        name: "myReservations",
        component: () => import("../views/auth/profile/myReservations.vue"),
      },
      {
        path: "/my-payments",
        name: "paymentMode",
        component: () => import("../views/auth/profile/myPayments.vue"),
      },
      {
        path: "/refund",
        name: "refund",
        component: () => import("../views/auth/profile/refund.vue"),
      },
      {
        path: "/voucher",
        name: "refundVoucher",
        component: () => import("../views/auth/profile/refundVoucher.vue"),
      },
    ],
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
