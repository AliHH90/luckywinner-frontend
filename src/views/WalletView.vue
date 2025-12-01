<!-- src/views/WalletView.vue -->
<template>
  <div class="page-container">
    <h1 class="page-title">کیف پول من</h1>

    <div v-if="loading" class="status">در حال بارگذاری...</div>
    <div v-if="error" class="status status-error">{{ error }}</div>

    <div v-if="!loading && !error">
      <!-- خلاصه کیف پول -->
      <div class="wallet-summary">
        <div class="card">
          <h2>موجودی فعلی</h2>
          <p class="amount">{{ walletInfo.balance.toFixed(2) }} $</p>
        </div>
        <div class="card">
          <h2>مجموع بردها</h2>
          <p class="amount">{{ walletInfo.totalWon.toFixed(2) }} $</p>
        </div>
      </div>

      <!-- تراکنش‌ها -->
      <div class="transactions">
        <h2>تاریخچه تراکنش‌ها</h2>

        <p v-if="transactions.length === 0">
          هنوز هیچ تراکنشی ثبت نشده است.
        </p>

        <table v-else class="tx-table">
          <thead>
            <tr>
              <th>تاریخ</th>
              <th>توضیح</th>
              <th>نوع</th>
              <th>مبلغ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tx, index) in transactions" :key="index">
              <td>{{ formatDate(tx.createdAt) }}</td>
              <td>{{ tx.description }}</td>
              <td>{{ tx.type }}</td>
              <td :class="tx.amount >= 0 ? 'amount-plus' : 'amount-minus'">
                {{ tx.amount.toFixed(2) }} $
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../store/authStore";

const authStore = useAuthStore();

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:31000/api";

const loading = ref(false);
const error = ref("");
const walletInfo = ref({
  balance: 0,
  totalWon: 0,
});
const transactions = ref([]);

function formatDate(value) {
  if (!value) return "";
  // اگر backend رشته ISO بدهد، این کار می‌کند
  const d = new Date(value);
  return d.toLocaleString("fa-IR");
}

async function loadWallet() {
  loading.value = true;
  error.value = "";

  try {
    // 1) خلاصه کیف پول
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

    // 2) لیست تراکنش‌ها
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
.page-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}
.page-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
.status {
  margin-top: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-weight: 500;
  text-align: center;
  backdrop-filter: blur(10px);
}
.status-error {
  color: #ff6b6b;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.2);
}
.wallet-summary {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
  justify-content: center;
}
.card {
  flex: 1 1 300px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
}
.card h2 {
  margin-bottom: 1rem;
  color: #4a5568;
  font-size: 1.3rem;
}
.amount {
  font-size: 2.5rem;
  font-weight: 800;
  color: #667eea;
  margin: 0;
}
.transactions h2 {
  margin-bottom: 1.5rem;
  color: white;
  font-size: 1.8rem;
  text-align: center;
}
.tx-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 1.5rem;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.tx-table th,
.tx-table td {
  border: none;
  padding: 1rem 0.75rem;
  text-align: center;
  border-bottom: 1px solid #f1f5f9;
}
.tx-table th {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.tx-table tbody tr {
  transition: all 0.3s ease;
}
.tx-table tbody tr:hover {
  background: #f8fafc;
  transform: translateX(4px);
}
.amount-plus {
  color: #059669;
  font-weight: 700;
  background: rgba(5, 150, 105, 0.1);
  border-radius: 6px;
  padding: 0.25rem 0.5rem;
}
.amount-minus {
  color: #dc2626;
  font-weight: 700;
  background: rgba(220, 38, 38, 0.1);
  border-radius: 6px;
  padding: 0.25rem 0.5rem;
}
</style>
