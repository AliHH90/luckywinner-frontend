<template>
  <div class="winners-container">
    <!-- Animated Header -->
    <header class="winners-header">
      <div class="header-bg">
        <div class="bg-particles">
          <div v-for="i in 20" :key="i" class="particle" :style="particleStyle(i)"></div>
        </div>
      </div>
      
      <div class="header-content">
        <div class="title-section">
          <h1 class="main-title">
            <span class="title-glow">🏆 آخرین برندگان 🏆</span>
          </h1>
          <p class="header-subtitle">تقدیر از برندگان مسابقات و مشاهده جوایز دریافتی</p>
        </div>
        
        <div class="header-stats">
          <div class="stat-card">
            <div class="stat-icon">👑</div>
            <div class="stat-content">
              <div class="stat-value">{{ winners.length }}</div>
              <div class="stat-label">برنده کل</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">💰</div>
            <div class="stat-content">
              <div class="stat-value">{{ totalPrizes.toFixed(2) }} $</div>
              <div class="stat-label">جایزه کل</div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Controls Section -->
    <section class="controls-section">
      <div class="controls-card">
        <div class="controls-header">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="controls-icon">
            <path fill-rule="evenodd" d="M3.792 2.938A49.069 49.069 0 0112 2.25c2.797 0 5.54.236 8.208.688.339.055.67.14.987.255.177.063.345.14.504.232.244.113.465.255.66.418.314.217.59.483.815.784l.002.003.002.002.001.002a2.25 2.25 0 01-.45 2.871c-.658.727-1.458 1.308-2.35 1.706-.206.092-.423.173-.647.241a13.725 13.725 0 01-1.622.435 49.078 49.078 0 01-6.165.385c-2.078-.01-4.116-.204-6.094-.485a13.716 13.716 0 01-1.625-.435 8.254 8.254 0 01-.646-.241c-.893-.398-1.692-.98-2.35-1.706a2.25 2.25 0 01-.45-2.871l.001-.002.002-.002.003-.003a5.022 5.022 0 01.66-.418c.16-.092.327-.17.504-.232.317-.114.648-.2.987-.255z" clip-rule="evenodd" />
          </svg>
          <h2 class="controls-title">تنظیمات نمایش</h2>
        </div>
        
        <div class="controls-body">
          <div class="control-group">
            <label class="control-label">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="control-icon">
                <path fill-rule="evenodd" d="M3.792 2.938A49.069 49.069 0 0112 2.25c2.797 0 5.54.236 8.208.688.339.055.67.14.987.255.177.063.345.14.504.232.244.113.465.255.66.418.314.217.59.483.815.784l.002.003.002.002.001.002a2.25 2.25 0 01-.45 2.871c-.658.727-1.458 1.308-2.35 1.706-.206.092-.423.173-.647.241a13.725 13.725 0 01-1.622.435 49.078 49.078 0 01-6.165.385c-2.078-.01-4.116-.204-6.094-.485a13.716 13.716 0 01-1.625-.435 8.254 8.254 0 01-.646-.241c-.893-.398-1.692-.98-2.35-1.706a2.25 2.25 0 01-.45-2.871l.001-.002.002-.002.003-.003a5.022 5.022 0 01.66-.418c.16-.092.327-.17.504-.232.317-.114.648-.2.987-.255z" clip-rule="evenodd" />
              </svg>
              تعداد ردیف‌های نمایش
            </label>
            <div class="range-container">
              <input 
                type="range" 
                v-model.number="limit" 
                min="1" 
                max="100" 
                step="1"
                class="range-input"
              />
              <div class="range-value">
                <span class="value-number">{{ limit }}</span>
                <span class="value-label">برنده</span>
              </div>
            </div>
          </div>
          
          <div class="control-actions">
            <button 
              @click="loadWinners" 
              :disabled="loading"
              class="btn btn-primary"
            >
              <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="spinner">
                <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clip-rule="evenodd" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="btn-icon">
                <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clip-rule="evenodd" />
              </svg>
              {{ loading ? 'در حال بارگذاری...' : 'بروزرسانی لیست' }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p class="loading-text">در حال دریافت لیست برندگان...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error && !loading" class="error-container">
      <div class="error-content">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="error-icon">
          <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
        </svg>
        <div class="error-text">
          <h3 class="error-title">خطا در دریافت اطلاعات</h3>
          <p class="error-description">{{ error }}</p>
        </div>
        <button @click="loadWinners" class="btn btn-secondary">تلاش مجدد</button>
      </div>
    </div>

    <!-- Winners List -->
    <section v-if="!loading && !error" class="winners-section">
      <div class="section-header">
        <h2 class="section-title">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="section-icon">
            <path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h.75c2.708 0 5.208-.998 7.147-2.65.527-.514 1.151-.96 1.851-1.326.203-.103.412-.194.625-.272a9.06 9.06 0 01-1.086-.243c-1.128-.282-2.34-.375-3.591-.297a9.1 9.1 0 01-1.439.087 9.053 9.053 0 01-.713-.07 6.703 6.703 0 01-1.96-3.87 6.724 6.724 0 01-.096-1.764c-2.132-.36-3.96-1.598-4.7-3.366a6.76 6.76 0 01-1.09-3.17c0-.11.012-.22.027-.329C3.6 2.88 4.34 2.621 5.166 2.621z" clip-rule="evenodd" />
          </svg>
          لیست برندگان
          <span class="count-badge">{{ winners.length }} نفر</span>
        </h2>
        
        <div class="section-actions">
          <div class="time-filter">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="filter-icon">
              <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clip-rule="evenodd" />
            </svg>
            <span class="filter-text">آخرین برندگان</span>
          </div>
        </div>
      </div>

      <!-- Winners Table -->
      <div v-if="winners.length" class="winners-table-container">
        <div class="table-responsive">
          <table class="winners-table">
            <thead>
              <tr>
                <th class="rank-col">رتبه</th>
                <th class="winner-col">برنده</th>
                <th class="competition-col">مسابقه</th>
                <th class="prize-col">جایزه</th>
                <th class="date-col">تاریخ</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(winner, index) in winners" 
                :key="index"
                :class="[
                  'winner-row',
                  `rank-${index + 1}`,
                  { 'highlighted': index < 3 }
                ]"
              >
                <td class="rank-cell">
                  <div class="rank-badge" :class="`rank-${index + 1}`">
                    <span v-if="index === 0" class="medal-icon">🥇</span>
                    <span v-else-if="index === 1" class="medal-icon">🥈</span>
                    <span v-else-if="index === 2" class="medal-icon">🥉</span>
                    <span v-else class="rank-number">{{ index + 1 }}</span>
                  </div>
                </td>
                <td class="winner-cell">
                  <div class="winner-info">
                    <div class="winner-avatar">
                      {{ getInitials(winner.fullName) }}
                    </div>
                    <div class="winner-details">
                      <h4 class="winner-name">{{ winner.fullName }}</h4>
                      <p class="winner-contact">{{ winner.phone }}</p>
                    </div>
                  </div>
                </td>
                <td class="competition-cell">
                  <div class="competition-info">
                    <h5 class="competition-title">{{ winner.competitionTitle }}</h5>
                    <p class="competition-round">مرحله {{ winner.competitionRound || 1 }}</p>
                  </div>
                </td>
                <td class="prize-cell">
                  <div class="prize-amount">
                    <span class="prize-value">{{ winner.prize }}</span>
                    <span class="prize-symbol">$</span>
                  </div>
                  <div v-if="index < 3" class="prize-badge">
                    {{ index === 0 ? 'طلایی' : index === 1 ? 'نقره‌ای' : 'برنزی' }}
                  </div>
                </td>
                <td class="date-cell">
                  <div class="date-info">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="date-icon">
                      <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clip-rule="evenodd" />
                    </svg>
                    <div class="date-details">
                      <div class="date-text">{{ formatDate(winner.enterTime) }}</div>
                      <div class="time-text">{{ formatTime(winner.enterTime) }}</div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="table-footer">
          <div class="footer-info">
            نمایش {{ winners.length }} برنده آخر
            <span v-if="limit < totalWinners" class="more-info">
              (از {{ totalWinners }} برنده کل)
            </span>
          </div>
          <div class="footer-stats">
            <div class="stat-item">
              <span class="stat-label">میانگین جایزه:</span>
              <span class="stat-value">{{ averagePrize.toFixed(2) }} $</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">بیشترین جایزه:</span>
              <span class="stat-value">{{ maxPrize.toFixed(2) }} $</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <div class="empty-content">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="empty-icon">
            <path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h.75c2.708 0 5.208-.998 7.147-2.65.527-.514 1.151-.96 1.851-1.326.203-.103.412-.194.625-.272a9.06 9.06 0 01-1.086-.243c-1.128-.282-2.34-.375-3.591-.297a9.1 9.1 0 01-1.439.087 9.053 9.053 0 01-.713-.07 6.703 6.703 0 01-1.96-3.87 6.724 6.724 0 01-.096-1.764c-2.132-.36-3.96-1.598-4.7-3.366a6.76 6.76 0 01-1.09-3.17c0-.11.012-.22.027-.329C3.6 2.88 4.34 2.621 5.166 2.621z" clip-rule="evenodd" />
          </svg>
          <div class="empty-text">
            <h3 class="empty-title">هنوز برنده‌ای ثبت نشده است</h3>
            <p class="empty-description">اولین برنده مسابقات شما باشید!</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "../store/authStore";

