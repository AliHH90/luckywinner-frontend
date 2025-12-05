<!-- src/views/admin/AdminDashboardView.vue -->
<template>
  <div class="admin-container">
    <!-- Header Section -->
    <header class="dashboard-header">
      <div class="header-content">
        <h1 class="title">
          <span class="title-text">داشبورد مدیریت</span>
          <span class="title-badge">Admin</span>
        </h1>
        <div class="header-subtitle">
          <svg class="subtitle-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clip-rule="evenodd" />
          </svg>
          <span>خلاصه وضعیت سیستم</span>
        </div>
      </div>
      <div class="header-actions">
        <button class="refresh-btn" @click="loadDashboard" :disabled="loading">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </header>

    <!-- Loading & Error States -->
    <div class="status-container">
      <div v-if="loading" class="status-card loading">
        <div class="spinner"></div>
        <span>در حال بارگذاری اطلاعات...</span>
      </div>
      <div v-if="error" class="status-card error">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
        </svg>
        <span>{{ error }}</span>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid" v-if="!loading && !error">
      <div class="stat-card user-stat">
        <div class="stat-header">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
            </svg>
          </div>
          <div class="stat-trend">
            <span class="trend-up">+12%</span>
          </div>
        </div>
        <div class="stat-body">
          <h3 class="stat-title">کاربران سیستم</h3>
          <p class="stat-value">{{ stats.totalUsers }}</p>
          <div class="stat-details">
            <span class="stat-label">ادمین‌ها: {{ stats.totalAdmins }}</span>
            <span class="stat-label">کاربران عادی: {{ stats.totalNonAdmins }}</span>
          </div>
        </div>
        <div class="stat-footer">
          <span class="stat-info">کل کاربران ثبت‌نام‌شده</span>
        </div>
      </div>

      <div class="stat-card competition-stat">
        <div class="stat-header">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="stat-trend">
            <span class="trend-up">+8%</span>
          </div>
        </div>
        <div class="stat-body">
          <h3 class="stat-title">مسابقات فعال</h3>
          <p class="stat-value">{{ stats.runningCompetitions }}</p>
          <div class="stat-details">
            <span class="stat-label">مجموع مسابقات: {{ stats.totalCompetitions }}</span>
          </div>
        </div>
        <div class="stat-footer">
          <span class="stat-info">مسابقات در حال اجرا</span>
        </div>
      </div>

      <div class="stat-card finished-stat">
        <div class="stat-header">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="stat-trend">
            <span class="trend-neutral">0%</span>
          </div>
        </div>
        <div class="stat-body">
          <h3 class="stat-title">مسابقات پایان‌یافته</h3>
          <p class="stat-value">{{ stats.finishedCompetitions }}</p>
          <div class="stat-details">
            <span class="stat-label">درصد موفقیت: 92%</span>
          </div>
        </div>
        <div class="stat-footer">
          <span class="stat-info">مسابقات تکمیل‌شده</span>
        </div>
      </div>

      <div class="stat-card prize-stat">
        <div class="stat-header">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
              <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="stat-trend">
            <span class="trend-up">+24%</span>
          </div>
        </div>
        <div class="stat-body">
          <h3 class="stat-title">جوایز پرداختی</h3>
          <p class="stat-value">{{ formatCurrency(stats.totalPrizePaid) }}</p>
          <div class="stat-details">
            <span class="stat-label">موجودی کل: {{ formatCurrency(stats.totalWalletBalance) }}</span>
          </div>
        </div>
        <div class="stat-footer">
          <span class="stat-info">مجموع جوایز توزیع‌شده</span>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="quick-actions" v-if="!loading && !error">
      <h2 class="section-title">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" clip-rule="evenodd" />
        </svg>
        عملیات سریع
      </h2>
      <div class="actions-grid">
        <router-link to="/admin/users" class="action-card user-action">
          <div class="action-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
            </svg>
          </div>
          <div class="action-content">
            <h3>مدیریت کاربران</h3>
            <p>مدیریت، ویرایش و مشاهده کاربران سیستم</p>
          </div>
          <div class="action-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clip-rule="evenodd" />
            </svg>
          </div>
        </router-link>

        <router-link to="/admin/competitions" class="action-card competition-action">
          <div class="action-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="action-content">
            <h3>مدیریت مسابقات</h3>
            <p>ایجاد، ویرایش و نظارت بر مسابقات</p>
          </div>
          <div class="action-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22 — 6.22a.75.75 0 010-1.06z" clip-rule="evenodd" />
            </svg>
          </div>
        </router-link>

        <div class="action-card report-action">
          <div class="action-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M3 2.25a.75.75 0 01.75.75v.54l1.838-.46a9.75 9.75 0 016.725.738l.108.054a8.25 8.25 0 005.58.652l3.109-.732a.75.75 0 01.917.81 47.784 47.784 0 00.005 10.337.75.75 0 01-.574.812l-3.114.733a9.75 9.75 0 01-6.594-.77l-.108-.054a8.25 8.25 0 00-5.69-.625l-2.202.55V21a.75.75 0 01-1.5 0V3A.75.75 0 013 2.25z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="action-content">
            <h3>گزارشات سیستم</h3>
            <p>گزارش‌های آماری و تحلیلی</p>
          </div>
          <div class="action-badge">
            <span>به‌زودی</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../../store/authStore";
