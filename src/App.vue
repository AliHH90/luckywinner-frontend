<template>
  <div class="app">
    <header class="top-bar">
      <h1>Lucky Winner</h1>
      <nav>
        <!-- لینک‌های کاربر عادی -->
        <RouterLink to="/competition" v-if="isAuthenticated">رقابت</RouterLink>
        <RouterLink to="/enter-code" v-if="isAuthenticated">ثبت کد</RouterLink>
        <RouterLink to="/profile" v-if="isAuthenticated">پروفایل</RouterLink>

        <!-- لینک‌های عمومی -->
        <RouterLink to="/winners">برندگان</RouterLink>
        <RouterLink to="/leaderboard">رتبه‌بندی</RouterLink>
        <RouterLink to="/wallet" v-if="isAuthenticated">کیف پول</RouterLink>

        <!-- لینک‌های ادمین (فقط وقتی isAdmin=true) -->
        <RouterLink to="/admin" v-if="isAdmin">داشبورد ادمین</RouterLink> <!-- ✅ جدید -->
        <RouterLink to="/admin/users" v-if="isAdmin">کاربران</RouterLink> <!-- ✅ جدید -->
        <RouterLink to="/admin/competitions" v-if="isAdmin">مسابقات</RouterLink> <!-- ✅ جدید -->

        <!-- ورود / ثبت‌نام -->
        <RouterLink to="/login" v-if="!isAuthenticated">ورود</RouterLink>
        <RouterLink to="/register" v-if="!isAuthenticated">ثبت‌نام</RouterLink>

        <!-- خروج -->
        <button v-if="isAuthenticated" @click="logout">خروج</button>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "./store/authStore";

const authStore = useAuthStore();
const router = useRouter();
const { isAuthenticated, isAdmin } = storeToRefs(authStore);

function logout() {
  authStore.logout();
  router.push({ name: "login" });
}
</script>
<style scoped>
/* ========= VARIABLES ========= */
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --success-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  --danger-gradient: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  --premium-gradient: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --shadow-soft: 0 8px 32px rgba(0, 0, 0, 0.1);
  --shadow-hover: 0 20px 40px rgba(0, 0, 0, 0.15);
  --text-light: #ffffff;
  --text-muted: rgba(255, 255, 255, 0.8);
}

/* ========= BASE STYLES ========= */
.app {
  font-family: 'Inter', 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  direction: rtl;
  text-align: right;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
}

.app::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120, 219, 226, 0.1) 0%, transparent 50%);
  pointer-events: none;
  z-index: -1;
}

/* ========= TOP BAR ========= */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 1.5rem;
  background: linear-gradient(135deg, 
    rgba(30, 60, 114, 0.95) 0%, 
    rgba(42, 82, 152, 0.95) 50%,
    rgba(30, 60, 114, 0.95) 100%);
  color: var(--text-light);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.2),
    0 2px 8px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: sticky;    /* دسکتاپ و تبلت */
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid var(--glass-border);
}

/* ⬇️ اینو اضافه کن: روی موبایل استیکی نباشه و ارتفاع کمتر شه */
@media (max-width: 768px) {
  .top-bar {
    position: static;       /* استیکی خاموش در موبایل */
    padding: 0.4rem 0.8rem; /* ارتفاع کمتر */
  }

  .top-bar h1 {
    font-size: 1.1rem;
    padding: 0.4rem 0.8rem;
  }

  nav {
    gap: 0.3rem;
  }

  nav a,
  nav button {
    padding: 0.45rem 0.7rem;
    font-size: 0.7rem;
    min-width: 90px;
    border-radius: 10px;
  }
}

.top-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(90deg, 
      transparent 0%, 
      rgba(255, 255, 255, 0.05) 50%, 
      transparent 100%);
  pointer-events: none;
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* ========= LOGO/TITLE ========= */
.top-bar h1 {
  font-size: 1.3rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.805);
  background: linear-gradient(135deg, #fff 0%, #ffffff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  /* color: transparent; */
  font-family: 'Poppins', 'Vazirmatn', sans-serif;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  position: relative;
  padding: 0.5rem 1.1rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.top-bar h1::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.2), 
    transparent);
  transition: left 0.6s ease;
}

.top-bar h1:hover::before {
  left: 100%;
}

.top-bar h1::after {
  content: '🎯';
  margin-right: 0.75rem;
  font-size: 1.8rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-5px) scale(1.1); }
}

/* ========= NAVIGATION ========= */
nav {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
}

