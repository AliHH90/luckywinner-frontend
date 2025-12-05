<!-- src/views/admin/AdminUsersView.vue -->
<template>
  <div class="admin-container">
    <!-- Header -->
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">
          <span class="title-icon">👥</span>
          مدیریت کاربران
        </h1>
        <p class="page-subtitle">مدیریت، مشاهده و فیلتر کردن کاربران سیستم</p>
      </div>
      
      <div class="header-stats">
        <div class="stat-item">
          <div class="stat-value">{{ users.length }}</div>
          <div class="stat-label">کاربر کل</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ activeUsersCount }}</div>
          <div class="stat-label">فعال</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ readyForPayoutCount }}</div>
          <div class="stat-label">آماده پرداخت</div>
        </div>
      </div>
    </header>

    <!-- Filters & Controls -->
    <div class="filters-section">
      <div class="filters-grid">
        <div class="filter-card">
          <div class="filter-header">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="filter-icon">
              <path fill-rule="evenodd" d="M3.792 2.938A49.069 49.069 0 0112 2.25c2.797 0 5.54.236 8.208.688.339.055.67.14.987.255.177.063.345.14.504.232.244.113.465.255.66.418.314.217.59.483.815.784l.002.003.002.002.001.002a2.25 2.25 0 01-.45 2.871c-.658.727-1.458 1.308-2.35 1.706-.206.092-.423.173-.647.241a13.725 13.725 0 01-1.622.435 49.078 49.078 0 01-6.165.385c-2.078-.01-4.116-.204-6.094-.485a13.716 13.716 0 01-1.625-.435 8.254 8.254 0 01-.646-.241c-.893-.398-1.692-.98-2.35-1.706a2.25 2.25 0 01-.45-2.871l.001-.002.002-.002.003-.003a5.022 5.022 0 01.66-.418c.16-.092.327-.17.504-.232.317-.114.648-.2.987-.255z" clip-rule="evenodd" />
            </svg>
            <h3>فیلترها</h3>
          </div>
          
          <div class="filter-controls">
            <div class="filter-group">
              <label class="checkbox-label">
                <input 
                  type="checkbox" 
                  v-model="onlyReadyForPayout" 
                  @change="loadUsers"
                  class="checkbox-input"
                />
                <span class="checkbox-custom"></span>
                <span class="checkbox-text">
                  کاربران آماده پرداخت (موجودی ≥ 100$)
                  <span class="checkbox-hint">{{ readyForPayoutCount }} کاربر</span>
                </span>
              </label>
            </div>
            
            <div class="filter-group">
              <div class="search-box">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="search-icon">
                  <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clip-rule="evenodd" />
                </svg>
                <input 
                  type="text" 
                  v-model="searchQuery"
                  placeholder="جستجو بر اساس نام، شماره یا آی‌دی..."
                  class="search-input"
                  @input="filterUsers"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div class="actions-card">
          <div class="actions-header">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="actions-icon">
              <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clip-rule="evenodd" />
            </svg>
            <h3>عملیات</h3>
          </div>
          
          <div class="action-buttons">
            <button 
              @click="loadUsers" 
              :disabled="loading"
              class="btn btn-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="btn-icon">
                <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clip-rule="evenodd" />
              </svg>
              بروزرسانی لیست
            </button>
            
            <button 
              @click="exportToCSV"
              :disabled="loading || filteredUsers.length === 0"
              class="btn btn-secondary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="btn-icon">
                <path fill-rule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 01-.75-.75V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
              </svg>
              خروجی Excel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Status Messages -->
    <div class="status-container">
      <div v-if="loading" class="status-message loading">
        <div class="spinner"></div>
        <span>در حال دریافت اطلاعات کاربران...</span>
      </div>
      
      <div v-if="error" class="status-message error">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="status-icon">
          <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
        </svg>
        <span>{{ error }}</span>
      </div>
    </div>

    <!-- Users Table -->
    <div class="table-container" v-if="!loading && !error">
      <div class="table-responsive">
        <table class="users-table">
          <thead>
            <tr>
              <th class="text-center">#</th>
              <th>کاربر</th>
              <th class="text-center">نقش</th>
              <th class="text-center">موجودی</th>
              <th class="text-center">کل بردها</th>
              <th class="text-center">وضعیت</th>
              <th class="text-center">تاریخ ثبت‌نام</th>
              <th class="text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in filteredUsers" :key="user.id">
              <td class="text-center user-id">{{ user.id }}</td>
              <td class="user-info">
                <div class="user-avatar">
                  {{ user.fullName.charAt(0) }}
                </div>
                <div class="user-details">
                  <div class="user-name">{{ user.fullName }}</div>
                  <div class="user-contact">{{ user.phone }}</div>
                </div>
              </td>
              <td class="text-center">
                <span :class="['role-badge', user.role === 'ADMIN' ? 'admin' : 'user']">
                  {{ user.role === 'ADMIN' ? 'ادمین' : 'کاربر' }}
                </span>
              </td>
              <td class="text-center">
                <div class="balance-cell">
                  <div class="balance-amount">{{ user.balance.toFixed(2) }} $</div>
                  <div v-if="user.balance >= 100" class="payout-badge">
                    آماده پرداخت
                  </div>
                </div>
              </td>
              <td class="text-center earnings-cell">
                {{ user.totalWon.toFixed(2) }} $
              </td>
              <td class="text-center">
                <span
                  :class="[
                    'status-badge',
                    user.blocked ? 'suspended' : getStatusClass(user.status)
                  ]"
                >
                  {{ user.blocked ? 'بلاک شده' : (user.status || 'فعال') }}
                </span>
              </td>
              <td class="text-center date-cell">
                {{ formatDate(user.createdAt) }}
              </td>
              <td class="text-center actions-cell">
                <button class="action-btn view-btn" title="مشاهده جزئیات">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                    <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clip-rule="evenodd" />
                  </svg>
                </button>

                <button class="action-btn edit-btn" title="ویرایش کاربر">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                  </svg>
                </button>

                <button
                  class="action-btn block-btn"
                  :title="user.blocked ? 'آزاد کردن کاربر' : 'بلاک کردن کاربر'"
                  @click="toggleBlock(user)"
                >
                  <svg v-if="!user.blocked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1.5a5.25 5.25 0 00-5.25 5.25V9A2.25 2.25 0 004.5 11.25v7.5A2.25 2.25 0 006.75 21h10.5A2.25 2.25 0 0019.5 18.75v-7.5A2.25 2.25 0 0017.25 9V6.75A5.25 5.25 0 0012 1.5zm-3.75 5.25a3.75 3.75 0 117.5 0V9h-7.5V6.75z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.5 10.5A2.25 2.25 0 016.75 8.25h10.5A2.25 2.25 0 0119.5 10.5v8.25A2.25 2.25 0 0117.25 21H6.75A2.25 2.25 0 014.5 18.75V10.5z" />
                    <path d="M8.25 8.25V6.75A3.75 3.75 0 0112 3a3.75 3.75 0 013.75 3.75V8.25H8.25z" />
                  </svg>
                </button>

                <button
                  class="action-btn delete-btn"
                  title="حذف کاربر"
                  @click="deleteUser(user)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M9.75 3A1.5 1.5 0 008.25 4.5H4.5a.75.75 0 000 1.5h.611l.86 12.04A2.25 2.25 0 008.215 20.25h7.57a2.25 2.25 0 002.244-2.21l.86-12.04h.611a.75.75 0 000-1.5h-3.75A1.5 1.5 0 0014.25 3h-4.5zM10.5 8.25a.75.75 0 00-1.5 0v7.5a.75.75 0 001.5 0v-7.5zm4.5 0a.75.75 0 00-1.5 0v7.5a.75.75 0 001.5 0v-7.5z" clip-rule="evenodd" />
                  </svg>
                </button>

                <button 
                  v-if="user.balance >= 100"
                  class="action-btn payout-btn"
                  title="پرداخت به کاربر"
                  @click="initiatePayout(user)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                    <path fill-rule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clip-rule="evenodd" />
                    <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
                  </svg>
                </button>
              </td>
            </tr>
            
            <tr v-if="filteredUsers.length === 0">
              <td colspan="8" class="empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="empty-icon">
                  <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                </svg>
                <div class="empty-text">
                  <h4>کاربری یافت نشد</h4>
                  <p v-if="searchQuery">
                    هیچ کاربری با عبارت "{{ searchQuery }}" یافت نشد.
                  </p>
                  <p v-else>
                    در حال حاضر هیچ کاربری در سیستم ثبت‌نام نکرده است.
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="table-footer">
        <div class="table-info">
          نمایش {{ filteredUsers.length }} از {{ users.length }} کاربر
          <span v-if="searchQuery" class="search-info">
            (نتایج جستجو برای "{{ searchQuery }}")
          </span>
        </div>
        <div class="table-summary">
          <div class="summary-item">
            <span class="summary-label">مجموع موجودی‌ها:</span>
            <span class="summary-value">{{ totalBalance.toFixed(2) }} $</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">مجموع بردها:</span>
            <span class="summary-value">{{ totalWon.toFixed(2) }} $</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "../../store/authStore";

