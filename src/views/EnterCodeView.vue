<!-- src/views/EnterCodeView.vue -->
<template>
  <div class="page-container">
    <h1 class="page-title">ثبت کد مسابقه</h1>

    <!-- توضیح کلی -->
    <p class="hint">
      بعد از این‌که سؤال را درست جواب دادی، یک کد برایت نمایش داده می‌شود.
      اینجا آن کد را وارد کن؛ هرکس زودتر کد درست را ثبت کند، برنده می‌شود.
    </p>

    <!-- اگر مسابقه فعلی را توانستیم بخوانیم -->
    <div v-if="competitionTitle" class="competition-info">
      <p>
        مسابقه فعلی:
        <strong>{{ competitionTitle }}</strong>
      </p>
    </div>

    <!-- وضعیت بارگذاری -->
    <div v-if="loadingCompetition" class="status">
      در حال بررسی مسابقه فعلی...
    </div>

    <!-- فرم وارد کردن کد -->
    <div class="card">
      <label for="code-input" class="label">
        کد مسابقه:
      </label>
      <input
        id="code-input"
        v-model="code"
        type="text"
        class="input"
        placeholder="مثلاً: ABC2025"
        :disabled="submitting || successLocked"
      />

      <button
        class="btn-primary"
        @click="submitCode"
        :disabled="submitting || !trimmedCode || successLocked"
      >
        {{ successLocked ? "کد ثبت شده است" : "ارسال کد" }}
      </button>

      <button class="btn-secondary" @click="goBack" :disabled="submitting">
        بازگشت به صفحه رقابت
      </button>

      <!-- پیام موفقیت / خطا -->
      <p v-if="successMessage" class="status status-ok">
        {{ successMessage }}
      </p>
      <p v-if="errorMessage" class="status status-error">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore";

const router = useRouter();
const authStore = useAuthStore();

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:31000/api";

// استیت‌ها
const competitionTitle = ref("");
const loadingCompetition = ref(false);

const code = ref("");
const submitting = ref(false);
const successMessage = ref("");
const errorMessage = ref("");
const successLocked = ref(false); // بعد از برنده شدن، دیگر اجازه ارسال مجدد ندهیم

const trimmedCode = computed(() => code.value.trim());

// گرفتن عنوان مسابقه فعلی (اختیاری، فقط برای نمایش قشنگ‌تر)
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
      return; // اگر خطا بود، فقط ساکت می‌مانیم
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

  try {
    const res = await fetch(`${API_BASE}/competitions/current/enter-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authStore.token}`,
      },
      body: JSON.stringify({ code: trimmedCode.value }),
    });

    // اول متن خام را می‌گیریم تا اگر JSON نبود، اپ کرش نکند
    const rawText = await res.text();
    let data = {};
    try {
      data = rawText ? JSON.parse(rawText) : {};
    } catch {
      data = {};
    }

    if (!res.ok) {
      // بک‌اند در CodeEntryResponse همیشه message دارد
      const msg =
        data.message || rawText || res.statusText || `HTTP ${res.status}`;
      errorMessage.value = msg;
      successMessage.value = "";
      return;
    }

    // موفق
    const msg =
      data.message || "کد با موفقیت ثبت شد. اگر اولین نفر بودید، برنده شده‌اید.";
    successMessage.value = msg;
    errorMessage.value = "";

    // اگر success=true از بک‌اند برگشته، یعنی یا برنده شده یا قبلاً برنده بوده
    if (data.success === true) {
      successLocked.value = true;
    }
  } catch (e) {
    console.error(e);
    errorMessage.value =
      "خطا در ارسال کد: " + (e.message || "ارتباط با سرور ناموفق بود.");
  } finally {
    submitting.value = false;
  }
}

function goBack() {
  router.push({ name: "competition" });
}

onMounted(() => {
  loadCurrentCompetition();
});
</script>

<style scoped>
.page-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.page-title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.hint {
  text-align: center;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.6;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.competition-info {
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 500;
  color: white;
  background: rgba(255, 255, 255, 0.15);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
}

.label {
  display: block;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #2d3748;
  font-size: 1.1rem;
}

.input {
  width: 100%;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  box-sizing: border-box;
  transition: all 0.3s ease;
  background: white;
  text-align: center;
  letter-spacing: 2px;
  font-weight: 600;
}

.input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

.input:disabled {
  background: #f7fafc;
  opacity: 0.7;
}

.btn-primary,
.btn-secondary {
  display: inline-block;
  min-width: 160px;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  margin: 0.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: default;
  transform: none;
}

.btn-secondary {
  background: #f7fafc;
  color: #4a5568;
  border: 2px solid #e2e8f0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.btn-secondary:hover:not(:disabled) {
  background: #edf2f7;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.status {
  margin-top: 1.5rem;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-weight: 500;
  text-align: center;
  backdrop-filter: blur(10px);
}

.status-ok {
  color: #059669;
  background: rgba(5, 150, 105, 0.1);
  border: 1px solid rgba(5, 150, 105, 0.2);
}

.status-error {
  color: #dc2626;
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.2);
}

@media (max-width: 768px) {
  .page-container {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .card {
    padding: 2rem 1.5rem;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
    margin: 0.25rem 0;
  }
}
</style>
