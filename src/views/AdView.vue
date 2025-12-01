<!-- src/views/AdView.vue -->
<template>
  <div class="page-container">
    <h1>تبلیغ</h1>

    <p>در نسخه واقعی اینجا ویدیو / بنر تبلیغ نمایش داده می‌شود.</p>

    <div v-if="loading" class="status">در حال ثبت مشاهده تبلیغ...</div>
    <div v-if="message" class="status">{{ message }}</div>
    <div v-if="error" class="status status-error">{{ error }}</div>

    <button @click="markAdWatched" :disabled="loading">
      من تبلیغ را دیدم، ادامه
    </button>

    <button @click="goBack" class="btn-secondary">
      بازگشت به مسابقه
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore";

const router = useRouter();
const authStore = useAuthStore();

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:31000/api";

const loading = ref(false);
const message = ref("");
const error = ref("");

async function markAdWatched() {
  loading.value = true;
  message.value = "";
  error.value = "";

  try {
    const res = await fetch(`${API_BASE}/competitions/current/ad-watched`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "خطا در ثبت مشاهده تبلیغ");
    }

    message.value = data.message || "مشاهده تبلیغ ثبت شد.";
    // بعد از موفقیت → برو به صفحه وارد کردن کد
    router.push({ name: "enter-code" });
  } catch (e) {
    error.value = e.message || "خطا در ثبت مشاهده تبلیغ";
  } finally {
    loading.value = false;
  }
}

function goBack() {
  router.push({ name: "competition" });
}
</script>

<style scoped>
/* ========= VARIABLES ========= */
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --success-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --shadow-soft: 0 8px 32px rgba(0, 0, 0, 0.1);
  --shadow-hover: 0 20px 40px rgba(0, 0, 0, 0.15);
}

/* ========= PAGE CONTAINER ========= */
.page-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Vazirmatn', 'Inter', sans-serif;
  direction: rtl;
}

.page-container h1 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  position: relative;
}

.page-container h1::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 2px;
}

/* ========= AD CONTAINER ========= */
.ad-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 3rem;
  margin: 2rem 0;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.4);
  text-align: center;
  max-width: 600px;
  width: 100%;
  transition: all 0.3s ease;
}

.ad-container:hover {
  transform: translateY(-5px);
  box-shadow: 
    0 35px 60px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.5);
}

.ad-container p {
  font-size: 1.2rem;
  color: #4a5568;
  margin-bottom: 2rem;
  line-height: 1.6;
  font-weight: 500;
}

/* ========= AD PLACEHOLDER ========= */
.ad-placeholder {
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 2rem 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.ad-placeholder::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, 
    transparent 0%, 
    rgba(255, 255, 255, 0.1) 50%, 
    transparent 100%);
  animation: shimmer 3s ease-in-out infinite;
}

.ad-placeholder::after {
  content: '🎬 تبلیغ اینجا نمایش داده می‌شود';
  position: relative;
  z-index: 2;
}

@keyframes shimmer {
  0%, 100% { transform: translateX(-30%) translateY(-30%) rotate(0deg); }
  50% { transform: translateX(30%) translateY(30%) rotate(180deg); }
}

/* ========= BUTTON STYLES ========= */
button {
  padding: 1rem 2rem;
  margin: 0.5rem;
  border: none;
  border-radius: 14px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  font-family: inherit;
  min-width: 200px;
}

button:first-of-type {
  background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
  color: white;
  box-shadow: 
    0 8px 30px rgba(76, 175, 80, 0.3),
    0 2px 8px rgba(76, 175, 80, 0.2);
}

button:first-of-type:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 
    0 15px 40px rgba(76, 175, 80, 0.4),
    0 4px 15px rgba(76, 175, 80, 0.3);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.9);
  color: #4a5568;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.btn-secondary:hover:not(:disabled) {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

button:disabled {
  background: linear-gradient(135deg, #a0aec0 0%, #718096 100%);
  cursor: not-allowed;
  transform: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* ========= LOADING ANIMATION ========= */
button:disabled::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -10px 0 0 -10px;
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* ========= STATUS MESSAGES ========= */
.status {
  margin-top: 1.5rem;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-weight: 500;
  text-align: center;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  max-width: 600px;
  animation: slideInUp 0.5s ease-out;
}

.status-error {
  color: #ff6b6b;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.2);
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ========= BUTTON CONTAINER ========= */
.button-container {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
}

/* ========= RESPONSIVE DESIGN ========= */
@media (max-width: 768px) {
  .page-container {
    padding: 2rem 1rem;
  }
  
  .page-container h1 {
    font-size: 2rem;
  }
  
  .ad-container {
    padding: 2rem 1.5rem;
    margin: 1.5rem 0;
  }
  
  .ad-placeholder {
    height: 250px;
    font-size: 1.3rem;
  }
  
  .button-container {
    flex-direction: column;
    align-items: center;
  }
  
  button {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .page-container {
    padding: 1.5rem 0.75rem;
  }
  
  .page-container h1 {
    font-size: 1.8rem;
  }
  
  .ad-container {
    padding: 1.5rem 1rem;
  }
  
  .ad-placeholder {
    height: 200px;
    font-size: 1.1rem;
  }
  
  button {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
}

/* ========= ACCESSIBILITY ========= */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

button:focus-visible {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

/* ========= ENHANCED VISUALS ========= */
.ad-container {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(255, 255, 255, 0.98) 100%);
}

button:first-of-type {
  background: linear-gradient(135deg, 
    #4CAF50 0%, 
    #2E7D32 50%, 
    #4CAF50 100%);
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* ========= TIMER INDICATOR ========= */
.timer-indicator {
  margin-top: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  font-weight: 500;
}

/* ========= PROGRESS BAR ========= */
.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  margin: 1rem 0;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4CAF50, #2E7D32);
  border-radius: 3px;
  transition: width 0.3s ease;
  animation: progressAnimation 5s linear infinite;
}

@keyframes progressAnimation {
  0% { width: 0%; }
  100% { width: 100%; }
}
</style>
