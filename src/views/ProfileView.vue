<!-- src/views/ProfileView.vue -->
<template>
  <div class="page">
    <main class="content">
      <!-- هدر صفحه -->
      <div class="header">
        <h2 class="title">
          <svg class="icon user-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          پروفایل من
        </h2>
        
        <!-- نمایش اطلاعات کاربر -->
        <div class="user-info" v-if="profile && !loadingProfile">
          <div class="avatar">
            {{ getInitials(profile.fullName) }}
          </div>
          <div class="user-details">
            <h3>{{ profile.fullName }}</h3>
            <p>{{ profile.email || 'کاربر محترم' }}</p>
          </div>
        </div>
      </div>

      <!-- پیام‌های وضعیت -->
      <div class="status-messages">
        <p v-if="profileError" class="status error">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          {{ profileError }}
        </p>
        <p v-else-if="loadingProfile" class="status loading">
          <svg class="spinner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.3"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
          </svg>
          در حال گرفتن اطلاعات پروفایل...
        </p>
        <p v-else class="status success">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          گرفتن اطلاعات پروفایل موفق بود
        </p>
      </div>

      <!-- فرم‌ها -->
      <section class="forms">
        <!-- تغییر رمز عبور -->
        <div class="card password-card">
          <div class="card-header">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <h3>تغییر رمز عبور</h3>
          </div>

          <div class="card-body">
            <div class="input-group">
              <label>
                <span class="label-text">
                  <svg class="icon small" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                  </svg>
                  رمز فعلی:
                </span>
                <input v-model="currentPassword" type="password" placeholder="رمز عبور فعلی را وارد کنید" />
              </label>
            </div>

            <div class="input-group">
              <label>
                <span class="label-text">
                  <svg class="icon small" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  رمز جدید:
                </span>
                <input v-model="newPassword" type="password" placeholder="رمز عبور جدید را وارد کنید" />
              </label>
            </div>

            <div class="input-group">
              <label>
                <span class="label-text">
                  <svg class="icon small" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="M9 12l2 2 4-4"></path>
                  </svg>
                  تکرار رمز جدید:
                </span>
                <input v-model="confirmPassword" type="password" placeholder="رمز عبور جدید را تکرار کنید" />
              </label>
            </div>

            <button 
              @click="changePassword" 
              :disabled="changingPassword"
              class="btn btn-primary"
            >
              <span v-if="changingPassword" class="btn-spinner"></span>
              <span>{{ changingPassword ? "در حال تغییر..." : "تغییر رمز عبور" }}</span>
              <svg v-if="!changingPassword" class="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </button>

            <div class="card-messages">
              <p v-if="passwordMessage" class="success-message">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                {{ passwordMessage }}
              </p>
              <p v-if="passwordError" class="error-message">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                {{ passwordError }}
              </p>
            </div>
          </div>
        </div>

        <!-- تغییر نام -->
        <div class="card name-card">
          <div class="card-header">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <h3>تغییر نام</h3>
          </div>

          <div class="card-body">
            <div class="input-group">
              <label>
                <span class="label-text">
                  <svg class="icon small" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  نام کامل جدید:
                </span>
                <input 
                  v-model="newFullName" 
                  type="text" 
                  placeholder="نام و نام خانوادگی جدید خود را وارد کنید"
                  :class="{ 'has-value': newFullName.trim() }"
                />
              </label>
            </div>

            <button 
              @click="saveName" 
              :disabled="updatingName"
              class="btn btn-secondary"
            >
              <span v-if="updatingName" class="btn-spinner"></span>
              <span>{{ updatingName ? "در حال ذخیره..." : "ذخیره تغییر نام" }}</span>
              <svg v-if="!updatingName" class="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
            </button>

            <div class="card-messages">
              <p v-if="nameMessage" class="success-message">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                {{ nameMessage }}
              </p>
              <p v-if="nameError" class="error-message">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                {{ nameError }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../store/authStore";
import { apiGet, apiPut } from "../Services/apiClient";

const authStore = useAuthStore();

// وضعیت پروفایل
const profile = ref(null);
const loadingProfile = ref(false);
const profileError = ref("");

// تغییر نام
const newFullName = ref("");
const updatingName = ref(false);
const nameMessage = ref("");
const nameError = ref("");

// تغییر رمز
const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const changingPassword = ref(false);
const passwordMessage = ref("");
const passwordError = ref("");

// گرفتن اطلاعات کاربر
const loadProfile = async () => {
  loadingProfile.value = true;
  profileError.value = "";

  try {
    const data = await apiGet("/me", authStore.token);
    profile.value = data;
    newFullName.value = data.fullName || "";
  } catch (e) {
    profileError.value = e.message || "خطا در گرفتن پروفایل.";
  } finally {
    loadingProfile.value = false;
  }
};

// گرفتن حروف اول نام برای آواتار
const getInitials = (fullName) => {
  if (!fullName) return "U";
  return fullName
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

onMounted(loadProfile);

// ذخیره نام جدید
const saveName = async () => {
  if (!newFullName.value.trim()) {
    nameError.value = "نام نمی‌تواند خالی باشد.";
    nameMessage.value = "";
    return;
  }

  nameError.value = "";
  nameMessage.value = "";
  updatingName.value = true;

  try {
    const body = { fullName: newFullName.value.trim() };
    const data = await apiPut("/me/profile", body, authStore.token);

    nameMessage.value = data.message || "نام با موفقیت تغییر کرد.";
    if (profile.value) {
      profile.value.fullName = newFullName.value.trim();
    }

    if (authStore.user) {
      authStore.user.fullName = newFullName.value.trim();
      localStorage.setItem("user", JSON.stringify(authStore.user));
    }

  } catch (e) {
    nameError.value = e.message || "خطا در تغییر نام.";
  } finally {
    updatingName.value = false;
  }
};

// تغییر رمز عبور
const changePassword = async () => {
  if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
    passwordError.value = "همه فیلدها الزامی است.";
    passwordMessage.value = "";
    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    passwordError.value = "رمز جدید و تکرار آن یکسان نیست.";
    passwordMessage.value = "";
    return;
  }

  passwordError.value = "";
  passwordMessage.value = "";
  changingPassword.value = true;

  try {
    const body = {
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
    };
    const data = await apiPut("/me/password", body, authStore.token);

    passwordMessage.value = data.message || "رمز عبور با موفقیت تغییر کرد.";
    currentPassword.value = "";
    newPassword.value = "";
    confirmPassword.value = "";
  } catch (e) {
    passwordError.value = e.message || "خطا در تغییر رمز عبور.";
  } finally {
    changingPassword.value = false;
  }
};
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem 1rem;
  direction: rtl;
  font-family: 'Vazirmatn', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  animation: fadeIn 0.6s ease-out;
}

