<!-- src/views/ProfileView.vue -->
<template>
  <div class="page">
    <main class="content">
      <h2 class="title">پروفایل من</h2>

      <!-- پیام خطای گرفتن پروفایل -->
      <p v-if="profileError" class="error">{{ profileError }}</p>
      <p v-else-if="loadingProfile" class="info">در حال گرفتن اطلاعات پروفایل...</p>
      <p v-else class="info">گرفتن اطلاعات پروفایل موفق بود.</p>

      <section class="forms">
        <!-- تغییر رمز عبور -->
        <div class="card">
          <h3>تغییر رمز عبور</h3>

          <label>
            رمز فعلی:
            <input v-model="currentPassword" type="password" />
          </label>

          <label>
            رمز جدید:
            <input v-model="newPassword" type="password" />
          </label>

          <label>
            تکرار رمز جدید:
            <input v-model="confirmPassword" type="password" />
          </label>

          <button @click="changePassword" :disabled="changingPassword">
            {{ changingPassword ? "در حال تغییر..." : "تغییر رمز" }}
          </button>

          <p v-if="passwordMessage" class="success">{{ passwordMessage }}</p>
          <p v-if="passwordError" class="error">{{ passwordError }}</p>
        </div>

        <!-- تغییر نام -->
        <div class="card">
          <h3>تغییر نام</h3>

          <label>
            نام کامل جدید:
            <input v-model="newFullName" type="text" />
          </label>

          <button @click="saveName" :disabled="updatingName">
            {{ updatingName ? "در حال ذخیره..." : "ذخیره تغییر نام" }}
          </button>

          <p v-if="nameMessage" class="success">{{ nameMessage }}</p>
          <p v-if="nameError" class="error">{{ nameError }}</p>
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
    const data = await apiPut("/user/profile/name", body, authStore.token);

    nameMessage.value = data.message || "نام با موفقیت تغییر کرد.";
    if (profile.value) {
      profile.value.fullName = newFullName.value.trim();
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
      oldPassword: currentPassword.value,
      newPassword: newPassword.value,
    };
    const data = await apiPut("/user/profile/password", body, authStore.token);

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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.info {
  text-align: center;
  padding: 1.5rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
}

.error {
  color: #ff6b6b;
  text-align: center;
  padding: 1.5rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  font-weight: 500;
  background: rgba(255, 107, 107, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 107, 107, 0.3);
}

.forms {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  align-items: start;
}

.card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.5);
}

.card h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  border-bottom: 3px solid #667eea;
  padding-bottom: 0.75rem;
}

label {
  display: block;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #4a5568;
}

input {
  width: 100%;
  padding: 1rem 1.25rem;
  margin-top: 0.5rem;
  box-sizing: border-box;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

input:hover {
  border-color: #cbd5e0;
}

button {
  margin-top: 1rem;
  padding: 1rem 2rem;
  cursor: pointer;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
}

button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

button:active:not(:disabled) {
  transform: translateY(-1px);
}

button:disabled {
  background: #a0aec0;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.success {
  color: #059669;
  margin-top: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-weight: 500;
  background: rgba(5, 150, 105, 0.1);
  border: 1px solid rgba(5, 150, 105, 0.2);
}

@media (max-width: 768px) {
  .content {
    padding: 1rem;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .forms {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .card {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .page {
    padding: 1rem 0.5rem;
  }
  
  .content {
    padding: 1rem 0.5rem;
  }
  
  .title {
    font-size: 1.75rem;
  }
  
  .card {
    padding: 1.25rem;
  }
  
  .forms {
    grid-template-columns: 1fr;
  }
}
</style>