const authStore = useAuthStore();
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:31000/api";

const winners = ref([]);
const limit = ref(10);
const loading = ref(false);
const error = ref("");
const totalWinners = ref(0);

// Computed properties
const totalPrizes = computed(() => {
  return winners.value.reduce((sum, winner) => {
    const prize = parseFloat(winner.prize) || 0;
    return sum + prize;
  }, 0);
});

const averagePrize = computed(() => {
  if (winners.value.length === 0) return 0;
  return totalPrizes.value / winners.value.length;
});

const maxPrize = computed(() => {
  if (winners.value.length === 0) return 0;
  return Math.max(...winners.value.map(w => parseFloat(w.prize) || 0));
});

function getInitials(name) {
  if (!name) return "??";
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function formatDate(dateString) {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  } catch {
    return dateString;
  }
}

function formatTime(dateString) {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  } catch {
    return "-";
  }
}

function formatDateTime(dt) {
  if (!dt) return "";
  try {
    return new Date(dt).toLocaleString("fa-IR");
  } catch {
    return dt;
  }
}

function particleStyle(index) {
  const size = Math.random() * 40 + 20;
  const duration = Math.random() * 3 + 2;
  const delay = Math.random() * 2;
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${x}%`,
    top: `${y}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  };
}

async function loadWinners() {
  loading.value = true;
  error.value = "";
  winners.value = [];

  try {
    const res = await fetch(
      `${API_BASE}/winners/latest?limit=${encodeURIComponent(limit.value)}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status} - ${text || res.statusText}`);
    }

    const data = await res.json();
    winners.value = data;
    
    // Estimate total winners (for demo purposes)
    totalWinners.value = data.length * 10; // This is just for demo
    
  } catch (e) {
    console.error(e);
    error.value = "خطا در دریافت لیست برندگان: " + (e.message || "Failed to fetch");
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadWinners();
});
</script>

