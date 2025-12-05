<template>
  <div class="enter-code-container">
    <!-- Animated Header -->
    <header class="code-header">
      <div class="header-bg">
        <div class="bg-animation"></div>
      </div>
      
      <div class="header-content">
        <div class="header-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
          </svg>
        </div>
        <h1 class="main-title">ثبت کد جایزه</h1>
        <p class="header-subtitle">کد دریافتی خود را وارد کنید و برنده شوید</p>
      </div>
    </header>

    <!-- Competition Info -->
    <div class="competition-info" v-if="competitionTitle || loadingCompetition">
      <div class="info-card">
        <div v-if="loadingCompetition" class="loading-info">
          <div class="loading-spinner-small"></div>
          <span>در حال دریافت اطلاعات مسابقه...</span>
        </div>
        
        <div v-else class="info-content">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="info-icon">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
          </svg>
          <div class="info-text">
            <h3>مسابقه فعلی</h3>
            <p>{{ competitionTitle || 'بدون عنوان' }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Instructions -->
    <section class="instructions-section">
      <div class="instructions-card">
        <div class="instructions-header">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="instructions-icon">
            <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
          </svg>
          <h2 class="instructions-title">راهنمای ثبت کد</h2>
        </div>
        
        <div class="instructions-content">
          <p>
            بعد از پاسخ صحیح به سؤال، یک کد منحصر به فرد برای شما نمایش داده می‌شود.
            این کد را در کادر زیر وارد کنید. اولین نفری که کد صحیح را وارد کند، برنده مسابقه خواهد شد.
          </p>
          
          <div class="instructions-list">
            <div class="instruction-item">
              <div class="item-number">1</div>
              <div class="item-text">پاسخ صحیح به سؤال مسابقه را بدهید</div>
            </div>
            <div class="instruction-item">
              <div class="item-number">2</div>
              <div class="item-text">کد دریافتی را کپی کنید</div>
            </div>
            <div class="instruction-item">
              <div class="item-number">3</div>
              <div class="item-text">کد را در این صفحه وارد کنید</div>
            </div>
            <div class="instruction-item">
              <div class="item-number">4</div>
              <div class="item-text">اولین نفر برنده می‌شود!</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Code Entry Form -->
    <section class="form-section">
      <div class="form-card">
        <div class="form-header">
          <h2 class="form-title">ورود کد جایزه</h2>
          <div class="form-badge">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="badge-icon">
              <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd" />
            </svg>
            <span>کد محرمانه</span>
          </div>
        </div>
        
        <div class="form-body">
          <div class="form-group">
            <label class="form-label">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="label-icon">
                <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
              </svg>
              کد دریافتی
            </label>
            
            <div class="code-input-container">
              <input
                id="code-input"
                v-model="code"
                type="text"
                class="code-input"
                placeholder="مثال: ABC-2025-XYZ"
                :disabled="submitting || successLocked"
                @keyup.enter="submitCode"
              />
              <div class="input-decoration">
                <div class="decoration-line"></div>
              </div>
            </div>
            
            <div class="form-hint">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="hint-icon">
                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
              </svg>
              کد دریافتی را دقیقاً مطابق با نمایش کپی و وارد کنید
            </div>
          </div>
          
          <div class="form-actions">
            <button
              @click="submitCode"
              :disabled="submitting || !trimmedCode || successLocked"
              class="btn btn-primary"
            >
              <svg v-if="submitting" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="spinner">
                <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clip-rule="evenodd" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="btn-icon">
                <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
              </svg>
              {{ successLocked ? "کد ثبت شده" : submitting ? "در حال ارسال..." : "تأیید و ثبت کد" }}
            </button>
            
            <button
              @click="goBack"
              :disabled="submitting"
              class="btn btn-secondary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="btn-icon">
                <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clip-rule="evenodd" />
              </svg>
              بازگشت به مسابقه
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Messages -->
    <div v-if="successMessage || errorMessage" class="messages-section">
      <div :class="['message-card', errorMessage ? 'error' : 'success']">
        <div class="message-icon">
          <svg v-if="errorMessage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="message-content">
          <h3 class="message-title">{{ errorMessage ? "خطا در ثبت کد" : "موفقیت‌آمیز" }}</h3>
          <p class="message-text">{{ errorMessage || successMessage }}</p>
        </div>
      </div>
    </div>

    <!-- Winner Already Selected -->
    <div v-if="winnerAlreadySelected && winnerName" class="winner-section">
      <div class="winner-card">
        <div class="winner-header">
          <div class="winner-badge">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="badge-icon">
              <path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h.75c2.708 0 5.208-.998 7.147-2.65.527-.514 1.151-.96 1.851-1.326.203-.103.412-.194.625-.272a9.06 9.06 0 01-1.086-.243c-1.128-.282-2.34-.375-3.591-.297a9.1 9.1 0 01-1.439.087 9.053 9.053 0 01-.713-.07 6.703 6.703 0 01-1.96-3.87 6.724 6.724 0 01-.096-1.764c-2.132-.36-3.96-1.598-4.7-3.366a6.76 6.76 0 01-1.09-3.17c0-.11.012-.22.027-.329C3.6 2.88 4.34 2.621 5.166 2.621z" clip-rule="evenodd" />
            </svg>
            <span>برنده مشخص شد</span>
          </div>
        </div>
        
        <div class="winner-content">
          <div class="winner-avatar">
            {{ getInitials(winnerName) }}
          </div>
          <div class="winner-details">
            <h3 class="winner-name">{{ winnerName }}</h3>
            <p class="winner-info">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="info-icon">
                <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd" />
              </svg>
              {{ winnerPhoneMasked || 'شماره تماس محفوظ' }}
            </p>
          </div>
        </div>
        
        <div class="winner-actions">
          <button @click="goToWinners" class="btn btn-success">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="btn-icon">
              <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clip-rule="evenodd" />
              <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zm9.586 4.594a.75.75 0 00-1.172-.938l-2.476 3.096-.634-.682a.75.75 0 00-1.06 1.06l1.25 1.25a.75.75 0 001.116-.062l3-3.75z" clip-rule="evenodd" />
            </svg>
            مشاهده لیست برندگان
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore";

const router = useRouter();
const authStore = useAuthStore();

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:31000/api";

// State
const competitionTitle = ref("");
const loadingCompetition = ref(false);

const code = ref("");
const submitting = ref(false);
const successMessage = ref("");
const errorMessage = ref("");
const successLocked = ref(false);

// Winner info
const winnerName = ref(null);
const winnerPhoneMasked = ref(null);
const winnerAlreadySelected = ref(false);

const trimmedCode = computed(() => code.value.trim());

function getInitials(name) {
  if (!name) return "??";
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

async function loadCurrentCompetition() {
  loadingCompetition.value = true;
  competitionTitle.value = "";
  try {
    const res = await fetch(`${API_BASE}/competitions/current`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (!res.ok) {
      return;
    }

    const data = await res.json();
    competitionTitle.value = data.title || "";
  } catch (e) {
    console.error(e);
  } finally {
    loadingCompetition.value = false;
  }
}

async function submitCode() {
  if (!trimmedCode.value || submitting.value || successLocked.value) return;

  submitting.value = true;
  successMessage.value = "";
  errorMessage.value = "";

  winnerAlreadySelected.value = false;
  winnerName.value = null;
  winnerPhoneMasked.value = null;

  try {
    const res = await fetch(`${API_BASE}/competitions/current/enter-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authStore.token}`,
      },
      body: JSON.stringify({ code: trimmedCode.value }),
    });

    const rawText = await res.text();
    let data = {};
    try {
      data = rawText ? JSON.parse(rawText) : {};
    } catch {
      data = {};
    }

    if (!res.ok) {
      const msg = data.message || rawText || res.statusText || `HTTP ${res.status}`;
      errorMessage.value = msg;
      successMessage.value = "";

      if (data.winnerName) {
        winnerAlreadySelected.value = true;
        winnerName.value = data.winnerName;
        winnerPhoneMasked.value = data.winnerPhoneMasked || null;
      }
      return;
    }

    const msg = data.message || "کد با موفقیت ثبت شد. اگر اولین نفر بودید، برنده شده‌اید.";
    successMessage.value = msg;
    errorMessage.value = "";

    winnerAlreadySelected.value = false;
    winnerName.value = null;
    winnerPhoneMasked.value = null;

    if (data.success === true) {
      successLocked.value = true;
    }
  } catch (e) {
    console.error(e);
    errorMessage.value = "خطا در ارسال کد: " + (e.message || "ارتباط با سرور ناموفق بود.");
  } finally {
    submitting.value = false;
  }
}

function goToWinners() {
  router.push("/winners");
}

function goBack() {
  router.push({ name: "competition" });
}

onMounted(() => {
  loadCurrentCompetition();
});
</script>

<style scoped>
.enter-code-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem 3rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  font-family: 'Vazirmatn', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  direction: rtl;
}