/* ========= NAV ITEMS ========= */
nav a {
  padding: 0.6rem 1.1rem;
  color: var(--text-muted);
  text-decoration: none;
  font-family: 'Vazirmatn', sans-serif;
  font-weight: 550;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.665);
  border-radius: 16px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* Admin links special styling */
nav a[v-if*="isAdmin"] {
  background: var(--premium-gradient);
  color: #fff;
  font-weight: 700;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 20px rgba(255, 154, 158, 0.3);
}

/* Auth links styling */
nav a[v-if*="!isAuthenticated"] {
  background: var(--success-gradient);
  color: #fff;
  font-weight: 600;
}

/* Hover effects */
nav a:hover {
  color: var(--text-light);
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 
    0 12px 30px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.3);
}

nav a[v-if*="isAdmin"]:hover {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #ff9a9e 100%);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 12px 30px rgba(255, 154, 158, 0.4);
}

nav a[v-if*="!isAuthenticated"]:hover {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #4facfe 100%);
  transform: translateY(-3px) scale(1.05);
}

/* ========= ACTIVE LINK ========= */
nav a.router-link-active {
  color: var(--text-light);
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.25), 
    rgba(255, 255, 255, 0.15));
  font-weight: 700;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 
    0 8px 25px rgba(255, 255, 255, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 8px 25px rgba(255, 255, 255, 0.15); }
  50% { box-shadow: 0 8px 30px rgba(255, 255, 255, 0.25); }
}

nav a.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  right: 50%;
  transform: translateX(50%);
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #fff, #e2e8f0, #fff);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.5);
}

/* ========= LOGOUT BUTTON ========= */
nav button {
  padding: 0.6rem 1.2rem;
  background: rgb(190, 6, 6);
  color: white;
  border: none;
  border-radius: 16px;
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 6px 20px rgba(255, 107, 107, 0.4),
    0 2px 6px rgba(255, 107, 107, 0.3);
  position: relative;
  overflow: hidden;
  margin-right: 0.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

nav button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.3), 
    transparent);
  transition: left 0.6s ease;
}

nav button:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 
    0 12px 30px rgba(255, 107, 107, 0.6),
    0 4px 12px rgba(255, 107, 107, 0.4);
}

nav button:hover::before {
  left: 100%;
}

nav button:active {
  transform: translateY(-1px) scale(1.02);
}

/* ========= MAIN CONTENT ========= */
main {
  padding: 2rem;
  min-height: calc(100vh - 80px);
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ========= RESPONSIVE DESIGN ========= */
@media (max-width: 1200px) {
  .top-bar {
    padding: 1rem 1.5rem;
  }
  
  nav {
    gap: 0.6rem;
  }
  
  nav a, nav button {
    padding: 0.7rem 1.3rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 968px) {
  .top-bar {
    flex-direction: column;
    gap: 1.2rem;
    padding: 1.2rem;
  }
  
  .top-bar h1 {
    font-size: 1.6rem;
    text-align: center;
    order: -1;
  }
  
  nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.6rem;
    width: 100%;
  }
  
  nav a, nav button {
    padding: 0.75rem 1.2rem;
    font-size: 0.82rem;
    flex: 1;
    min-width: 140px;
    text-align: center;
    border-radius: 12px;
  }
  
  main {
    padding: 1.5rem;
  }
}

@media (max-width: 640px) {
  .top-bar h1 {
    font-size: 1.4rem;
    padding: 0.6rem 1.2rem;
  }
  
  nav {
    gap: 0.4rem;
  }
  
  nav a, nav button {
    padding: 0.65rem 1rem;
    font-size: 0.78rem;
    min-width: 120px;
    border-radius: 10px;
  }
  
  main {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .top-bar {
    padding: 1rem;
  }
  
  .top-bar h1 {
    font-size: 1.3rem;
    padding: 0.5rem 1rem;
  }
  
  nav a, nav button {
    padding: 0.6rem 0.8rem;
    font-size: 0.75rem;
    min-width: 110px;
  }
  
  main {
    padding: 0.75rem;
  }
}

/* ========= ACCESSIBILITY & PERFORMANCE ========= */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

nav a:focus-visible,
nav button:focus-visible {
  outline: 3px solid rgba(255, 255, 255, 0.8);
  outline-offset: 2px;
  border-radius: 16px;
}

/* ========= LOADING STATES ========= */
nav a, nav button {
  position: relative;
}

nav a:active,
nav button:active {
  transform: scale(0.98);
  transition: transform 0.1s ease;
}

/* ========= GLOW EFFECTS ========= */
.top-bar::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(255, 255, 255, 0.3) 50%, 
    transparent 100%);
  filter: blur(2px);
}
</style>