import { apiGet } from "../../Services/apiClient";

const authStore = useAuthStore();

const loading = ref(false);
const error = ref("");

const stats = ref({
  totalUsers: 0,
  totalAdmins: 0,
  totalNonAdmins: 0,
  totalCompetitions: 0,
  runningCompetitions: 0,
  finishedCompetitions: 0,
  totalWalletBalance: 0,
  totalPrizePaid: 0,
});

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

async function loadDashboard() {
  loading.value = true;
  error.value = "";

  try {
    const data = await apiGet("/admin/dashboard", authStore.token);

    stats.value = {
      totalUsers: data.totalUsers || 0,
      totalAdmins: data.totalAdmins || 0,
      totalNonAdmins: data.totalNonAdmins || 0,
      totalCompetitions: data.totalCompetitions || 0,
      runningCompetitions: data.runningCompetitions || 0,
      finishedCompetitions: data.finishedCompetitions || 0,
      totalWalletBalance: data.totalWalletBalance || 0,
      totalPrizePaid: data.totalPrizePaid || 0,
    };
  } catch (e) {
    console.error(e);
    error.value = "خطا در دریافت اطلاعات داشبورد. لطفاً دوباره تلاش کنید.";
  } finally {
    loading.value = false;
  }
}

onMounted(loadDashboard);
</script>

<style scoped>
.admin-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0f 0%, #14141f 100%);
  font-family: 'Vazirmatn', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  direction: rtl;
}

/* Header Styles */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-content {
  flex: 1;
  text-align: center;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.title-text {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
}

.title-text::after {
  content: '';
  position: absolute;
  bottom: -8px;
  right: 0;
  left: 0;
  margin: 0 auto;
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
}

.title-badge {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 1px;
}

.header-subtitle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #94a3b8;
  font-size: 1rem;
  text-align: center;
}

.subtitle-icon {
  width: 20px;
  height: 20px;
  opacity: 0.7;
}

.header-actions {
  position: absolute;
  left: 2rem;
  top: 2rem;
}

.refresh-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #94a3b8;
}

.refresh-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  transform: rotate(45deg);
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.refresh-btn svg {
  width: 20px;
  height: 20px;
}

/* Status Container */
.status-container {
  margin-bottom: 2rem;
}

.status-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  text-align: center;
}

.status-card.loading {
  border-color: #667eea;
}

.status-card.error {
  border-color: #f5576c;
  background: rgba(245, 87, 108, 0.1);
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(102, 126, 234, 0.3);
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: rgba(17, 25, 40, 0.75);
  backdrop-filter: blur(16px);
  border-radius: 20px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.125);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.36);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  text-align: center;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, transparent, currentColor, transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-8px);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.stat-card:hover::before {
  opacity: 1;
}