/* Header Styles */
.code-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0 0 40px 40px;
  padding: 3rem 2rem 2rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
}

.code-header::before {
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

.header-bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
}

.bg-animation {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
  animation: shine 3s infinite;
}

@keyframes shine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
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

/* Competition Info */
.competition-info {
  margin-bottom: 2rem;
}

.info-card {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.loading-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: #4a5568;
}

.loading-spinner-small {
  width: 24px;
  height: 24px;
  border: 3px solid #e2e8f0;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.info-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.info-icon {
  width: 40px;
  height: 40px;
  color: #667eea;
  flex-shrink: 0;
}

.info-text h3 {
  font-size: 1rem;
  color: #718096;
  margin: 0 0 0.25rem;
  font-weight: 600;
}

.info-text p {
  font-size: 1.2rem;
  color: #2d3748;
  font-weight: 700;
  margin: 0;
}

/* Instructions Section */
.instructions-section {
  margin-bottom: 2rem;
}

.instructions-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.instructions-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;
}

.instructions-icon {
  width: 28px;
  height: 28px;
  color: #667eea;
}

.instructions-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.instructions-content {
  color: #4a5568;
  line-height: 1.7;
}

.instructions-content p {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.instructions-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.instruction-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.item-number {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}

.item-text {
  font-weight: 500;
  color: #4a5568;
}

/* Form Section */
.form-section {
  margin-bottom: 2rem;
}

.form-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.form-card::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.form-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #e6f7ff;
  color: #007acc;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.badge-icon {
  width: 16px;
  height: 16px;
}