<style scoped>
.winners-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem 3rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  font-family: 'Vazirmatn', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  direction: rtl;
}

/* Header Styles */
.winners-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0 0 40px 40px;
  padding: 3rem 2rem 2rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
}

.header-bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
}

.bg-particles {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 5s ease-in-out infinite;
  opacity: 0.3;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(10px, -10px) rotate(90deg);
  }
  50% {
    transform: translate(0, -20px) rotate(180deg);
  }
  75% {
    transform: translate(-10px, -10px) rotate(270deg);
  }
}

.header-content {
  position: relative;
  z-index: 1;
  color: white;
}

.title-section {
  text-align: center;
  margin-bottom: 2rem;
}

.main-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.title-glow {
  background: linear-gradient(90deg, #fff, #e2e8f0, #fff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: textShine 3s ease-in-out infinite alternate;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

@keyframes textShine {
  to {
    background-position: 200% center;
  }
}

.header-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-top: 0.5rem;
}

.header-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.stat-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 180px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.2);
}

.stat-icon {
  font-size: 2rem;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-top: 0.25rem;
}

/* Controls Section */
.controls-section {
  margin-bottom: 2rem;
}

.controls-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.controls-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;
}

.controls-icon {
  width: 28px;
  height: 28px;
  color: #667eea;
}