/* هدر صفحه */
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
}

.title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  color: #2d3748;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
}

.title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  right: 0;
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
}

.user-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: #667eea;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(102, 126, 234, 0.1);
  animation: slideUp 0.5s ease-out;
}

.avatar {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.user-details h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #2d3748;
  font-weight: 700;
}

.user-details p {
  margin: 0.5rem 0 0;
  color: #718096;
  font-size: 1rem;
}

/* پیام‌های وضعیت */
.status-messages {
  margin-bottom: 3rem;
}

.status {
  padding: 1.25rem 2rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 1rem;
  backdrop-filter: blur(10px);
  animation: slideUp 0.4s ease-out;
}

.status.success {
  background: linear-gradient(135deg, rgba(72, 187, 120, 0.15) 0%, rgba(72, 187, 120, 0.05) 100%);
  color: #2f855a;
  border: 1px solid rgba(72, 187, 120, 0.2);
}

.status.error {
  background: linear-gradient(135deg, rgba(245, 101, 101, 0.15) 0%, rgba(245, 101, 101, 0.05) 100%);
  color: #c53030;
  border: 1px solid rgba(245, 101, 101, 0.2);
}

.status.loading {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(102, 126, 234, 0.05) 100%);
  color: #4c51bf;
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.spinner {
  width: 1.5rem;
  height: 1.5rem;
  animation: spin 1s linear infinite;
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
}

