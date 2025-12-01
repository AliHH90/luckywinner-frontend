// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/authStore";

// --- Views ---
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import ProfileView from "../views/ProfileView.vue";
import CompetitionView from "../views/CompetitionView.vue";
import WinnersView from "../views/WinnersView.vue";
import LeaderboardView from "../views/LeaderboardView.vue";
// import AdView from "../views/AdView.vue";   // ⛔️ فعلاً غیرفعال
import EnterCodeView from "../views/EnterCodeView.vue";
import WalletView from "../views/WalletView.vue";

// --- Admin Views ---
import AdminDashboardView from "../views/admin/AdminDashboardView.vue";
import AdminUsersView from "../views/admin/AdminUsersView.vue";
import AdminCompetitionsView from "../views/admin/AdminCompetitionsView.vue";

const routes = [
  // --- Auth ---
  { path: "/login", name: "login", component: LoginView },
  { path: "/register", name: "register", component: RegisterView },

  // --- User pages ---
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
    meta: { requiresAuth: true },
  },
  {
    path: "/competition",
    name: "competition",
    component: CompetitionView,
  },
  {
    path: "/enter-code",
    name: "enter-code",
    component: EnterCodeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/wallet",
    name: "wallet",
    component: WalletView,
    meta: { requiresAuth: true },
  },
  {
    path: "/winners",
    name: "winners",
    component: WinnersView,
  },
  {
    path: "/leaderboard",
    name: "leaderboard",
    component: LeaderboardView,
  },

  // --- Admin pages ---
  {
    path: "/admin",
    name: "admin-dashboard",
    component: AdminDashboardView,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/users",
    name: "admin-users",
    component: AdminUsersView,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/competitions",
    name: "admin-competitions",
    component: AdminCompetitionsView,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  { path: "/enter-code", name: "enter-code", component: EnterCodeView, meta: { requiresAuth: true } },

  // --- Default ---
  { path: "/", redirect: "/profile" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// گارد مسیرها
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // نیاز به لاگین
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: "login" });
  }

  // نیاز به ادمین
  if (to.meta.requiresAdmin && authStore.user?.role !== "ADMIN") {
    return next({ name: "profile" });
  }

  next();
});

export default router;
