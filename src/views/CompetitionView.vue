<!-- src/views/CompetitionView.vue -->
<template>
  <div class="page-container">
    <h1 class="page-title">رقابت فعلی</h1>

    <!-- وضعیت کلی -->
    <div v-if="loading" class="status">در حال بارگذاری...</div>
    <div v-if="error" class="status status-error">{{ error }}</div>

    <!-- اگر مسابقه‌ای در جریان نیست -->
    <div v-if="!loading && !error && !competition">
      <p>در حال حاضر هیچ مسابقه‌ای در جریان نیست.</p>
    </div>

    <!-- مسابقه فعلی -->
    <div v-if="competition" class="competition-box">
      <div class="header-row">
        <div>
          <h2>{{ competition.title }}</h2>
          <p class="desc">{{ competition.description }}</p>
          <p>مرحله: {{ competition.roundNumber }}</p>
          <p>وضعیت: {{ competition.status }}</p>
        </div>

        <!-- تایمر -->
        <div class="timer-box" v-if="timeLeftText">
          <p>زمان باقی‌مانده:</p>
          <strong>{{ timeLeftText }}</strong>
        </div>
      </div>

      <!-- سؤال -->
      <div v-if="question" class="question-box">
        <h3>سؤال:</h3>
        <p class="question-text">{{ question.questionText }}</p>

        <ul class="options">
          <li v-for="opt in options" :key="opt.key">
            <label>
              <input
                type="radio"
                name="answer"
                :value="opt.key"
                v-model="selectedOption"
                :disabled="alreadyAnswered || !canAnswer"
              />
              {{ opt.key }} - {{ opt.text }}
            </label>
          </li>
        </ul>

        <button
          @click="submitAnswer"
          :disabled="answerLoading || !selectedOption || !canAnswer || alreadyAnswered"
        >
          {{ alreadyAnswered ? "قبلاً جواب داده‌اید" : "ارسال جواب" }}
        </button>

        <!-- پیام‌ها -->
        <p
          v-if="answerMessage"
          :class="['status', answerCorrect ? 'status-ok' : 'status-error']"
        >
          {{ answerMessage }}
        </p>

        <p v-if="answerCorrect && revealedCode" class="status status-ok">
          کد شما:
         <strong style="font-family: monospace; font-size: 1.2rem">
            {{ revealedCode }}
         </strong>
        </p>

        <!-- ⛔️ بخش مربوط به دکمه تبلیغ، فعلاً غیرفعال شده -->
        <!--
        <p
          v-if="answerCorrect"
          class="status status-ok"
        >
          برای ورود به مرحله بعد (تبلیغ)، روی دکمه زیر کلیک کنید.
        </p>

        <button
          v-if="answerCorrect"
          @click="goToAd"
          class="btn-next"
        >
          رفتن به مرحله تبلیغ
        </button>
        -->

        <p v-if="!canAnswer && !alreadyAnswered" class="status status-error">
          زمان مسابقه تمام شده است؛ امکان ارسال جواب وجود ندارد.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useAuthStore } from "../store/authStore";
// ⛔️ فعلاً به صفحه تبلیغ نمی‌رویم، پس import زیر را هم کامنت می‌کنیم
// import { useRouter } from "vue-router";

// const router = useRouter();
const authStore = useAuthStore();

// آدرس API از env
const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:31000/api";

const competition = ref(null);
const question = ref(null);
const loading = ref(false);
const error = ref("");

// پاسخ دادن
const selectedOption = ref("");
const answerLoading = ref(false);
const answerMessage = ref("");
const answerCorrect = ref(false);
const revealedCode = ref("");

const alreadyAnswered = ref(false);

// تایمر
const timeLeft = ref(0); // بر حسب ثانیه
let timerId = null;

// آیا هنوز می‌شود جواب داد؟
const canAnswer = computed(() => {
  return timeLeft.value > 0 && competition.value?.status === "RUNNING";
});

const options = computed(() => {
  if (!question.value) return [];
  return [
    { key: "A", text: question.value.optionA },
    { key: "B", text: question.value.optionB },
    { key: "C", text: question.value.optionC },
    { key: "D", text: question.value.optionD },
  ];
});

// متن تایمر به صورت hh:mm:ss یا mm:ss
const timeLeftText = computed(() => {
  if (!timeLeft.value || timeLeft.value <= 0) return "";
  const total = timeLeft.value;
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  const pad = (n) => n.toString().padStart(2, "0");
  if (h > 0) {
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  }
  return `${pad(m)}:${pad(s)}`;
});

// شروع تایمر با توجه به endTime مسابقه
function startTimer() {
  if (!competition.value || !competition.value.endTime) return;

  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }

  const end = new Date(competition.value.endTime).getTime();

  const update = () => {
    const now = Date.now();
    const diffMs = Math.max(0, Math.floor((end - now) / 1000)); // ثانیه
    timeLeft.value = diffMs;
    if (diffMs <= 0 && timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  };

  update();
  timerId = setInterval(update, 1000);
}

// ⛔️ تابع رفتن به صفحه تبلیغ فعلاً غیرفعال است
/* 
function goToAd() {
  router.push({ name: "ad" });
}
*/