.icon.small {
  width: 1.25rem;
  height: 1.25rem;
}

/* فرم‌ها */
.forms {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 2.5rem;
  align-items: start;
}

@media (max-width: 1100px) {
  .forms {
    grid-template-columns: 1fr;
    max-width: 600px;
    margin: 0 auto;
  }
}

.card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
  border: 1px solid rgba(102, 126, 234, 0.1);
  animation: cardAppear 0.6s ease-out backwards;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(102, 126, 234, 0.1);
}

.card:nth-child(1) {
  animation-delay: 0.1s;
}

.card:nth-child(2) {
  animation-delay: 0.2s;
}

.card-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card-header h3 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.card-header .icon {
  width: 1.75rem;
  height: 1.75rem;
  color: white;
}

.card-body {
  padding: 2rem;
}

/* گروه‌های ورودی */
.input-group {
  margin-bottom: 1.75rem;
}

.input-group:last-of-type {
  margin-bottom: 2.5rem;
}

label {
  display: block;
  position: relative;
}

.label-text {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  color: #4a5568;
}

input {
  width: 100%;
  padding: 1.125rem 1.5rem;
  box-sizing: border-box;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  background: #f8fafc;
  color: #2d3748;
  outline: none;
}

input::placeholder {
  color: #a0aec0;
}

input:focus {
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

input.has-value {
  border-color: #48bb78;
  background: rgba(72, 187, 120, 0.02);
}

/* دکمه‌ها */
.btn {
  margin-top: 1.5rem;
  padding: 1.125rem 2rem;
  cursor: pointer;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;
  font-family: inherit;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.btn:hover::before {
  opacity: 1;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
  box-shadow: 0 8px 25px rgba(66, 153, 225, 0.3);
}

.btn-secondary:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(66, 153, 225, 0.4);
}

.btn:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-spinner {
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* پیام‌های کارت */
.card-messages {
  margin-top: 1.5rem;
}

.success-message, .error-message {
  padding: 1rem 1.5rem;
  border-radius: 10px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0.75rem 0;
  animation: slideIn 0.4s ease-out;
}

.success-message {
  background: linear-gradient(135deg, rgba(72, 187, 120, 0.1) 0%, rgba(72, 187, 120, 0.05) 100%);
  color: #2f855a;
  border: 1px solid rgba(72, 187, 120, 0.2);
}

.error-message {
  background: linear-gradient(135deg, rgba(245, 101, 101, 0.1) 0%, rgba(245, 101, 101, 0.05) 100%);
  color: #c53030;
  border: 1px solid rgba(245, 101, 101, 0.2);
}

/* انیمیشن‌ها */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes cardAppear {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* رسپانسیو */
@media (max-width: 768px) {
  .content {
    padding: 1.5rem;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .forms {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .card {
    padding: 0;
  }
  
  .user-info {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
  }
  
  .avatar {
    width: 60px;
    height: 60px;
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .page {
    padding: 1rem;
  }
  
  .content {
    padding: 1rem;
  }
  
  .title {
    font-size: 1.75rem;
  }
  
  .title::after {
    width: 80px;
  }
  
  .card-body {
    padding: 1.5rem;
  }
  
  .card-header {
    padding: 1.25rem 1.5rem;
  }
  
  .btn {
    padding: 1rem 1.5rem;
    font-size: 1rem;
  }
  
  input {
    padding: 1rem 1.25rem;
  }
}
</style>