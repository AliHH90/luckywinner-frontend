<template>
  <div class="wallet-container">
    <!-- Header with Animated Background -->
    <header class="wallet-header">
      <div class="header-bg">
        <div class="bg-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
      </div>
      
      <div class="header-content">
        <div class="header-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H15a.75.75 0 00-.75.75 2.25 2.25 0 01-4.5 0A.75.75 0 009 9H5.25z" />
          </svg>
        </div>
        <h1 class="main-title">کیف پول من</h1>
        <p class="header-subtitle">مدیریت موجودی و مشاهده تراکنش‌های مالی</p>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p class="loading-text">در حال بارگذاری اطلاعات کیف پول...</p>
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
        <button @click="loadWallet" class="btn btn-secondary">تلاش مجدد</button>
      </div>
    </div>

    <!-- Wallet Content -->
    <div v-if="!loading && !error" class="wallet-content">
      <!-- Wallet Summary Cards -->
      <section class="summary-section">
        <div class="summary-grid">
          <div class="summary-card balance-card">
            <div class="card-header">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="card-icon">
                <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
                <path fill-rule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75zm5.25-.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clip-rule="evenodd" />
              </svg>
              <div class="card-title">موجودی فعلی</div>
            </div>
            <div class="card-body">
              <div class="amount-value">{{ walletInfo.balance.toFixed(2) }}</div>
              <div class="amount-unit">دلار</div>
            </div>
            <div class="card-footer">
              <div class="footer-text">قابل برداشت</div>
            </div>
          </div>

          <div class="summary-card earnings-card">
            <div class="card-header">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="card-icon">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
              </svg>
              <div class="card-title">کل بردها</div>
            </div>
            <div class="card-body">
              <div class="amount-value">{{ walletInfo.totalWon.toFixed(2) }}</div>
              <div class="amount-unit">دلار</div>
            </div>
            <div class="card-footer">
              <div class="footer-text">جمع کل جوایز</div>
            </div>
          </div>

          <div class="summary-card stats-card">
            <div class="card-header">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="card-icon">
                <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
              </svg>
              <div class="card-title">آمار مالی</div>
            </div>
            <div class="card-body">
              <div class="stats-grid">
                <div class="stat-item">
                  <div class="stat-label">تراکنش‌ها</div>
                  <div class="stat-value">{{ transactions.length }}</div>
                </div>
                <div class="stat-item">
                  <div class="stat-label">موفق</div>
                  <div class="stat-value">{{ successfulTransactions }}</div>
                </div>
                <div class="stat-item">
                  <div class="stat-label">میانگین</div>
                  <div class="stat-value">{{ avgTransaction.toFixed(2) }} $</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Transactions History -->
      <section class="transactions-section">
        <div class="section-header">
          <h2 class="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="section-icon">
              <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clip-rule="evenodd" />
              <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zm9.586 4.594a.75.75 0 00-1.172-.938l-2.476 3.096-.634-.682a.75.75 0 00-1.06 1.06l1.25 1.25a.75.75 0 001.116-.062l3-3.75z" clip-rule="evenodd" />
            </svg>
            تاریخچه تراکنش‌ها
            <span class="count-badge">{{ transactions.length }} تراکنش</span>
          </h2>
          
          <div class="section-filters">
            <div class="filter-badge">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="filter-icon">
                <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clip-rule="evenodd" />
              </svg>
              تراکنش‌های اخیر
            </div>
          </div>
        </div>

        <!-- Transactions Table -->
        <div class="transactions-table-container">
          <div v-if="transactions.length === 0" class="empty-transactions">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="empty-icon">
              <path fill-rule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clip-rule="evenodd" />
              <path fill-rule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clip-rule="evenodd" />
            </svg>
            <div class="empty-text">
              <h3>هنوز تراکنشی ثبت نشده است</h3>
              <p>با شرکت در مسابقات و برنده شدن، اولین تراکنش خود را ایجاد کنید!</p>
            </div>
          </div>

          <div v-else class="table-responsive">
            <table class="transactions-table">
              <thead>
                <tr>
                  <th class="date-col">تاریخ</th>
                  <th class="description-col">شرح تراکنش</th>
                  <th class="type-col">نوع</th>
                  <th class="amount-col">مبلغ</th>
                  <th class="status-col">وضعیت</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(tx, index) in transactions" 
                  :key="index"
                  :class="['transaction-row', getTransactionClass(tx)]"
                >
                  <td class="date-cell">
                    <div class="date-info">
                      <div class="date-text">{{ formatDate(tx.createdAt) }}</div>
                      <div class="time-text">{{ formatTime(tx.createdAt) }}</div>
                    </div>
                  </td>
                  <td class="description-cell">
                    <div class="description-content">
                      <h4 class="description-title">{{ tx.description }}</h4>
                      <p v-if="tx.metadata" class="description-meta">{{ tx.metadata }}</p>
                    </div>
                  </td>
                  <td class="type-cell">
                    <span :class="['type-badge', tx.type.toLowerCase()]">
                      {{ tx.type === 'CREDIT' ? 'واریز' : 'برداشت' }}
                    </span>
                  </td>
                  <td class="amount-cell">
                    <div :class="['amount-display', tx.amount >= 0 ? 'positive' : 'negative']">
                      <span class="amount-sign">{{ tx.amount >= 0 ? '+' : '-' }}</span>
                      <span class="amount-value">{{ Math.abs(tx.amount).toFixed(2) }}</span>
                      <span class="amount-unit">$</span>
                    </div>
                  </td>
                  <td class="status-cell">
                    <span class="status-badge success">موفق</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Table Footer -->
          <div class="table-footer">
            <div class="footer-info">
              نمایش {{ transactions.length }} تراکنش اخیر
            </div>
            <div class="footer-stats">
              <div class="stat-item">
                <span class="stat-label">مجموع واریزی:</span>
                <span class="stat-value">{{ totalCredits.toFixed(2) }} $</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">مجموع برداشت:</span>
                <span class="stat-value">{{ totalDebits.toFixed(2) }} $</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Action Buttons -->
      <section class="actions-section">
        <div class="actions-grid">
          <button class="action-btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="btn-icon">
              <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
            </svg>
            <span class="btn-text">درخواست برداشت</span>
          </button>
          
          <button class="action-btn btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="btn-icon">
              <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clip-rule="evenodd" />
            </svg>
            <span class="btn-text">گزارش مالی</span>
          </button>
          
          <button class="action-btn btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="btn-icon">
              <path fill-rule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
            </svg>
            <span class="btn-text">خروجی Excel</span>
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "../store/authStore";

