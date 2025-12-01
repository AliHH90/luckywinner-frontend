<!-- src/views/WinnersView.vue -->
<template>
  <div class="page-container">
    <h1 class="page-title">آخرین برندگان</h1>

    <div class="controls">
      <label>
        تعداد ردیف:
        <input type="number" v-model.number="limit" min="1" max="100" />
      </label>
      <button @click="loadWinners" :disabled="loading">بروزرسانی</button>
    </div>

    <div v-if="loading" class="status">در حال بارگذاری...</div>
    <div v-if="error" class="status status-error">{{ error }}</div>

    <table v-if="!loading && !error && winners.length" class="winners-table">
      <thead>
        <tr>
          <th>#</th>
          <th>نام</th>
          <th>شماره تماس</th>
          <th>عنوان مسابقه</th>
          <th>مبلغ جایزه</th>
          <th>زمان برنده شدن</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(w, index) in winners" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ w.fullName }}</td>
          <td>{{ w.phone }}</td>
          <td>{{ w.competitionTitle }}</td>
          <td>{{ w.prize }}</td>
          <td>{{ formatDateTime(w.enterTime) }}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="!loading && !error && !winners.length">
      هنوز برنده‌ای ثبت نشده است.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../store/authStore";

const authStore = useAuthStore();

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:31000/api";

const winners = ref([]);
const limit = ref(10);
const loading = ref(false);
const error = ref("");

function formatDateTime(dt) {
  if (!dt) return "";
  try {
    return new Date(dt).toLocaleString("fa-IR");
  } catch {
    return dt;
  }
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

    winners.value = await res.json();
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
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.page-title {
  text-align: center;
  margin-bottom: 2.5rem;
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  position: relative;
}

.page-title::after {
  content: '🏆';
  margin-right: 1rem;
  font-size: 2rem;
}

.controls {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 1.5rem 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.controls label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  color: #4a5568;
  font-size: 1rem;
}

.controls input {
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  width: 100px;
  text-align: center;
  transition: all 0.3s ease;
  background: white;
}

.controls input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

.controls button {
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: rgb(4, 6, 84);
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
  position: relative;
  overflow: hidden;
}

.controls button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(79, 172, 254, 0.4);
}

.controls button:disabled {
  background: linear-gradient(135deg, #a0aec0, #cbd5e0);
  cursor: not-allowed;
  transform: none;
}

.status {
  margin-top: 1.5rem;
  padding: 1.25rem 2rem;
  border-radius: 16px;
  font-weight: 600;
  text-align: center;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: slideInUp 0.5s ease-out;
  font-size: 1.1rem;
}

.status-error {
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(255, 168, 168, 0.1));
  color: #e53e3e;
  border-left: 4px solid #e53e3e;
}

.winners-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 2rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: fadeIn 0.6s ease-out;
}

.winners-table thead {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.winners-table th {
  padding: 1.25rem 1rem;
  text-align: center;
  font-weight: 700;
  font-size: 1rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: relative;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
}

.winners-table tbody tr {
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.winners-table tbody tr:hover {
  background: rgba(102, 126, 234, 0.05);
  transform: translateX(8px);
}

.winners-table tbody tr:last-child {
  border-bottom: none;
}

.winners-table td {
  padding: 1.25rem 1rem;
  text-align: center;
  font-weight: 500;
  color: #4a5568;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.winners-table tbody tr:last-child td {
  border-bottom: none;
}

.winners-table tbody tr:nth-child(1) {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05));
  border-left: 4px solid #FFD700;
}

.winners-table tbody tr:nth-child(2) {
  background: linear-gradient(135deg, rgba(192, 192, 192, 0.1), rgba(192, 192, 192, 0.05));
  border-left: 4px solid #C0C0C0;
}

.winners-table tbody tr:nth-child(3) {
  background: linear-gradient(135deg, rgba(205, 127, 50, 0.1), rgba(205, 127, 50, 0.05));
  border-left: 4px solid #CD7F32;
}

.winners-table tbody tr:first-child td:first-child::before {
  content: '🥇';
  margin-left: 0.5rem;
}

.winners-table tbody tr:nth-child(2) td:first-child::before {
  content: '🥈';
  margin-left: 0.5rem;
}

.winners-table tbody tr:nth-child(3) td:first-child::before {
  content: '🥉';
  margin-left: 0.5rem;
}

.winners-table td:nth-child(5) {
  font-weight: 700;
  color: #38a169;
  background: rgba(72, 187, 120, 0.1);
  border-radius: 8px;
  margin: 0.25rem;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .page-container {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .controls {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .winners-table {
    display: block;
    overflow-x: auto;
  }
  
  .winners-table th,
  .winners-table td {
    padding: 0.75rem 0.5rem;
    font-size: 0.85rem;
  }
}
</style>
