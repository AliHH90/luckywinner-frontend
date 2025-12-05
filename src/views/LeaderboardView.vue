<template>
  <div class="leaderboard-container">
    <!-- Animated Header -->
    <header class="leaderboard-header">
      <div class="header-content">
        <h1 class="main-title">
          <span class="title-icon">👑</span>
          <span class="title-text">جدول رتبه‌بندی</span>
        </h1>
        <p class="header-subtitle">برترین برندگان بر اساس مجموع جوایز دریافتی</p>
      </div>
      
      <div class="header-stats">
        <div class="stat-card">
          <div class="stat-icon">🏆</div>
          <div class="stat-content">
            <div class="stat-value">{{ totalParticipants }}</div>
            <div class="stat-label">شرکت‌کننده</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">💰</div>
          <div class="stat-content">
            <div class="stat-value">{{ totalWinnings.toFixed(2) }} $</div>
            <div class="stat-label">جایزه کل</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <div class="stat-content">
            <div class="stat-value">{{ avgWinnings.toFixed(2) }} $</div>
            <div class="stat-label">میانگین</div>
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
              تعداد نفرات برتر
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
                <span class="value-label">نفر</span>
              </div>
            </div>
          </div>
          
          <div class="control-actions">
            <button 
              @click="loadLeaderboard" 
              :disabled="loading"
              class="btn btn-primary"
            >
              <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="spinner">
                <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clip-rule="evenodd" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="btn-icon">
                <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clip-rule="evenodd" />
              </svg>
              {{ loading ? 'در حال بارگذاری...' : 'بروزرسانی جدول' }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p class="loading-text">در حال بارگذاری جدول رتبه‌بندی...</p>
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
        <button @click="loadLeaderboard" class="btn btn-secondary">تلاش مجدد</button>
      </div>
    </div>

    <!-- Leaderboard Content -->
    <section v-if="!loading && !error" class="leaderboard-section">
      <div class="section-header">
        <h2 class="section-title">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="section-icon">
            <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
          </svg>
          جدول برترین‌ها
          <span class="count-badge">{{ entries.length }} نفر</span>
        </h2>
        
        <div class="section-filters">
          <div class="filter-badge">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="filter-icon">
              <path fill-rule="evenodd" d="M3.792 2.938A49.069 49.069 0 0112 2.25c2.797 0 5.54.236 8.208.688.339.055.67.14.987.255.177.063.345.14.504.232.244.113.465.255.66.418.314.217.59.483.815.784l.002.003.002.002.001.002a2.25 2.25 0 01-.45 2.871c-.658.727-1.458 1.308-2.35 1.706-.206.092-.423.173-.647.241a13.725 13.725 0 01-1.622.435 49.078 49.078 0 01-6.165.385c-2.078-.01-4.116-.204-6.094-.485a13.716 13.716 0 01-1.625-.435 8.254 8.254 0 01-.646-.241c-.893-.398-1.692-.98-2.35-1.706a2.25 2.25 0 01-.45-2.871l.001-.002.002-.002.003-.003a5.022 5.022 0 01.66-.418c.16-.092.327-.17.504-.232.317-.114.648-.2.987-.255z" clip-rule="evenodd" />
            </svg>
            بر اساس مجموع بردها
          </div>
        </div>
      </div>

      <!-- Leaderboard Table -->
      <div v-if="entries.length" class="leaderboard-table-container">
        <!-- Top 3 Podium -->
        <div v-if="entries.length >= 3" class="podium-section">
          <div class="podium-container">
            <div class="podium-item second">
              <div class="podium-rank">🥈</div>
              <div class="podium-avatar">
                {{ getInitials(entries[1].fullName) }}
              </div>
              <div class="podium-info">
                <h4 class="podium-name">{{ entries[1].fullName }}</h4>
                <div class="podium-amount">{{ entries[1].totalWon.toFixed(2) }} $</div>
              </div>
              <div class="podium-bar" style="height: 70%;"></div>
            </div>
            
            <div class="podium-item first">
              <div class="podium-rank">🥇</div>
              <div class="podium-avatar">
                {{ getInitials(entries[0].fullName) }}
              </div>
              <div class="podium-info">
                <h4 class="podium-name">{{ entries[0].fullName }}</h4>
                <div class="podium-amount">{{ entries[0].totalWon.toFixed(2) }} $</div>
              </div>
              <div class="podium-bar" style="height: 100%;"></div>
            </div>
            
            <div class="podium-item third">
              <div class="podium-rank">🥉</div>
              <div class="podium-avatar">
                {{ getInitials(entries[2].fullName) }}
              </div>
              <div class="podium-info">
                <h4 class="podium-name">{{ entries[2].fullName }}</h4>
                <div class="podium-amount">{{ entries[2].totalWon.toFixed(2) }} $</div>
              </div>
              <div class="podium-bar" style="height: 50%;"></div>
            </div>
          </div>
        </div>

        <!-- Leaderboard Table -->
        <div class="table-wrapper">
          <div class="table-responsive">
            <table class="leaderboard-table">
              <thead>
                <tr>
                  <th class="rank-col">رتبه</th>
                  <th class="player-col">بازیکن</th>
                  <th class="score-col">مجموع بردها</th>
                  <th class="trend-col">روند</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(entry, index) in entries" 
                  :key="entry.userId"
                  :class="[
                    'leaderboard-row',
                    `rank-${index + 1}`,
                    { 'top-three': index < 3 }
                  ]"
                >
                  <td class="rank-cell">
                    <div class="rank-display">
                      <div class="rank-number">{{ index + 1 }}</div>
                      <div v-if="index < 3" class="rank-medal">
                        {{ index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉' }}
                      </div>
                    </div>
                  </td>
                  <td class="player-cell">
                    <div class="player-info">
                      <div class="player-avatar">
                        {{ getInitials(entry.fullName) }}
                      </div>
                      <div class="player-details">
                        <h4 class="player-name">{{ entry.fullName }}</h4>
                        <p class="player-contact">{{ entry.phone }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="score-cell">
                    <div class="score-display">
                      <div class="score-amount">{{ entry.totalWon.toFixed(2) }} $</div>
                      <div class="score-progress">
                        <div 
                          class="progress-bar" 
                          :style="{ width: calculateProgress(entry.totalWon) + '%' }"
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td class="trend-cell">
                    <div class="trend-indicator" :class="getTrendClass(index)">
                      <svg v-if="getTrendClass(index) === 'up'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" clip-rule="evenodd" />
                      </svg>
                      <svg v-else-if="getTrendClass(index) === 'down'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd" />
                      </svg>
                      <span v-else class="trend-text">–</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Table Footer -->
        <div class="table-footer">
          <div class="footer-info">
            نمایش {{ entries.length }} نفر برتر
            <span v-if="limit < totalParticipants" class="more-info">
              (از {{ totalParticipants }} شرکت‌کننده کل)
            </span>
          </div>
          <div class="footer-stats">
            <div class="stat-item">
              <span class="stat-label">میانگین برد:</span>
              <span class="stat-value">{{ avgWinnings.toFixed(2) }} $</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">بیشترین برد:</span>
              <span class="stat-value">{{ maxWinnings.toFixed(2) }} $</span>
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
            <h3 class="empty-title">هنوز داده‌ای برای نمایش نیست</h3>
            <p class="empty-description">اولین فردی باشید که در این جدول قرار می‌گیرد!</p>
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

const entries = ref([]);
const limit = ref(10);
const loading = ref(false);
const error = ref("");
const totalParticipants = ref(0);

// Computed properties
const totalWinnings = computed(() => {
  return entries.value.reduce((sum, entry) => sum + (entry.totalWon || 0), 0);
});

const avgWinnings = computed(() => {
  if (entries.value.length === 0) return 0;
  return totalWinnings.value / entries.value.length;
});

const maxWinnings = computed(() => {
  if (entries.value.length === 0) return 0;
  return Math.max(...entries.value.map(entry => entry.totalWon || 0));
});

function getInitials(name) {
  if (!name) return "??";
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function calculateProgress(totalWon) {
  if (maxWinnings.value === 0) return 0;
  return (totalWon / maxWinnings.value) * 100;
}

function getTrendClass(index) {
  // Simple trend calculation based on position
  if (index === 0) return 'up';
  if (index < 3) return 'stable';
  if (index < 10) return 'down';
  return 'stable';
}

async function loadLeaderboard() {
  loading.value = true;
  error.value = "";
  entries.value = [];

  try {
    const res = await fetch(`${API_BASE}/leaderboard/top?limit=${limit.value}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || res.statusText || `HTTP ${res.status}`);
    }

    const data = await res.json();
    entries.value = data;
    
    // Estimate total participants (for demo purposes)
    totalParticipants.value = data.length * 10; // This is just for demo
    
  } catch (e) {
    console.error(e);
    error.value = "خطا در دریافت رتبه‌بندی: " + (e.message || "");
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadLeaderboard();
});
</script>

<style scoped>
.leaderboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 3rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  font-family: 'Vazirmatn', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  direction: rtl;
}

/* Header Styles */
.leaderboard-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0 0 40px 40px;
  padding: 3rem 2rem 2rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
}

.leaderboard-header::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  transform: translate(30%, -30%);
}

.header-content {
  position: relative;
  z-index: 1;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
}

.main-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.title-icon {
  font-size: 2rem;
}

.title-text {
  background: linear-gradient(90deg, #fff, #e2e8f0, #fff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: textShine 3s ease-in-out infinite alternate;
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
  gap: 1.5rem;
  position: relative;
  z-index: 1;
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

/* Leaderboard Section */
.leaderboard-section {
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

.section-filters {
  display: flex;
  gap: 1rem;
}

.filter-badge {
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

/* Podium Section */
.podium-section {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.podium-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 1rem;
  height: 250px;
  position: relative;
}

.podium-item {
  flex: 1;
  max-width: 200px;
  text-align: center;
  position: relative;
}

.podium-item.first {
  order: 2;
}

.podium-item.second {
  order: 1;
}

.podium-item.third {
  order: 3;
}

.podium-rank {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.podium-avatar {
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.5rem;
}

.podium-item.first .podium-avatar {
  width: 80px;
  height: 80px;
  font-size: 2rem;
}

.podium-info {
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
}

.podium-name {
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.podium-amount {
  font-size: 1.2rem;
  font-weight: 700;
  color: #48bb78;
}

.podium-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 12px 12px 0 0;
  z-index: 1;
}

.podium-item.first .podium-bar {
  background: linear-gradient(135deg, #FFD700 0%, #FFC300 100%);
}

.podium-item.second .podium-bar {
  background: linear-gradient(135deg, #C0C0C0 0%, #A0A0A0 100%);
}

.podium-item.third .podium-bar {
  background: linear-gradient(135deg, #CD7F32 0%, #B06A28 100%);
}

/* Table Wrapper */
.leaderboard-table-container {
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.table-wrapper {
  padding: 2rem;
}

.table-responsive {
  overflow-x: auto;
}

.leaderboard-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 800px;
}

.leaderboard-table thead {
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
}

.leaderboard-table th {
  padding: 1.25rem 1rem;
  font-weight: 600;
  color: #4a5568;
  text-align: right;
  border-bottom: 2px solid #e2e8f0;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.leaderboard-table tbody tr {
  transition: all 0.3s ease;
  border-bottom: 1px solid #f1f5f9;
}

.leaderboard-table tbody tr:hover {
  background-color: #f8fafc;
  transform: translateX(-8px);
}

.leaderboard-row.top-three {
  background: linear-gradient(90deg, rgba(102, 126, 234, 0.05) 0%, transparent 100%);
}

/* Rank Cell */
.rank-col {
  width: 80px;
}

.rank-cell {
  padding: 1rem;
}

.rank-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.rank-number {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2d3748;
}

.rank-medal {
  font-size: 1.5rem;
}

/* Player Cell */
.player-col {
  min-width: 250px;
}

.player-cell {
  padding: 1rem;
}

.player-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.player-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
}

.player-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.player-name {
  font-weight: 600;
  color: #2d3748;
  margin: 0;
  font-size: 1rem;
}

.player-contact {
  font-size: 0.85rem;
  color: #718096;
  margin: 0;
}

/* Score Cell */
.score-col {
  min-width: 200px;
}

.score-cell {
  padding: 1rem;
}

.score-display {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.score-amount {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2dce89;
}

.score-progress {
  width: 100%;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
}

/* Trend Cell */
.trend-col {
  width: 100px;
}

.trend-cell {
  padding: 1rem;
  text-align: center;
}

.trend-indicator {
  width: 36px;
  height: 36px;
  margin: 0 auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.trend-indicator.up {
  background: rgba(72, 187, 120, 0.1);
  color: #48bb78;
}

.trend-indicator.down {
  background: rgba(245, 101, 101, 0.1);
  color: #f56565;
}

.trend-indicator.stable {
  background: rgba(160, 174, 192, 0.1);
  color: #a0aec0;
}

.trend-indicator svg {
  width: 16px;
  height: 16px;
}

.trend-text {
  font-weight: 600;
  font-size: 0.9rem;
}

/* Table Footer */
.table-footer {
  padding: 1.5rem 2rem;
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
@media (max-width: 768px) {
  .leaderboard-container {
    padding: 0 0.5rem 2rem;
  }
  
  .leaderboard-header {
    padding: 2rem 1rem 1.5rem;
    border-radius: 0 0 30px 30px;
  }
  
  .main-title {
    font-size: 2rem;
    flex-direction: column;
    gap: 0.5rem;
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
  
  .podium-container {
    flex-direction: column;
    height: auto;
    align-items: center;
  }
  
  .podium-item {
    width: 100%;
    max-width: 300px;
    margin-bottom: 1rem;
  }
  
  .section-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .table-wrapper {
    padding: 1rem;
  }
  
  .table-footer {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }
  
  .footer-stats {
    justify-content: center;
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
  
  .score-amount {
    font-size: 1.1rem;
  }
}
</style>