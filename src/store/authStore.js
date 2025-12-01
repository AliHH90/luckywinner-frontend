// src/store/authStore.js
import { defineStore } from "pinia";
import api from "../api/axios";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    // توکن را مثل قبل از localStorage می‌گیریم
    token: localStorage.getItem(TOKEN_KEY) || null,

    // یوزر را هم از localStorage برمی‌گردانیم (اگر ذخیره شده باشد)
    user: (() => {
      const raw = localStorage.getItem(USER_KEY);
      if (!raw) return null;
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    })(),

    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,

    // نقش ادمین؛ اگر بک‌اند ROLE_ADMIN برگرداند هم پوشش می‌دهیم
    isAdmin: (state) =>
      state.user?.role === "ADMIN" || state.user?.role === "ROLE_ADMIN",
  },

  actions: {
    async login(phone, password) {
      this.loading = true;
      this.error = null;
      try {
        const res = await api.post("/auth/login", { phone, password });

        this.token = res.data.token;
        this.user = {
          phone: res.data.phone,
          fullName: res.data.fullName,
          role: res.data.role,
        };

        localStorage.setItem(TOKEN_KEY, this.token);
        localStorage.setItem(USER_KEY, JSON.stringify(this.user));
      } catch (err) {
        console.error(err);
        this.error = "ورود ناموفق بود. شماره یا رمز اشتباه است.";
      } finally {
        this.loading = false;
      }
    },

    async register(phone, password, fullName) {
      this.loading = true;
      this.error = null;
      try {
        const res = await api.post("/auth/register", {
          phone,
          password,
          fullName,
        });

        this.token = res.data.token;
        this.user = {
          phone: res.data.phone,
          fullName: res.data.fullName,
          role: res.data.role,
        };

        localStorage.setItem(TOKEN_KEY, this.token);
        localStorage.setItem(USER_KEY, JSON.stringify(this.user));
      } catch (err) {
        console.error(err);
        this.error =
          "ثبت‌نام ناموفق بود (ممکن است این شماره قبلاً ثبت شده باشد).";
      } finally {
        this.loading = false;
      }
    },

    // اگر جایی /me را صدا می‌زنی، این متد را هم نگه داریم
    async loadCurrentUser() {
      if (!this.token) return;
      try {
        const res = await api.get("/me");

        this.user = {
          phone: res.data.phone,
          fullName: res.data.fullName,
          role: res.data.role,
        };

        localStorage.setItem(USER_KEY, JSON.stringify(this.user));
      } catch (err) {
        console.error("loadCurrentUser error", err);
        this.logout();
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    },
  },
});