async function loadCompetitionAndQuestion() {
  loading.value = true;
  error.value = "";
  competition.value = null;
  question.value = null;
  answerMessage.value = "";
  answerCorrect.value = false;
  alreadyAnswered.value = false;
  selectedOption.value = "";

  try {
    const compRes = await fetch(`${API_BASE}/competitions/current`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (!compRes.ok) {
      if (compRes.status === 404) {
        competition.value = null;
        return;
      }
      const text = await compRes.text();
      throw new Error(`HTTP ${compRes.status} - ${text || compRes.statusText}`);
    }

    competition.value = await compRes.json();

    // تایمر را بعد از دریافت مسابقه راه‌اندازی می‌کنیم
    startTimer();

    const qRes = await fetch(`${API_BASE}/competitions/current/question`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (!qRes.ok) {
      const text = await qRes.text();
      throw new Error(`HTTP ${qRes.status} - ${text || qRes.statusText}`);
    }

    question.value = await qRes.json();
  } catch (e) {
    console.error(e);
    error.value = "خطا در دریافت مسابقه یا سؤال.";
  } finally {
    loading.value = false;
  }
}

async function submitAnswer() {
  if (!selectedOption.value || !canAnswer.value || alreadyAnswered.value) return;

  answerLoading.value = true;
  answerMessage.value = "";
  answerCorrect.value = false;

  try {
    const res = await fetch(`${API_BASE}/competitions/current/answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authStore.token}`,
      },
      body: JSON.stringify({ option: selectedOption.value }),
    });

    const rawText = await res.text();
    let data = {};
    try {
      data = rawText ? JSON.parse(rawText) : {};
    } catch {
      data = {};
    }

    if (!res.ok) {
      if (res.status === 400 || res.status === 409) {
        alreadyAnswered.value = true;
      }
      const msg = data.message || rawText || res.statusText || `HTTP ${res.status}`;
      throw new Error(msg);
    }

    const correct = !!data.correct;
    answerCorrect.value = correct;
    answerMessage.value =
      data.message || (correct ? "جواب درست است." : "جواب اشتباه است.");

    if (correct && data.code) {
       revealedCode.value = data.code;
    } else {
       revealedCode.value = "";
    }

    alreadyAnswered.value = true;
  } catch (e) {
    console.error(e);
    if (!answerMessage.value) {
      answerMessage.value = "خطا در ارسال جواب: " + (e.message || "");
    }
    answerCorrect.value = false;
  } finally {
    answerLoading.value = false;
  }
}

onMounted(() => {
  loadCompetitionAndQuestion();
});

onBeforeUnmount(() => {
  if (timerId) {
    clearInterval(timerId);
  }
});
</script>

<style scoped>
.page-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: 'Vazirmatn', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  direction: rtl;
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
  position: relative;
}

.page-title::after {
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

.status {
  margin-top: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-weight: 500;
  text-align: center;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.status-error {
  color: #ff6b6b;
  background: rgba(255, 107, 107, 0.1);
}

.status-ok {
  color: #51cf66;
  background: rgba(81, 207, 102, 0.1);
}

.competition-box {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  margin-top: 1.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.competition-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
}

.header-row {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.header-row h2 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: #2d3748;
}

.desc {
  margin-bottom: 1rem;
  color: #4a5568;
  line-height: 1.6;
}

.timer-box {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  min-width: 180px;
  color: white;
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.timer-box p {
  margin: 0 0 8px 0;
  font-size: 0.95rem;
  opacity: 0.9;
}

.timer-box strong {
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.question-box {
  border-top: 2px solid #f1f3f9;
  margin-top: 2rem;
  padding-top: 2rem;
}

.question-box h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #2d3748;
  position: relative;
  display: inline-block;
}

.question-box h3::after {
  content: '';
  position: absolute;
  bottom: -8px;
  right: 0;
  width: 60%;
  height: 3px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
}

.question-text {
  margin-bottom: 2rem;
  font-size: 1.2rem;
  line-height: 1.7;
  color: #4a5568;
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  border-right: 4px solid #667eea;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.options {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
}

.options li {
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
}

.options li:hover {
  transform: translateX(-8px);
}

.options label {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.options label:hover {
  background: #e9ecef;
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.15);
}

.options input[type="radio"] {
  margin-left: 12px;
  transform: scale(1.3);
  accent-color: #667eea;
}

.options input[type="radio"]:disabled + span {
  opacity: 0.6;
}

button {
  margin-top: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
  width: 100%;
  position: relative;
  overflow: hidden;
}

button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

button:disabled {
  background: #a0aec0;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-next {
  background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
  margin-top: 1rem;
}

.btn-next:hover:not(:disabled) {
  box-shadow: 0 10px 30px rgba(76, 175, 80, 0.4);
}

strong[style*="monospace"] {
  display: inline-block;
  padding: 1rem 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px dashed #667eea;
  margin-top: 1rem;
  font-family: 'Courier New', monospace;
  font-size: 1.3rem;
  letter-spacing: 2px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.competition-box, .question-box, .options li {
  animation: fadeInUp 0.6s ease forwards;
}

@media (max-width: 768px) {
  .page-container {
    padding: 1rem 0.5rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .header-row {
    flex-direction: column;
  }
  
  .timer-box {
    align-self: center;
    width: 100%;
    max-width: 250px;
  }
  
  .competition-box {
    padding: 1.5rem;
  }
  
  .options label {
    padding: 0.75rem 1rem;
  }
}
</style>