.controls-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.controls-body {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.control-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #4a5568;
  font-size: 1rem;
}

.control-icon {
  width: 20px;
  height: 20px;
  color: #667eea;
}

.range-container {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.range-input {
  flex: 1;
  height: 8px;
  -webkit-appearance: none;
  appearance: none;
  background: linear-gradient(to left, #667eea, #764ba2);
  border-radius: 4px;
  outline: none;
}

.range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #667eea;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.range-input::-moz-range-thumb {
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #667eea;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.range-value {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  min-width: 80px;
  text-align: center;
  font-weight: 600;
}

.value-number {
  font-size: 1.2rem;
}

.value-label {
  font-size: 0.85rem;
  opacity: 0.9;
}

.control-actions {
  display: flex;
  justify-content: center;
}

/* Button Styles */
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-secondary:hover:not(:disabled) {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.spinner {
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Loading State */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.loading-content {
  text-align: center;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1.5rem;
}

.loading-text {
  font-size: 1.2rem;
  color: #4a5568;
  font-weight: 500;
}

/* Error State */
.error-container {
  background: linear-gradient(135deg, rgba(245, 101, 101, 0.1) 0%, rgba(229, 62, 62, 0.1) 100%);
  border: 1px solid rgba(245, 101, 101, 0.2);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
}

.error-content {
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.error-icon {
  width: 64px;
  height: 64px;
  color: #f56565;
}

.error-text {
  color: #4a5568;
}

.error-title {
  font-size: 1.5rem;
  color: #f56565;
  margin-bottom: 0.5rem;
}

.error-description {
  font-size: 1rem;
  color: #718096;
}

/* Winners Section */
.winners-section {
  margin-top: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.section-icon {
  width: 28px;
  height: 28px;
  color: #667eea;
}

.count-badge {
  background: #e2e8f0;
  color: #4a5568;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.section-actions {
  display: flex;
  gap: 1rem;
}

.time-filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.9rem;
  color: #4a5568;
}

.filter-icon {
  width: 16px;
  height: 16px;
  color: #667eea;
}

/* Winners Table */
.winners-table-container {
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.table-responsive {
  overflow-x: auto;
}

.winners-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 800px;
}

.winners-table thead {
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
}

.winners-table th {
  padding: 1.5rem 1rem;
  font-weight: 600;
  color: #4a5568;
  text-align: right;
  border-bottom: 2px solid #e2e8f0;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.winners-table tbody tr {
  transition: all 0.3s ease;
  border-bottom: 1px solid #f1f5f9;
}

.winners-table tbody tr:hover {
  background-color: #f8fafc;
}

.winner-row {
  border-left: 4px solid transparent;
}

.winner-row.highlighted {
  border-left-color: #667eea;
}

.winner-row.rank-1 {
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.05) 0%, transparent 100%);
}

.winner-row.rank-2 {
  background: linear-gradient(90deg, rgba(192, 192, 192, 0.05) 0%, transparent 100%);
}

.winner-row.rank-3 {
  background: linear-gradient(90deg, rgba(205, 127, 50, 0.05) 0%, transparent 100%);
}

.winners-table td {
  padding: 1.5rem 1rem;
  vertical-align: middle;
}

/* Rank Cell */
.rank-cell {
  width: 80px;
}

.rank-badge {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  margin: 0 auto;
}

.rank-badge.rank-1 {
  background: linear-gradient(135deg, #FFD700 0%, #FFC300 100%);
  color: #fff;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
}

.rank-badge.rank-2 {
  background: linear-gradient(135deg, #C0C0C0 0%, #A0A0A0 100%);
  color: #fff;
  box-shadow: 0 4px 15px rgba(192, 192, 192, 0.3);
}

.rank-badge.rank-3 {
  background: linear-gradient(135deg, #CD7F32 0%, #B06A28 100%);
  color: #fff;
  box-shadow: 0 4px 15px rgba(205, 127, 50, 0.3);
}

.rank-badge:not(.rank-1):not(.rank-2):not(.rank-3) {
  background: #e2e8f0;
  color: #4a5568;
}

.medal-icon {
  font-size: 1.5rem;
}

.rank-number {
  font-weight: 700;
}

/* Winner Cell */
.winner-cell {
  min-width: 250px;
}

.winner-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.winner-avatar {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.winner-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.winner-name {
  font-weight: 600;
  color: #2d3748;
  margin: 0;
  font-size: 1.1rem;
}

.winner-contact {
  font-size: 0.9rem;
  color: #718096;
  margin: 0;
}

/* Competition Cell */
.competition-cell {
  min-width: 200px;
}

.competition-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.competition-title {
  font-weight: 600;
  color: #2d3748;
  margin: 0;
  font-size: 1rem;
}

.competition-round {
  font-size: 0.85rem;
  color: #718096;
  margin: 0;
}

/* Prize Cell */
.prize-cell {
  min-width: 150px;
}

.prize-amount {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.prize-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2dce89;
}

.prize-symbol {
  font-size: 1rem;
  color: #2dce89;
}

.prize-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(72, 187, 120, 0.1);
  color: #2dce89;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

/* Date Cell */
.date-cell {
  min-width: 180px;
}

.date-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.date-icon {
  width: 20px;
  height: 20px;
  color: #a0aec0;
  flex-shrink: 0;
}

.date-details {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.date-text {
  font-size: 0.9rem;
  color: #4a5568;
}

.time-text {
  font-size: 0.85rem;
  color: #718096;
}

/* Table Footer */
.table-footer {
  padding: 1.5rem;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-info {
  font-size: 0.9rem;
  color: #718096;
}

.more-info {
  color: #667eea;
  font-weight: 500;
}

.footer-stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #718096;
}

.stat-value {
  font-weight: 600;
  color: #2d3748;
}

/* Empty State */
.empty-state {
  padding: 4rem 2rem;
  text-align: center;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.empty-content {
  max-width: 400px;
  margin: 0 auto;
}

.empty-icon {
  width: 80px;
  height: 80px;
  color: #cbd5e0;
  margin-bottom: 1.5rem;
}

.empty-text h3 {
  font-size: 1.5rem;
  color: #4a5568;
  margin-bottom: 0.5rem;
}

.empty-text p {
  color: #718096;
  font-size: 1.1rem;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .winners-container {
    padding: 0 0.5rem 2rem;
  }
}

@media (max-width: 768px) {
  .winners-header {
    padding: 2rem 1rem 1.5rem;
    border-radius: 0 0 30px 30px;
  }
  
  .main-title {
    font-size: 2rem;
  }
  
  .header-stats {
    flex-direction: column;
    align-items: center;
  }
  
  .stat-card {
    width: 100%;
    max-width: 250px;
  }
  
  .controls-card {
    padding: 1.5rem;
  }
  
  .range-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .section-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .table-footer {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }
  
  .footer-stats {
    justify-content: center;
  }
  
  .winner-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .date-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.75rem;
  }
  
  .stat-value {
    font-size: 1.5rem;
  }
  
  .controls-title {
    font-size: 1.1rem;
  }
  
  .btn {
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
  }
  
  .prize-value {
    font-size: 1.3rem;
  }
}
</style>