const authStore = useAuthStore();
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:31000/api";

const loading = ref(false);
const error = ref("");
const users = ref([]);
const onlyReadyForPayout = ref(false);
const searchQuery = ref("");

// Computed properties
const activeUsersCount = computed(() => {
  return users.value.filter(user => user.status !== 'غیرفعال').length;
});

const readyForPayoutCount = computed(() => {
  return users.value.filter(user => user.balance >= 100).length;
});

const filteredUsers = computed(() => {
  let filtered = users.value;
  
  if (onlyReadyForPayout.value) {
    filtered = filtered.filter(user => user.balance >= 100);
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(user => 
      user.fullName?.toLowerCase().includes(query) ||
      user.phone?.includes(query) ||
      user.id?.toString().includes(query)
    );
  }
  
  return filtered;
});

const totalBalance = computed(() => {
  return filteredUsers.value.reduce((sum, user) => sum + user.balance, 0);
});

const totalWon = computed(() => {
  return filteredUsers.value.reduce((sum, user) => sum + user.totalWon, 0);
});

function getStatusClass(status) {
  const statusMap = {
    'فعال': 'active',
    'غیرفعال': 'inactive',
    'معلق': 'suspended',
    'تایید شده': 'verified'
  };
  return statusMap[status] || 'default';
}

