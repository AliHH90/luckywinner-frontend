<!-- src/views/LeaderboardView.vue -->
<template>
  <div class="page-container">
    <h1 class="page-title">رتبه‌بندی برندگان</h1>

    <div class="controls">
      <label>
        تعداد نفرات:
        <input type="number" v-model.number="limit" min="1" max="100" />
      </label>
      <button @click="loadLeaderboard" :disabled="loading">بروزرسانی</button>
    </div>

    <p v-if="loading" class="status">در حال بارگذاری...</p>
    <p v-if="error" class="status status-error">{{ error }}</p>

    <table v-if="!loading && !error && entries.length" class="lw-table">
      <thead>
        <tr>
          <th>#</th>
          <th>نام</th>
          <th>شماره تماس</th>
          <th>مجموع برد (totalWon)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(e, index) in entries" :key="e.userId">
          <td>{{ index + 1 }}</td>
          <td>{{ e.fullName }}</td>
          <td>{{ e.phone }}</td>
          <td>{{ e.totalWon }}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="!loading && !error && !entries.length">
      هنوز داده‌ای برای نمایش نیست.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../store/authStore";

const authStore = useAuthStore();

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:31000/api";

const entries = ref([]);
const limit = ref(10);
const loading = ref(false);
const error = ref("");

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

    entries.value = await res.json();
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
.controls {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
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
}
.controls input {
  padding: 0.5rem 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  width: 80px;
  text-align: center;
}
.controls button {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}
.controls button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
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
.lw-table {
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
.lw-table th,
.lw-table td {
  border: none;
  padding: 1rem 0.75rem;
  text-align: center;
  border-bottom: 1px solid #f1f5f9;
}
.lw-table th {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.lw-table tbody tr {
  transition: all 0.3s ease;
}
.lw-table tbody tr:hover {
  background: #f8fafc;
  transform: translateX(4px);
}
.lw-table tbody tr:first-child {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05));
}
.lw-table tbody tr:nth-child(2) {
  background: linear-gradient(135deg, rgba(192, 192, 192, 0.1), rgba(192, 192, 192, 0.05));
}
.lw-table tbody tr:nth-child(3) {
  background: linear-gradient(135deg, rgba(205, 127, 50, 0.1), rgba(205, 127, 50, 0.05));
}
</style>
