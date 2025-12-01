<!-- src/views/admin/AdminDashboardView.vue -->
<template>
  <div class="admin-container">
    <h1 class="title">داشبورد ادمین</h1>

    <div v-if="loading" class="status">در حال بارگذاری...</div>
    <div v-if="error" class="status status-error">{{ error }}</div>

    <div class="stats" v-if="!loading && !error">
      <div class="card">
        <div class="card-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
          </svg>
        </div>
        <h2>تعداد کل کاربران</h2>
        <p>{{ stats.totalUsers }}</p>
      </div>

      <div class="card">
        <div class="card-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
          </svg>
        </div>
        <h2>مسابقات فعال</h2>
        <p>{{ stats.runningCompetitions }}</p>
      </div>

      <div class="card">
        <div class="card-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
          </svg>
        </div>
        <h2>مسابقات پایان‌یافته</h2>
        <p>{{ stats.finishedCompetitions }}</p>
      </div>

      <div class="card">
        <div class="card-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z" clip-rule="evenodd" />
          </svg>
        </div>
        <h2>مجموع جوایز پرداخت‌شده</h2>
        <p>{{ stats.totalPrizePaid.toFixed(2) }} $</p>
      </div>
    </div>

    <div class="actions">
      <router-link to="/admin/users" class="btn btn-primary">
        <span>مدیریت کاربران</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clip-rule="evenodd" />
        </svg>
      </router-link>
      <router-link to="/admin/competitions" class="btn btn-secondary">
        <span>مدیریت مسابقات</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clip-rule="evenodd" />
        </svg>
      </router-link>
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
    error.value = "خطا در دریافت خلاصه داشبورد.";
  } finally {
    loading.value = false;
  }
}

onMounted(loadDashboard);
</script>

<style scoped>
.admin-container {
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  min-height: 100vh;
  color: #e2e8f0;
  font-family: 'Vazirmatn', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.title {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(90deg, #00dbde, #fc00ff, #00dbde);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 3s linear infinite;
  text-shadow: 0 0 10px rgba(124, 58, 237, 0.5);
}

@keyframes shine {
  to {
    background-position: 200% center;
  }
}

.status {
  text-align: center;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.status-error {
  color: #ff6b6b;
  border: 1px solid rgba(255, 107, 107, 0.5);
  box-shadow: 0 0 15px rgba(255, 107, 107, 0.3);
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.card {
  padding: 2rem 1.5rem;
  border-radius: 16px;
  text-align: center;
  background: rgba(17, 25, 40, 0.75);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.125);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.36);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #00dbde, #fc00ff);
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(124, 58, 237, 0.4);
  border: 1px solid rgba(124, 58, 237, 0.3);
}

.card:nth-child(1):hover {
  box-shadow: 0 15px 30px rgba(0, 219, 222, 0.4);
  border: 1px solid rgba(0, 219, 222, 0.3);
}

.card:nth-child(2):hover {
  box-shadow: 0 15px 30px rgba(252, 0, 255, 0.4);
  border: 1px solid rgba(252, 0, 255, 0.3);
}

.card:nth-child(3):hover {
  box-shadow: 0 15px 30px rgba(0, 255, 153, 0.4);
  border: 1px solid rgba(0, 255, 153, 0.3);
}

.card:nth-child(4):hover {
  box-shadow: 0 15px 30px rgba(255, 215, 0, 0.4);
  border: 1px solid rgba(255, 215, 0, 0.3);
}

.card-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: #00dbde;
}

.card:nth-child(2) .card-icon {
  color: #fc00ff;
}

.card:nth-child(3) .card-icon {
  color: #00ff99;
}

.card:nth-child(4) .card-icon {
  color: #ffd700;
}

.card h2 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #cbd5e1;
  font-weight: 500;
}

.card p {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(90deg, #00dbde, #fc00ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card:nth-child(2) p {
  background: linear-gradient(90deg, #fc00ff, #00dbde);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card:nth-child(3) p {
  background: linear-gradient(90deg, #00ff99, #00dbde);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card:nth-child(4) p {
  background: linear-gradient(90deg, #ffd700, #ff8c00);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
}

.btn svg {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.btn:hover svg {
  transform: translateX(-5px);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px 0 rgba(116, 79, 168, 0.75);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px 0 rgba(116, 79, 168, 0.9);
}

.btn-secondary {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  box-shadow: 0 4px 15px 0 rgba(245, 87, 108, 0.75);
}

.btn-secondary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px 0 rgba(245, 87, 108, 0.9);
}

/* Responsive Design */
@media (max-width: 768px) {
  .admin-container {
    padding: 1rem;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .stats {
    grid-template-columns: 1fr;
  }
  
  .actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
}
</style>