const authStore = useAuthStore();
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:31000/api";

const loading = ref(false);
const error = ref("");
const walletInfo = ref({
  balance: 0,
  totalWon: 0,
});
const transactions = ref([]);

// Computed properties
const successfulTransactions = computed(() => {
  return transactions.value.filter(tx => tx.status === 'SUCCESS' || !tx.status).length;
});

const avgTransaction = computed(() => {
  if (transactions.value.length === 0) return 0;
  const sum = transactions.value.reduce((total, tx) => total + Math.abs(tx.amount), 0);
  return sum / transactions.value.length;
});

const totalCredits = computed(() => {
  return transactions.value
    .filter(tx => tx.amount > 0)
    .reduce((total, tx) => total + tx.amount, 0);
});

const totalDebits = computed(() => {
  return transactions.value
    .filter(tx => tx.amount < 0)
    .reduce((total, tx) => total + Math.abs(tx.amount), 0);
});

function getTransactionClass(tx) {
  if (tx.amount > 0) return 'credit';
  if (tx.amount < 0) return 'debit';
  return 'neutral';
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
      minute: '2-digit'
    }).format(date);
  } catch {
    return "-";
  }
}

async function loadWallet() {
  loading.value = true;
  error.value = "";

  try {
    // Load wallet summary
    const infoRes = await fetch(`${API_BASE}/wallet/me`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (!infoRes.ok) {
      const txt = await infoRes.text();
      throw new Error(txt || infoRes.statusText || `HTTP ${infoRes.status}`);
    }

    walletInfo.value = await infoRes.json();

    // Load transactions
    const txRes = await fetch(`${API_BASE}/wallet/transactions`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (!txRes.ok) {
      const txt = await txRes.text();
      throw new Error(txt || txRes.statusText || `HTTP ${txRes.status}`);
    }

    transactions.value = await txRes.json();
  } catch (e) {
    console.error(e);
    error.value = "خطا در دریافت اطلاعات کیف پول: " + (e.message || "");
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadWallet();
});
</script>

<style scoped>
.wallet-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 3rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  font-family: 'Vazirmatn', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  direction: rtl;
}

/* Header Styles */
.wallet-header {
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

.bg-shapes {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
}

.shape-1 {
  width: 300px;
  height: 300px;
  background: white;
  top: -150px;
  left: -150px;
}

.shape-2 {
  width: 200px;
  height: 200px;
  background: white;
  bottom: -100px;
  right: -100px;
}

.shape-3 {
  width: 150px;
  height: 150px;
  background: white;
  top: 50%;
  left: 10%;
}

.header-content {
  position: relative;
  z-index: 1;
  color: white;
  text-align: center;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.header-icon svg {
  width: 40px;
  height: 40px;
}

.main-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.header-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-top: 0.5rem;
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

/* Button Styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
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
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Summary Section */
.summary-section {
  margin-bottom: 2rem;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.summary-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.summary-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
}

.balance-card {
  border-top: 4px solid #667eea;
}

.earnings-card {
  border-top: 4px solid #48bb78;
}

.stats-card {
  border-top: 4px solid #ed8936;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.card-icon {
  width: 40px;
  height: 40px;
  color: currentColor;
}

.balance-card .card-icon {
  color: #667eea;
}

.earnings-card .card-icon {
  color: #48bb78;
}

.stats-card .card-icon {
  color: #ed8936;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #4a5568;
}

.card-body {
  margin-bottom: 1.5rem;
}

.amount-value {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1;
  color: #2d3748;
}

.amount-unit {
  font-size: 1rem;
  color: #718096;
  margin-top: 0.5rem;
}

.card-footer {
  border-top: 1px solid #e2e8f0;
  padding-top: 1rem;
}

.footer-text {
  font-size: 0.9rem;
  color: #a0aec0;
  font-weight: 500;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat-item {
  text-align: center;
}

.stat-label {
  font-size: 0.85rem;
  color: #718096;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2d3748;
}

/* Transactions Section */
.transactions-section {
  margin-bottom: 2rem;
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

/* Transactions Table */
.transactions-table-container {
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.empty-transactions {
  padding: 4rem 2rem;
  text-align: center;
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

.table-responsive {
  overflow-x: auto;
}

.transactions-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 800px;
}

.transactions-table thead {
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
}

.transactions-table th {
  padding: 1.25rem 1rem;
  font-weight: 600;
  color: #4a5568;
  text-align: right;
  border-bottom: 2px solid #e2e8f0;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.transactions-table tbody tr {
  transition: all 0.3s ease;
}
.transactions-table tbody tr:hover {
  background: #f7fafc;
}
.transaction-row.credit {
  background: #e6fffa;
}
.transaction-row.debit {
  background: #fff5f5;
}
.transaction-row.neutral {
  background: #f0f4f8;
}
.transaction-row td {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: middle;
}
.date-cell .date-info {
  text-align: right;
}
.date-text {
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
}
.time-text {
  font-size: 0.85rem;
  color: #718096;
}
.description-cell .description-content {
  text-align: right;
}

.description-title {
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.25rem;
}
.description-meta {
  font-size: 0.9rem;
  color: #718096;
}
.type-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
}
.type-badge.credit {
  background: #c6f6d5;
  color: #2f855a;
}
.type-badge.debit {
  background: #fed7d7;
  color: #c53030;
}
.amount-display {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 700;
}
.amount-display.positive {
  color: #2f855a;
}
.amount-display.negative {
  color: #c53030;
}
.amount-sign {
  font-size: 1.2rem;
}
.amount-value {
  font-size: 1.5rem;
}
.amount-unit {
  font-size: 1rem;
}
.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
}
.status-badge.success {
  background: #c6f6d5;
  color: #2f855a;
}
.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #f7fafc;
  border-top: 1px solid #e2e8f0;
  flex-wrap: wrap;
  gap: 1rem;
}
.footer-info {
  font-size: 0.9rem;
  color: #4a5568;
}
.footer-stats {
  display: flex;
  gap: 2rem;
}
.stat-item {
  font-size: 0.9rem;
  color: #4a5568;
}
.stat-label {
  font-weight: 600;
  margin-right: 0.5rem;
}
.actions-section {
  margin-top: 2rem;
}
.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}
.action-btn {
  width: 100%;
  justify-content: center;
}
.action-btn .btn-icon {
  width: 20px;
  height: 20px;
}

</style>
