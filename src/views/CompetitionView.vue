<template>
  <div class="competition-container">
    <!-- Header with Animated Background -->
    <header class="competition-header">
      <div class="header-content">
        <h1 class="main-title">
          <span class="title-text">🏆 رقابت فعلی</span>
          <span class="title-pulse"></span>
        </h1>
        <p class="header-subtitle">شرکت در رقابت‌های زنده و برنده شدن جوایز هیجان‌انگیز</p>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">در حال بارگذاری رقابت...</p>
    </div>

    <!-- Error State -->
    <div v-if="error && !loading" class="error-container">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="error-icon">
        <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
      </svg>
      <p class="error-text">{{ error }}</p>
    </div>

    <!-- No Active Competition -->
    <div v-if="!loading && !error && !competition" class="empty-state">
      <div class="empty-illustration">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="empty-icon">
          <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
        </svg>
      </div>
      <h2 class="empty-title">رقابت فعالی وجود ندارد</h2>
      <p class="empty-description">در حال حاضر هیچ رقابت فعالی در جریان نیست. لطفاً منتظر شروع رقابت بعدی باشید.</p>
    </div>

    <!-- Active Competition -->
    <div v-if="competition" class="competition-content">
      <!-- Competition Header Card -->
      <div class="competition-card header-card">
        <div class="card-header">
          <div class="competition-badge">
            <span class="badge-icon">🎯</span>
            <span class="badge-text">رقابت زنده</span>
          </div>
          
          <div class="timer-container" v-if="timeLeftText">
            <div class="timer-badge">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="timer-icon">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
              </svg>
              <span class="timer-label">زمان باقی‌مانده</span>
            </div>
            <div class="timer-display">
              <span class="timer-value">{{ timeLeftText }}</span>
              <div class="timer-progress">
                <div class="progress-bar" :style="{ width: timerProgress + '%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="competition-info">
          <h2 class="competition-title">{{ competition.title }}</h2>
          <p class="competition-description">{{ competition.description }}</p>
          
          <div class="competition-meta">
            <div class="meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="meta-icon">
                <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clip-rule="evenodd" />
              </svg>
              <span class="meta-text">مرحله {{ competition.roundNumber }}</span>
            </div>
            
            <div class="meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="meta-icon">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
              </svg>
              <span class="meta-text">{{ competition.status === 'RUNNING' ? 'در حال اجرا' : 'پایان یافته' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Question Section -->
      <div v-if="question" class="question-section">
        <div class="section-header">
          <h3 class="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="section-icon">
              <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
            </svg>
            سوال رقابت
          </h3>
          <div class="section-badge">
            <span class="points-badge">امتیاز: +100</span>
          </div>
        </div>

        <div class="question-card">
          <div class="question-content">
            <p class="question-text">{{ question.questionText }}</p>
            
            <div class="options-container">
              <div 
                v-for="opt in options" 
                :key="opt.key"
                class="option-item"
                :class="{ 
                  selected: selectedOption === opt.key,
                  disabled: alreadyAnswered || !canAnswer,
                  correct: answerCorrect && selectedOption === opt.key && alreadyAnswered
                }"
                @click="selectOption(opt.key)"
              >
                <div class="option-content">
                  <div class="option-header">
                    <span class="option-letter">{{ opt.key }}</span>
                    <span class="option-status">
                      <span v-if="answerCorrect && selectedOption === opt.key && alreadyAnswered" class="status-correct">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
                        </svg>
                      </span>
                      <span v-else-if="alreadyAnswered && selectedOption === opt.key && !answerCorrect" class="status-wrong">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
                        </svg>
                      </span>
                    </span>
                  </div>
                  <p class="option-text">{{ opt.text }}</p>
                </div>
                
                <input
                  type="radio"
                  name="answer"
                  :value="opt.key"
                  v-model="selectedOption"
                  :disabled="alreadyAnswered || !canAnswer"
                  class="radio-input"
                />
              </div>
            </div>

            <div class="answer-actions">
              <button
                @click="submitAnswer"
                :disabled="answerLoading || !selectedOption || !canAnswer || alreadyAnswered"
                class="submit-btn"
              >
                <span v-if="answerLoading" class="btn-loading">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="spinner">
                    <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clip-rule="evenodd" />
                  </svg>
                  در حال ارسال...
                </span>
                <span v-else-if="alreadyAnswered" class="btn-disabled">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
                  </svg>
                  قبلاً پاسخ داده‌اید
                </span>
                <span v-else-if="!canAnswer" class="btn-disabled">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
                  </svg>
                  زمان تمام شد
                </span>
                <span v-else class="btn-text">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
                  </svg>
                  ثبت پاسخ
                </span>
              </button>
              
              <div v-if="!canAnswer && !alreadyAnswered" class="time-up-alert">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                </svg>
                <span>زمان مسابقه به پایان رسیده است</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Answer Messages -->
        <div v-if="answerMessage" class="message-container">
          <div :class="['message-card', answerCorrect ? 'success' : 'error']">
            <div class="message-icon">
              <svg v-if="answerCorrect" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="message-content">
              <h4 class="message-title">{{ answerCorrect ? 'تبریک!' : 'متاسفیم!' }}</h4>
              <p class="message-text">{{ answerMessage }}</p>
              
              <div v-if="answerCorrect && revealedCode" class="code-reveal">
                <div class="code-container">
                  <span class="code-label">کد جایزه شما:</span>
                  <div class="code-value">
                    <span class="code-text">{{ revealedCode }}</span>
                    <button class="copy-btn" @click="copyToClipboard">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 01-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0113.5 1.5H15a3 3 0 012.663 1.618zM12 4.5A5.5 5.5 0 0014 9.5h-4A5.5 5.5 0 0012 4.5zm5.5 5.5A5.5 5.5 0 0122 9.5h-4A5.5 5.5 0 0117.5 10zm-1.5 5a3 3 0 013 3v6a3 3 0 01-3 3H10a3 3 0 01-3-3v-6a3 3 0 013-3h6z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div v-if="copied" class="copy-success">کد کپی شد!</div>
                </div>
              </div>
              
              <!-- تبلیغ غیرفعال -->
              <!--
              <div v-if="answerCorrect" class="next-step">
                <p class="next-step-text">برای ورود به مرحله بعد روی دکمه زیر کلیک کنید</p>
                <button @click="goToAd" class="next-step-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clip-rule="evenodd" />
                  </svg>
                  رفتن به مرحله تبلیغ
                </button>
              </div>
              -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useAuthStore } from "../store/authStore";

