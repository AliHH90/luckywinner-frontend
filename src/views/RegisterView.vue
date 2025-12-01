<template>
  <div class="auth-card">
    <h2>ثبت‌نام</h2>

    <form @submit.prevent="handleRegister">
      <label>
        نام کامل:
        <input v-model="fullName" />
      </label>

      <label>
        شماره تماس:
        <input v-model="phone" placeholder="مثلاً 0700000000" />
      </label>

      <label>
        رمز عبور:
        <input v-model="password" type="password" />
      </label>

      <button type="submit" :disabled="loading">
        {{ loading ? "در حال ثبت‌نام..." : "ثبت‌نام" }}
      </button>

      <p class="error" v-if="error">{{ error }}</p>

      <p class="switch">
        قبلاً حساب دارید؟
        <RouterLink to="/login">ورود</RouterLink>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/authStore";

const router = useRouter();
const authStore = useAuthStore();
const { loading, error } = storeToRefs(authStore);

const fullName = ref("");
const phone = ref("");
const password = ref("");

async function handleRegister() {
  await authStore.register(phone.value, password.value, fullName.value);

  if (!authStore.error) {
    router.push({ name: "competition" });
  }
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

/* ========= AUTH CARD ========= */
.auth-card {
  max-width: 420px;
  margin: 80px auto;
  padding: 48px 40px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  border: 1px solid var(--glass-border);
  position: relative;
  overflow: hidden;
  animation: cardSlideIn 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.auth-card::before {
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
  animation: shimmer 6s ease-in-out infinite;
  pointer-events: none;
}

@keyframes cardSlideIn {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes shimmer {
  0%, 100% { transform: translateX(-30%) translateY(-30%) rotate(0deg); }
  50% { transform: translateX(30%) translateY(30%) rotate(180deg); }
}

/* ========= HEADING ========= */
.auth-card h2 {
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.2rem;
  font-weight: 800;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  padding-bottom: 16px;
}

.auth-card h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 50%;
  transform: translateX(50%);
  width: 80px;
  height: 4px;
  background: var(--primary-gradient);
  border-radius: 2px;
  animation: lineExpand 1s ease-out;
}

@keyframes lineExpand {
  from { width: 0; opacity: 0; }
  to { width: 80px; opacity: 1; }
}

/* ========= FORM STYLES ========= */
form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* ========= LABEL STYLES ========= */
label {
  display: block;
  margin-bottom: 0;
  position: relative;
}

label::before {
  content: attr(data-label);
  position: absolute;
  top: -8px;
  right: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  padding: 0 8px;
  z-index: 2;
}

/* ========= INPUT STYLES ========= */
input {
  width: 100%;
  padding: 14px 20px;
  margin-top: 8px;
  box-sizing: border-box;
  border: 2px solid #e8eeff;
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  position: relative;
  z-index: 1;
}

input::placeholder {
  color: #a0aec0;
  font-weight: 400;
}

input:focus {
  outline: none;
  border-color: #667eea;
  background: rgba(255, 255, 255, 1);
  box-shadow: 
    0 8px 30px rgba(102, 126, 234, 0.2),
    0 0 0 4px rgba(102, 126, 234, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transform: translateY(-2px);
}

input:hover {
  border-color: #c3cfe2;
  transform: translateY(-1px);
}

/* ========= BUTTON STYLES ========= */
button {
  width: 100%;
  padding: 14px 24px;
  margin-top: 12px;
  background: var(--primary-gradient);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 8px 30px rgba(102, 126, 234, 0.4),
    0 2px 8px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
}

button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.3), 
    transparent);
  transition: left 0.6s ease;
}

button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 
    0 15px 40px rgba(102, 126, 234, 0.6),
    0 4px 15px rgba(102, 126, 234, 0.4);
}

button:hover:not(:disabled)::before {
  left: 100%;
}

button:active:not(:disabled) {
  transform: translateY(-1px);
}

button:disabled {
  background: linear-gradient(135deg, #a0aec0 0%, #718096 100%);
  cursor: not-allowed;
  transform: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
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

/* ========= ERROR MESSAGE ========= */
.error {
  color: #e53e3e;
  margin-top: 20px;
  padding: 16px 20px;
  border-radius: 12px;
  font-weight: 600;
  text-align: center;
  background: rgba(229, 62, 62, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(229, 62, 62, 0.2);
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

/* ========= SWITCH LINK ========= */
.switch {
  margin-top: 32px;
  text-align: center;
  color: #e3fcff;
  font-weight: 500;
}

.switch a {
  color: #00f2ffa9;
  text-decoration: none;
  font-weight: 700;
  position: relative;
  padding: 4px 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.switch a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  right: 0;
  width: 0;
  height: 2px;
  background: var(--primary-gradient);
  transition: width 0.3s ease;
  border-radius: 1px;
}

.switch a:hover {
  color: #764ba2;
  background: rgba(102, 126, 234, 0.1);
}

.switch a:hover::after {
  width: 100%;
}

/* ========= FLOATING LABELS ENHANCEMENT ========= */
label {
  position: relative;
}

label span {
  position: absolute;
  top: -8px;
  right: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  background: white;
  padding: 0 8px;
  color: #667eea;
  z-index: 2;
}

/* ========= RESPONSIVE DESIGN ========= */
@media (max-width: 768px) {
  .auth-card {
    margin: 40px 20px;
    padding: 40px 28px;
    border-radius: 20px;
  }
  
  .auth-card h2 {
    font-size: 2rem;
    margin-bottom: 32px;
  }
  
  input {
    padding: 14px 18px;
  }
  
  button {
    padding: 16px 20px;
  }
}

@media (max-width: 480px) {
  .auth-card {
    margin: 20px 16px;
    padding: 32px 24px;
    border-radius: 16px;
  }
  
  .auth-card h2 {
    font-size: 1.8rem;
    margin-bottom: 28px;
  }
  
  form {
    gap: 24px;
  }
  
  input {
    padding: 12px 16px;
    font-size: 0.95rem;
  }
  
  button {
    padding: 14px 18px;
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

input:focus-visible,
button:focus-visible {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

/* ========= DARK MODE SUPPORT ========= */
@media (prefers-color-scheme: dark) {
  .auth-card {
    background: rgba(26, 32, 44, 0.95);
    color: white;
  }
  
  input {
    background: rgba(45, 55, 72, 0.9);
    border-color: #4a5568;
    color: white;
  }
  
  input:focus {
    background: rgba(45, 55, 72, 1);
    border-color: #667eea;
  }
  
  label span {
    background: #1a202c;
  }
}

/* ========= SUCCESS STATE ========= */
.auth-card.success {
  border-color: rgba(72, 187, 120, 0.3);
  box-shadow: 0 25px 50px rgba(72, 187, 120, 0.15);
}

.auth-card.success h2 {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  -webkit-background-clip: text;
  background-clip: text;
}
</style>