.form-group {
  margin-bottom: 2rem;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.label-icon {
  width: 20px;
  height: 20px;
  color: #667eea;
}

.code-input-container {
  position: relative;
  margin-bottom: 0.5rem;
}

.code-input {
  width: 100%;
  padding: 1.25rem 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  letter-spacing: 2px;
  background: #f8fafc;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
}

.code-input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.code-input:disabled {
  background: #edf2f7;
  opacity: 0.7;
  cursor: not-allowed;
}

.input-decoration {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  height: 2px;
  overflow: hidden;
}

.decoration-line {
  height: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  width: 0;
  animation: expandLine 0.5s ease-out 0.3s forwards;
}

@keyframes expandLine {
  to {
    width: 100%;
  }
}

.form-hint {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #718096;
  margin-top: 0.5rem;
}

.hint-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.form-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
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
  flex: 1;
  min-width: 200px;
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

.btn-success {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
}

.btn-success:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(72, 187, 120, 0.3);
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

/* Messages Section */
.messages-section {
  margin-bottom: 2rem;
}

.message-card {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 16px;
}

.message-card.success {
  background: linear-gradient(135deg, rgba(72, 187, 120, 0.1) 0%, rgba(56, 161, 105, 0.1) 100%);
  border: 1px solid rgba(72, 187, 120, 0.2);
}

.message-card.error {
  background: linear-gradient(135deg, rgba(245, 101, 101, 0.1) 0%, rgba(229, 62, 62, 0.1) 100%);
  border: 1px solid rgba(245, 101, 101, 0.2);
}

.message-icon {
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.message-card.success .message-icon {
  color: #48bb78;
}

.message-card.error .message-icon {
  color: #f56565;
}

.message-icon svg {
  width: 24px;
  height: 24px;
}

.message-content {
  flex: 1;
}

.message-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 0.5rem;
}

.message-text {
  color: #4a5568;
  line-height: 1.6;
  margin: 0;
}

/* Winner Section */
.winner-section {
  margin-top: 2rem;
}

.winner-card {
  background: linear-gradient(135deg, #34d399 0%, #059669 100%);
  border-radius: 20px;
  padding: 2rem;
  color: white;
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
  animation: fadeInUp 0.4s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.winner-header {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.winner-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
}

.winner-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.winner-avatar {
  width: 60px;
  height: 60px;
  background: white;
  color: #059669;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.winner-details {
  text-align: center;
}

.winner-name {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0 0 0.5rem;
}

.winner-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  opacity: 0.9;
  justify-content: center;
}

.winner-info svg {
  width: 16px;
  height: 16px;
}

.winner-actions {
  display: flex;
  justify-content: center;
}

/* Responsive Design */
@media (max-width: 768px) {
  .enter-code-container {
    padding: 0 0.5rem 2rem;
  }
  
  .code-header {
    padding: 2rem 1rem 1.5rem;
    border-radius: 0 0 30px 30px;
  }
  
  .main-title {
    font-size: 2rem;
  }
  
  .instructions-list {
    grid-template-columns: 1fr;
  }
  
  .form-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn {
    min-width: 100%;
  }
  
  .winner-content {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.75rem;
  }
  
  .code-input {
    font-size: 1.2rem;
    padding: 1rem;
  }
  
  .form-card,
  .instructions-card {
    padding: 1.5rem;
  }
  
  .btn {
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
  }
}
</style>