const authStore = useAuthStore();
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:31000/api";

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
const copied = ref(false);

// تایمر
const timeLeft = ref(0);
const totalTime = ref(0);
let timerId = null;

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

const timeLeftText = computed(() => {
  if (!timeLeft.value || timeLeft.value <= 0) return "00:00";
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

const timerProgress = computed(() => {
  if (!totalTime.value || totalTime.value <= 0) return 0;
  return Math.max(0, (timeLeft.value / totalTime.value) * 100);
});

function selectOption(option) {
  if (alreadyAnswered.value || !canAnswer.value) return;
  selectedOption.value = option;
}

function startTimer() {
  if (!competition.value || !competition.value.endTime) return;

  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }

  const start = new Date(competition.value.startTime).getTime();
  const end = new Date(competition.value.endTime).getTime();
  
  // Calculate total time in seconds
  totalTime.value = Math.max(0, Math.floor((end - start) / 1000));

  const update = () => {
    const now = Date.now();
    const diffMs = Math.max(0, Math.floor((end - now) / 1000));
    timeLeft.value = diffMs;
    if (diffMs <= 0 && timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  };

  update();
  timerId = setInterval(update, 1000);
}

function copyToClipboard() {
  if (!revealedCode.value) return;
  
  navigator.clipboard.writeText(revealedCode.value).then(() => {
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  });
}

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
  revealedCode.value = "";

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
.competition-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem 2rem;
  font-family: 'Vazirmatn', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  direction: rtl;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

/* Header Styles */
.competition-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0 0 30px 30px;
  padding: 3rem 2rem 2rem;
  margin-bottom: 2rem;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
}

.competition-header::before {
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

.competition-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 150px;
  height: 150px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  transform: translate(-30%, 30%);
}

.header-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.main-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  position: relative;
}

.title-text {
  background: linear-gradient(90deg, #fff, #e2e8f0, #fff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: textShine 3s ease-in-out infinite alternate;
}

@keyframes textShine {
  to {
    background-position: 200% center;
  }
}

.title-pulse {
  width: 12px;
  height: 12px;
  background: #48bb78;
  border-radius: 50%;
  box-shadow: 0 0 20px #48bb78;
  animation: pulse 1.5s ease-in-out infinite;
}

.header-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-top: 0.5rem;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  margin-top: 2rem;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1.5rem;
}

.loading-text {
  font-size: 1.2rem;
  color: #4a5568;
  font-weight: 500;
}

/* Error State */
.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(245, 101, 101, 0.1) 0%, rgba(229, 62, 62, 0.1) 100%);
  border-radius: 16px;
  border: 1px solid rgba(245, 101, 101, 0.2);
  margin-top: 2rem;
  text-align: center;
}

.error-icon {
  width: 32px;
  height: 32px;
  color: #f56565;
  flex-shrink: 0;
}

.error-text {
  color: #f56565;
  font-weight: 500;
  font-size: 1.1rem;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  margin-top: 2rem;
}

.empty-illustration {
  margin-bottom: 1.5rem;
}

.empty-icon {
  width: 80px;
  height: 80px;
  color: #cbd5e0;
  opacity: 0.7;
}

.empty-title {
  font-size: 1.8rem;
  color: #4a5568;
  margin-bottom: 0.75rem;
}

.empty-description {
  color: #718096;
  font-size: 1.1rem;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Competition Content */
.competition-content {
  margin-top: 2rem;
}

.competition-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.competition-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
}