function formatDate(val) {
  if (!val) return "-";
  const d = new Date(val);
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(d);
}

function filterUsers() {
  // Debounce search if needed
}

async function initiatePayout(user) {
  if (confirm(`آیا از پرداخت ${user.balance.toFixed(2)} $ به ${user.fullName} اطمینان دارید؟`)) {
    alert(`پرداخت به کاربر ${user.fullName} (فقط نمایشی) انجام شد.`);
  }
}

function exportToCSV() {
  const headers = [
    "ID",
    "نام",
    "شماره",
    "نقش",
    "موجودی",
    "بردها",
    "وضعیت",
    "بلاک؟",
    "تاریخ ثبت‌نام"
  ];
  const csvData = [
    headers.join(","),
    ...filteredUsers.value.map(user =>
      [
        user.id,
        `"${user.fullName}"`,
        user.phone,
        user.role,
        user.balance,
        user.totalWon,
        user.status || "فعال",
        user.blocked ? "بلاک" : "آزاد",
        formatDate(user.createdAt)
      ].join(",")
    )
  ].join("\n");
  
  const blob = new Blob(['\uFEFF' + csvData], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `users_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
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

async function toggleBlock(user) {
  const newBlocked = !user.blocked;

  if (
    !confirm(
      newBlocked
        ? `آیا از بلاک کردن کاربر ${user.fullName} مطمئن هستید؟`
        : `آیا از آزاد کردن کاربر ${user.fullName} مطمئن هستید؟`
    )
  ) {
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/admin/users/${user.id}/block`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authStore.token}`
      },
      body: JSON.stringify({ blocked: newBlocked })
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || res.statusText || `HTTP ${res.status}`);
    }

    user.blocked = newBlocked;
  } catch (e) {
    console.error(e);
    alert("خطا در تغییر وضعیت کاربر: " + (e.message || ""));
  }
}

async function deleteUser(user) {
  if (!confirm(`آیا از حذف کامل کاربر ${user.fullName} مطمئن هستید؟`)) {
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/admin/users/${user.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || res.statusText || `HTTP ${res.status}`);
    }

    users.value = users.value.filter(u => u.id !== user.id);
  } catch (e) {
    console.error(e);
    alert("خطا در حذف کاربر: " + (e.message || ""));
  }
}

onMounted(() => {
  loadUsers();
});
</script>

<style scoped>
.admin-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  font-family: 'Vazirmatn', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  direction: rtl;
}

/* Header Styles */
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  color: white;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.2);
  position: relative;
  overflow: hidden;
}

.page-header::before {
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
  text-align: center;
  margin-bottom: 2rem;
}

.page-title {
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

.page-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
}

.header-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  position: relative;
  z-index: 1;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

/* Filters Section */
.filters-section {
  margin-bottom: 2rem;
}

.filters-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

.filter-card,
.actions-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.filter-header,
.actions-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.filter-icon,
.actions-icon {
  width: 24px;
  height: 24px;
  color: #667eea;
}

.filter-header h3,
.actions-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
}

/* Filter Controls */
.filter-controls {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.checkbox-label:hover {
  background-color: #f7fafc;
}

.checkbox-input {
  display: none;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  border: 2px solid #cbd5e0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.checkbox-input:checked + .checkbox-custom {
  background-color: #667eea;
  border-color: #667eea;
}

.checkbox-input:checked + .checkbox-custom::after {
  content: '✓';
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
}

.checkbox-text {
  flex: 1;
  font-weight: 500;
  color: #4a5568;
}

.checkbox-hint {
  font-size: 0.85rem;
  color: #718096;
  margin-right: 0.5rem;
}

/* Search Box */
.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  right: 1rem;
  width: 20px;
  height: 20px;
  color: #a0aec0;
}

.search-input {
  width: 100%;
  padding: 0.875rem 3rem 0.875rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  background: #f8fafc;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  background: white;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.btn-secondary {
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(66, 153, 225, 0.3);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.btn-icon {
  width: 18px;
  height: 18px;
}

/* Status Messages */
.status-container {
  margin-bottom: 2rem;
}

.status-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
  font-weight: 500;
  text-align: center;
}

.status-message.loading {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.status-message.error {
  background: rgba(245, 101, 101, 0.1);
  color: #f56565;
  border: 1px solid rgba(245, 101, 101, 0.2);
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

.status-icon {
  width: 24px;
  height: 24px;
}

/* Table Container */
.table-container {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.table-responsive {
  overflow-x: auto;
}

/* Users Table */
.users-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 1000px;
}

.users-table thead {
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
}

.users-table th {
  padding: 1.25rem 1rem;
  font-weight: 600;
  color: #4a5568;
  text-align: right;
  border-bottom: 2px solid #e2e8f0;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.users-table th.text-center {
  text-align: center;
}

.users-table tbody tr {
  transition: all 0.3s ease;
  border-bottom: 1px solid #f1f5f9;
}

.users-table tbody tr:hover {
  background-color: #f8fafc;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.users-table td {
  padding: 1.25rem 1rem;
  vertical-align: middle;
}

.users-table td.text-center {
  text-align: center;
}

/* User Info Cell */
.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
  flex-shrink: 0;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.user-name {
  font-weight: 600;
  color: #2d3748;
}

.user-contact {
  font-size: 0.85rem;
  color: #718096;
}

/* Badges */
.role-badge,
.status-badge {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.role-badge.admin {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.role-badge.user {
  background: rgba(45, 206, 137, 0.1);
  color: #2dce89;
}

.status-badge.active {
  background: rgba(45, 206, 137, 0.1);
  color: #2dce89;
}

.status-badge.inactive,
.status-badge.suspended {
  background: rgba(245, 101, 101, 0.1);
  color: #f56565;
}

.status-badge.default {
  background: rgba(160, 174, 192, 0.1);
  color: #a0aec0;
}

/* Balance Cell */
.balance-cell {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.balance-amount {
  font-weight: 600;
  color: #2d3748;
}

.payout-badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background: rgba(45, 206, 137, 0.1);
  color: #2dce89;
  border-radius: 12px;
  font-weight: 500;
}

/* Earnings Cell */
.earnings-cell {
  font-weight: 600;
  color: #2dce89;
}

/* Date Cell */
.date-cell {
  color: #718096;
  font-size: 0.9rem;
}

/* Actions Cell */
.actions-cell {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.action-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #f7fafc;
  color: #718096;
}

.action-btn svg {
  width: 16px;
  height: 16px;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* رنگ‌های ویژه برای هر نوع دکمه */
.view-btn:hover {
  background: #4299e1;
  color: white;
}

.edit-btn:hover {
  background: #2dce89;
  color: white;
}

.payout-btn:hover {
  background: #f6ad55;
  color: white;
}

.block-btn:hover {
  background: #ed8936;
  color: white;
}

.delete-btn:hover {
  background: #f56565;
  color: white;
}

/* Empty State */
.empty-state {
  padding: 4rem 2rem;
  text-align: center;
  color: #a0aec0;
}

.empty-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.empty-text h4 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #718096;
}

.empty-text p {
  font-size: 1rem;
  color: #a0aec0;
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

.table-info {
  font-size: 0.9rem;
  color: #718096;
}

.search-info {
  color: #667eea;
  font-weight: 500;
}

.table-summary {
  display: flex;
  gap: 2rem;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.summary-label {
  font-size: 0.9rem;
  color: #718096;
}

.summary-value {
  font-weight: 600;
  color: #2d3748;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .admin-container {
    padding: 1.5rem;
  }
  
  .filters-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .admin-container {
    padding: 1rem;
  }
  
  .page-header {
    padding: 2rem 1.5rem;
  }
  
  .page-title {
    font-size: 2rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .header-stats {
    flex-wrap: wrap;
    gap: 2rem;
  }
  
  .stat-value {
    font-size: 2rem;
  }
  
  .table-footer {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }
  
  .table-summary {
    justify-content: center;
  }
  
  .users-table td,
  .users-table th {
    padding: 1rem 0.5rem;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.75rem;
  }
  
  .stat-value {
    font-size: 1.75rem;
  }
  
  .filter-card,
  .actions-card {
    padding: 1.25rem;
  }
  
  .btn {
    padding: 0.875rem 1.25rem;
    font-size: 0.9rem;
  }
  
  .action-buttons {
    gap: 0.75rem;
  }
}
</style>