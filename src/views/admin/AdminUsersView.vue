<!-- src/views/admin/AdminUsersView.vue -->
<template>
  <div class="admin-page">
    <h1 class="title">مدیریت کاربران</h1>

    <div class="toolbar">
      <label>
        <input type="checkbox" v-model="onlyReadyForPayout" @change="loadUsers" />
        فقط کاربرانی که بالانس‌شان ≥ 100 $ است
      </label>

      <button @click="loadUsers" :disabled="loading">
        بروزرسانی لیست
      </button>
    </div>

    <div v-if="loading" class="status">در حال بارگذاری...</div>
    <div v-if="error" class="status status-error">{{ error }}</div>

    <table v-if="!loading && !error" class="users-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>شماره تماس</th>
          <th>نام کامل</th>
          <th>نقش</th>
          <th>موجودی</th>
          <th>کل بردها</th>
          <th>وضعیت</th>
          <th>تاریخ ثبت‌نام</th>
          <th>آخرین فعالیت</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.fullName }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.balance.toFixed(2) }} $</td>
          <td>{{ user.totalWon.toFixed(2) }} $</td>
          <td>{{ user.status || "-" }}</td>
          <td>{{ formatDate(user.createdAt) }}</td>
          <td>{{ formatDate(user.lastActiveAt) }}</td>
        </tr>
        <tr v-if="users.length === 0">
          <td colspan="9">هیچ کاربری یافت نشد.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../../store/authStore";

const authStore = useAuthStore();
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:31000/api";

const loading = ref(false);
const error = ref("");
const users = ref([]);
const onlyReadyForPayout = ref(false);

function formatDate(val) {
  if (!val) return "-";
  const d = new Date(val);
  return d.toLocaleString("fa-IR");
}

async function loadUsers() {
  loading.value = true;
  error.value = "";
  users.value = [];

  try {
    let url = `${API_BASE}/admin/users`;
    if (onlyReadyForPayout.value) {
      url += "?readyForPayout=true";
    }

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || res.statusText || `HTTP ${res.status}`);
    }

    users.value = await res.json();
  } catch (e) {
    console.error(e);
    error.value = "خطا در دریافت لیست کاربران: " + (e.message || "");
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadUsers();
});
</script>

<style scoped>
.admin-page {
  max-width: 1300px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.title {
  text-align: center;
  margin-bottom: 2.5rem;
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1.5rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 1.5rem 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.toolbar label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  color: #4a5568;
  cursor: pointer;
}

.toolbar input[type="checkbox"] {
  transform: scale(1.2);
  accent-color: #667eea;
}

.toolbar button {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.toolbar button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.toolbar button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
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
  color: #dc2626;
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.2);
}

.users-table {
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

.users-table th,
.users-table td {
  border: none;
  padding: 1rem 0.75rem;
  text-align: center;
  font-size: 0.9rem;
  border-bottom: 1px solid #f1f5f9;
}

.users-table th {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.users-table tbody tr {
  transition: all 0.3s ease;
}

.users-table tbody tr:hover {
  background: #f8fafc;
  transform: translateX(4px);
}

.users-table tbody tr:last-child td {
  border-bottom: none;
}

@media (max-width: 768px) {
  .admin-page {
    padding: 1rem;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .toolbar {
    flex-direction: column;
    align-items: stretch;
    padding: 1.5rem;
  }
  
  .users-table {
    display: block;
    overflow-x: auto;
  }
  
  .users-table th,
  .users-table td {
    padding: 0.75rem 0.5rem;
    font-size: 0.8rem;
  }
}
</style>