.header-card {
  border: 2px solid #667eea;
  position: relative;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-bottom: 1px solid #e2e8f0;
}

.competition-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.badge-icon {
  font-size: 1.2rem;
}

.badge-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.timer-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.timer-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  font-size: 0.9rem;
  font-weight: 600;
}

.timer-icon {
  width: 18px;
  height: 18px;
}

.timer-display {
  text-align: center;
}

.timer-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2d3748;
  font-family: monospace;
  letter-spacing: 2px;
}

.timer-progress {
  width: 200px;
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  margin-top: 0.5rem;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  border-radius: 3px;
  transition: width 1s linear;
}

.competition-info {
  padding: 2rem;
}

.competition-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.competition-description {
  color: #4a5568;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.competition-meta {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-icon {
  width: 20px;
  height: 20px;
  color: #667eea;
}

.meta-text {
  color: #4a5568;
  font-weight: 500;
}

/* Question Section */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-icon {
  width: 24px;
  height: 24px;
  color: #667eea;
}

.section-badge {
  background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.question-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
}

.question-content {
  max-width: 700px;
  margin: 0 auto;
}

.question-text {
  font-size: 1.3rem;
  line-height: 1.8;
  color: #2d3748;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
  border-right: 4px solid #667eea;
  position: relative;
}

.question-text::before {
  content: '❓';
  position: absolute;
  left: -15px;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  padding: 0.5rem;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.options-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}

.option-item {
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.option-item:hover:not(.disabled) {
  transform: translateX(-8px);
}

.option-item.selected {
  border-color: #667eea;
}

.option-item.correct {
  border-color: #48bb78;
  background: rgba(72, 187, 120, 0.05);
}

.option-item.disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.option-content {
  padding: 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  transition: all 0.3s ease;
}

.option-item:not(.disabled):hover .option-content {
  border-color: #667eea;
  background: #f7fafc;
}

.option-item.selected .option-content {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.05);
}

.option-item.correct .option-content {
  border-color: #48bb78;
  background: rgba(72, 187, 120, 0.05);
}

.option-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.option-letter {
  width: 36px;
  height: 36px;
  background: #667eea;
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
}

.option-item.correct .option-letter {
  background: #48bb78;
}

.option-status {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-correct {
  color: #48bb78;
}

.status-wrong {
  color: #f56565;
}

.option-status svg {
  width: 20px;
  height: 20px;
}

.option-text {
  font-size: 1.1rem;
  color: #4a5568;
  line-height: 1.6;
  margin: 0;
}

.radio-input {
  position: absolute;
  opacity: 0;
}

/* Answer Actions */
.answer-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.submit-btn {
  width: 100%;
  max-width: 300px;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.submit-btn:disabled {
  background: #a0aec0;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.submit-btn svg {
  width: 20px;
  height: 20px;
}

.btn-loading .spinner {
  animation: spin 1s linear infinite;
}

.time-up-alert {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: rgba(245, 101, 101, 0.1);
  color: #f56565;
  border-radius: 12px;
  border: 1px solid rgba(245, 101, 101, 0.2);
  font-weight: 500;
}

.time-up-alert svg {
  width: 20px;
  height: 20px;
}

/* Message Container */
.message-container {
  margin-top: 2rem;
}

.message-card {
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
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
  width: 48px;
  height: 48px;
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
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.message-text {
  font-size: 1.1rem;
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.code-reveal {
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 2px dashed #667eea;
}

.code-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  text-align: center;
}

.code-label {
  font-size: 1rem;
  color: #718096;
  font-weight: 500;
}

.code-value {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f8fafc;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
}

.code-text {
  font-family: 'Courier New', monospace;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  letter-spacing: 2px;
  direction: ltr;
}

.copy-btn {
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.copy-btn:hover {
  background: #764ba2;
  transform: scale(1.05);
}

.copy-btn svg {
  width: 18px;
  height: 18px;
}

.copy-success {
  color: #48bb78;
  font-weight: 600;
  font-size: 0.9rem;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Responsive Design */
@media (max-width: 768px) {
  .competition-container {
    padding: 0 0.5rem 1.5rem;
  }
  
  .competition-header {
    padding: 2rem 1rem 1.5rem;
    border-radius: 0 0 20px 20px;
  }
  
  .main-title {
    font-size: 2rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .card-header {
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
  }
  
  .timer-container {
    align-items: center;
    width: 100%;
  }
  
  .timer-progress {
    width: 100%;
  }
  
  .competition-meta {
    flex-direction: column;
    gap: 1rem;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .message-card {
    flex-direction: column;
    padding: 1.5rem;
  }
  
  .code-value {
    flex-direction: column;
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
  .competition-title {
    font-size: 1.5rem;
  }
  
  .question-text {
    font-size: 1.1rem;
    padding: 1rem;
  }
  
  .option-content {
    padding: 1rem;
  }
  
  .option-text {
    font-size: 1rem;
  }
  
  .submit-btn {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
}
</style>