.user-stat { color: #667eea; }
.competition-stat { color: #10b981; }
.finished-stat { color: #f59e0b; }
.prize-stat { color: #ec4899; }

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.stat-icon {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.stat-icon svg {
  width: 24px;
  height: 24px;
}

.stat-trend {
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
}

.trend-up { color: #10b981; }
.trend-down { color: #ef4444; }
.trend-neutral { color: #94a3b8; }

.stat-body {
  margin-bottom: 1.5rem;
}

.stat-title {
  font-size: 1rem;
  color: #94a3b8;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0.5rem 0;
  line-height: 1;
}

.stat-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  align-items: center;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
}

.stat-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
  text-align: center;
}

.stat-info {
  font-size: 0.875rem;
  color: #94a3b8;
}

/* Quick Actions */
.quick-actions {
  margin-top: 4rem;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 2rem;
  text-align: center;
}

.section-title svg {
  width: 24px;
  height: 24px;
  color: #667eea;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.action-card {
  background: rgba(17, 25, 40, 0.75);
  backdrop-filter: blur(16px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.125);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  text-align: center;
  flex-direction: column;
}

.action-card::before {
  content: '';
  position: absolute;
  top: 0;
  right: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: right 0.6s ease;
}

.action-card:hover::before {
  right: 100%;
}

.action-card:hover {
  transform: translateY(-8px);
  border-color: rgba(255, 255, 255, 0.3);
}

.user-action:hover {
  border-color: #667eea;
  box-shadow: 0 0 30px rgba(102, 126, 234, 0.3);
}

.competition-action:hover {
  border-color: #10b981;
  box-shadow: 0 0 30px rgba(16, 185, 129, 0.3);
}

.report-action {
  opacity: 0.7;
  cursor: not-allowed;
}

.action-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.user-action .action-icon { background: rgba(102, 126, 234, 0.2); }
.competition-action .action-icon { background: rgba(16, 185, 129, 0.2); }
.report-action .action-icon { background: rgba(148, 163, 184, 0.2); }

.action-icon svg {
  width: 28px;
  height: 28px;
}

.user-action .action-icon svg { color: #667eea; }
.competition-action .action-icon svg { color: #10b981; }
.report-action .action-icon svg { color: #94a3b8; }

.action-content {
  flex: 1;
  text-align: center;
}

.action-content h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.action-content p {
  font-size: 0.875rem;
  color: #94a3b8;
  margin: 0;
}

.action-arrow {
  color: #94a3b8;
  transition: transform 0.3s ease;
  margin-top: 1rem;
}

.action-card:hover .action-arrow {
  transform: translateX(-5px);
  color: white;
}

.action-arrow svg {
  width: 20px;
  height: 20px;
}

.action-badge {
  background: rgba(148, 163, 184, 0.2);
  color: #94a3b8;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: 1rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .admin-container {
    padding: 1.5rem;
  }
  
  .dashboard-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .title-text {
    font-size: 2rem;
  }
  
  .stats-grid,
  .actions-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  
  .header-actions {
    position: static;
    align-self: center;
  }
}

@media (max-width: 768px) {
  .admin-container {
    padding: 1rem;
  }
  
  .title {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .title-text {
    font-size: 1.75rem;
  }
  
  .stat-value {
    font-size: 2rem;
  }
  
  .stats-grid,
  .actions-grid {
    grid-template-columns: 1fr;
  }
  
  .action-card {
    padding: 1.5rem;
  }
  
  .header-actions {
    position: absolute;
    left: 1rem;
    top: 1rem;
  }
}

@media (max-width: 480px) {
  .title-text {
    font-size: 1.5rem;
  }
  
  .header-subtitle {
    font-size: 0.875rem;
  }
  
  .stat-card,
  .action-card {
    padding: 1.25rem;
  }
  
  .action-icon {
    width: 50px;
    height: 50px;
  }
  
  .action-icon svg {
    width: 24px;
    height: 24px;
  }
  
  .header-actions {
    position: static;
    margin-top: 1rem;
  }
}

/* Glass morphism effect for modern look */
.stat-card,
.action-card,
.status-card {
  background: rgba(17, 25, 40, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.125);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.36);
}

/* Smooth scroll behavior */
@media (prefers-reduced-motion: no-preference) {
  .admin-container {
    scroll-behavior: smooth;
  }
}

/* Focus styles for accessibility */
.refresh-btn:focus,
.action-card:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

/* Print styles */
@media print {
  .refresh-btn,
  .action-card {
    display: none;
  }
  
  .stat-card {
    break-inside: avoid;
    border: 1px solid #ccc;
  }
}
</style>