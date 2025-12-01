<template>
  <div class="page-container">
    <h1 class="page-title">مدیریت مسابقات</h1>

    <!-- ================== فرم ایجاد مسابقه جدید ================== -->
    <section class="card">
      <h2 class="section-title">ایجاد مسابقه جدید</h2>

      <div class="form-grid">
        <div class="form-group">
          <label>عنوان:</label>
          <input v-model="newComp.title" type="text" />
        </div>

        <div class="form-group">
          <label>توضیحات:</label>
          <input v-model="newComp.description" type="text" />
        </div>

        <div class="form-group">
          <label>Round Number:</label>
          <input v-model.number="newComp.roundNumber" type="number" min="1" />
        </div>

        <div class="form-group">
          <label>زمان شروع (ISO):</label>
          <input
            v-model="newComp.startTime"
            type="datetime-local"
            placeholder="yyyy-MM-ddTHH:mm"
          />
        </div>

        <div class="form-group">
          <label>زمان پایان (ISO):</label>
          <input
            v-model="newComp.endTime"
            type="datetime-local"
            placeholder="yyyy-MM-ddTHH:mm"
          />
        </div>

        <div class="form-group">
          <label>کد صحیح (اختیاری):</label>
          <input
            v-model="newComp.correctCode"
            type="text"
            placeholder="مثلاً WIN-2025"
          />
        </div>
      </div>

      <button class="btn-primary" @click="createCompetition" :disabled="creating">
        {{ creating ? "در حال ایجاد..." : "ایجاد مسابقه" }}
      </button>

      <p v-if="createMessage" class="status-message">{{ createMessage }}</p>
    </section>

    <!-- ================== لیست مسابقات ================== -->
    <section class="card">
      <div class="header-row">
        <h2 class="section-title">لیست مسابقات</h2>
        <button class="btn-secondary" @click="loadCompetitions" :disabled="loading">
          بروزرسانی لیست
        </button>
      </div>

      <div v-if="loading" class="status">در حال بارگذاری مسابقات...</div>
      <div v-if="error" class="status status-error">{{ error }}</div>

      <table v-if="competitions.length" class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>عنوان</th>
            <th>Round</th>
            <th>وضعیت</th>
            <th>شروع</th>
            <th>پایان</th>
            <th>کد صحیح</th>
            <th>تنظیم کد</th>
            <th>پایان مسابقه</th>
            <th>سؤال</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="comp in competitions"
            :key="comp.id"
            :class="{ selected: comp.id === selectedCompetitionId }"
          >
            <td>{{ comp.id }}</td>
            <td>{{ comp.title }}</td>
            <td>{{ comp.roundNumber }}</td>
            <td>{{ comp.status }}</td>
            <td>{{ formatDateTime(comp.startTime) }}</td>
            <td>{{ formatDateTime(comp.endTime) }}</td>

            <!-- کد صحیح فعلی -->
            <td>
              {{ comp.correctCode || "-" }}
            </td>

            <!-- تنظیم کد جدید -->
            <td>
              <input
                v-model="codeInputs[comp.id]"
                type="text"
                class="small-input"
                placeholder="کد جدید"
              />
              <button
                class="btn-small"
                @click="saveCode(comp)"
                :disabled="savingCodeId === comp.id"
              >
                ذخیره
              </button>
            </td>

            <!-- پایان مسابقه -->
            <td>
              <button
                class="btn-small"
                @click="finishCompetition(comp)"
                :disabled="comp.status === 'FINISHED' || finishingId === comp.id"
              >
                پایان مسابقه
              </button>
            </td>

            <!-- مدیریت سؤال -->
            <td>
              <button class="btn-small" @click="selectCompetition(comp)">
                مدیریت سؤال
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else class="status">هنوز مسابقه‌ای ثبت نشده است.</p>
    </section>

    <!-- ================== مدیریت سؤال مسابقه انتخاب شده ================== -->
    <section v-if="selectedCompetitionId" class="card">
      <h2 class="section-title">
        مدیریت سؤال مسابقه شماره {{ selectedCompetitionId }}
      </h2>

      <div v-if="qLoading" class="status">در حال دریافت/بارگذاری سؤال...</div>
      <div v-if="qError" class="status status-error">{{ qError }}</div>
      <div v-if="qMessage" class="status status-ok">{{ qMessage }}</div>

      <div class="form-grid">
        <div class="form-group full">
          <label>متن سؤال:</label>
          <textarea v-model="qForm.questionText" rows="3"></textarea>
        </div>

        <div class="form-group">
          <label>گزینه A:</label>
          <input v-model="qForm.optionA" type="text" />
        </div>

        <div class="form-group">
          <label>گزینه B:</label>
          <input v-model="qForm.optionB" type="text" />
        </div>

        <div class="form-group">
          <label>گزینه C:</label>
          <input v-model="qForm.optionC" type="text" />
        </div>

        <div class="form-group">
          <label>گزینه D:</label>
          <input v-model="qForm.optionD" type="text" />
        </div>

        <div class="form-group full">
          <label>گزینه صحیح:</label>
          <div class="radio-row">
            <label>
              <input
                type="radio"
                value="A"
                v-model="qForm.correctOption"
              />
              A
            </label>
            <label>
              <input
                type="radio"
                value="B"
                v-model="qForm.correctOption"
              />
              B
            </label>
            <label>
              <input
                type="radio"
                value="C"
                v-model="qForm.correctOption"
              />
              C
            </label>
            <label>
              <input
                type="radio"
                value="D"
                v-model="qForm.correctOption"
              />
              D
            </label>
          </div>
        </div>
      </div>

      <button class="btn-primary" @click="saveQuestion" :disabled="qSaving">
        {{ qSaving ? "در حال ذخیره..." : "ذخیره سؤال" }}
      </button>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useAuthStore } from "../../store/authStore";

const authStore = useAuthStore();
const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:31000/api";

// ------------------ state مسابقات ------------------
const competitions = ref([]);
const loading = ref(false);
const error = ref("");

const creating = ref(false);
const createMessage = ref("");

const newComp = reactive({
  title: "",
  description: "",
  roundNumber: 1,
  startTime: "",
  endTime: "",
  correctCode: "",
});

const codeInputs = reactive({});
const savingCodeId = ref(null);
const finishingId = ref(null);

// ------------------ state سؤال ------------------
const selectedCompetitionId = ref(null);
const qForm = reactive({
  questionText: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  correctOption: "A",
});

const qLoading = ref(false);
const qSaving = ref(false);
const qError = ref("");
const qMessage = ref("");

// -------------- helpers --------------
function authHeaders(json = true) {
  const h = {};
  if (json) h["Content-Type"] = "application/json";
  if (authStore.token) h["Authorization"] = `Bearer ${authStore.token}`;
  return h;
}

function formatDateTime(dt) {
  if (!dt) return "";
  // بک‌اند معمولاً ISO می‌دهد، همین را کوتاه می‌کنیم
  return String(dt).replace("T", " ").substring(0, 16);
}

// -------------- load competitions --------------
async function loadCompetitions() {
  loading.value = true;
  error.value = "";
  try {
    const res = await fetch(`${API_BASE}/admin/competitions`, {
      headers: authHeaders(false),
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || res.statusText);
    }
    const data = await res.json();
    competitions.value = data || [];

    // فیلدهای کد ورودی را از روی لیست پر می‌کنیم
    competitions.value.forEach((c) => {
      codeInputs[c.id] = c.correctCode || "";
    });
  } catch (e) {
    console.error(e);
    error.value = "خطا در دریافت لیست مسابقات.";
  } finally {
    loading.value = false;
  }
}

// -------------- create competition --------------
async function createCompetition() {
  if (!newComp.title) {
    createMessage.value = "عنوان مسابقه الزامی است.";
    return;
  }
  creating.value = true;
  createMessage.value = "";
  try {
    const body = {
      title: newComp.title,
      description: newComp.description,
      roundNumber: newComp.roundNumber || 1,
      startTime: newComp.startTime || null,
      endTime: newComp.endTime || null,
      status: "RUNNING",
      correctCode: newComp.correctCode || null,
    };
    const res = await fetch(`${API_BASE}/admin/competitions`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || res.statusText);
    }
    await res.json();
    createMessage.value = "مسابقه با موفقیت ایجاد شد.";
    // فرم را خالی کن
    newComp.title = "";
    newComp.description = "";
    newComp.roundNumber = 1;
    newComp.startTime = "";
    newComp.endTime = "";
    newComp.correctCode = "";

    await loadCompetitions();
  } catch (e) {
    console.error(e);
    createMessage.value =
      "خطا در ایجاد مسابقه: " + (e.message || "نامشخص");
  } finally {
    creating.value = false;
  }
}

// -------------- save correct code --------------
async function saveCode(comp) {
  const code = (codeInputs[comp.id] || "").trim();
  if (!code) {
    alert("لطفاً یک کد وارد کنید.");
    return;
  }
  savingCodeId.value = comp.id;
  try {
    const body = { correctCode: code };
    const res = await fetch(
      `${API_BASE}/admin/competitions/${comp.id}/correct-code`,
      {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || res.statusText);
    }
    // در لیست هم مقدار را به‌روز می‌کنیم
    comp.correctCode = code;
  } catch (e) {
    console.error(e);
    alert("خطا در ذخیره کد: " + (e.message || ""));
  } finally {
    savingCodeId.value = null;
  }
}

// -------------- finish competition --------------
async function finishCompetition(comp) {
  if (!confirm("آیا از پایان دادن به این مسابقه مطمئن هستید؟")) return;

  finishingId.value = comp.id;
  try {
    const body = { status: "FINISHED" };
    const res = await fetch(
      `${API_BASE}/admin/competitions/${comp.id}/status`,
      {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || res.statusText);
    }
    comp.status = "FINISHED";
  } catch (e) {
    console.error(e);
    alert("خطا در به‌روزرسانی وضعیت: " + (e.message || ""));
  } finally {
    finishingId.value = null;
  }
}

// -------------- select competition & load question --------------
function resetQuestionForm() {
  qForm.questionText = "";
  qForm.optionA = "";
  qForm.optionB = "";
  qForm.optionC = "";
  qForm.optionD = "";
  qForm.correctOption = "A";
}

async function selectCompetition(comp) {
  selectedCompetitionId.value = comp.id;
  qError.value = "";
  qMessage.value = "";
  resetQuestionForm();
  await loadQuestion(comp.id);
}

async function loadQuestion(compId) {
  qLoading.value = true;
  qError.value = "";
  try {
    const res = await fetch(
      `${API_BASE}/admin/competitions/${compId}/question`,
      {
        headers: authHeaders(false),
      }
    );
    if (!res.ok) {
      // اگر 404 بود یعنی هنوز سؤالی ثبت نشده → فرم خالی بماند
      if (res.status === 404) {
        qMessage.value = "برای این مسابقه هنوز سؤالی ثبت نشده است.";
        return;
      }
      const txt = await res.text();
      throw new Error(txt || res.statusText);
    }
    const data = await res.json();
    qForm.questionText = data.questionText || "";
    qForm.optionA = data.optionA || "";
    qForm.optionB = data.optionB || "";
    qForm.optionC = data.optionC || "";
    qForm.optionD = data.optionD || "";
    // correctOption را از بک‌اند اگر داری می‌توانی بفرستی؛ فعلاً اگر نبود A بماند
  } catch (e) {
    console.error(e);
    qError.value =
      "خطا در دریافت سؤال: " + (e.message || "نامشخص");
  } finally {
    qLoading.value = false;
  }
}

// -------------- save question --------------
async function saveQuestion() {
  if (!selectedCompetitionId.value) return;

  if (!qForm.questionText || !qForm.optionA || !qForm.optionB) {
    qError.value = "متن سؤال و حداقل دو گزینه الزامی است.";
    return;
  }
  if (!qForm.correctOption) {
    qError.value = "لطفاً گزینه صحیح را انتخاب کنید.";
    return;
  }

  qSaving.value = true;
  qError.value = "";
  qMessage.value = "";
  try {
    const body = {
      questionText: qForm.questionText,
      optionA: qForm.optionA,
      optionB: qForm.optionB,
      optionC: qForm.optionC,
      optionD: qForm.optionD,
      correctOption: qForm.correctOption,
    };
    const res = await fetch(
      `${API_BASE}/admin/competitions/${selectedCompetitionId.value}/question`,
      {
        method: "PUT",          // 🔁 اینجا از POST به PUT تغییر کرد (اصلاح شد)
        headers: authHeaders(),
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || res.statusText);
    }
    await res.json();
    qMessage.value = "سؤال با موفقیت ذخیره شد.";
  } catch (e) {
    console.error(e);
    qError.value =
      "خطا در ذخیره سؤال: " + (e.message || "نامشخص");
  } finally {
    qSaving.value = false;
  }
}

onMounted(() => {
  loadCompetitions();
});
</script>

<style scoped>
.page-container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.page-title {
  text-align: center;
  margin-bottom: 2.5rem;
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #2d3748;
  border-right: 4px solid #667eea;
  padding-right: 1rem;
}

.card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.5);
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group.full {
  grid-column: 1 / -1;
}

.form-group label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.25rem;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.radio-row {
  display: flex;
  gap: 2rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
}

.radio-row label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.radio-row label:hover {
  background: #f7fafc;
}

.radio-row input[type="radio"] {
  transform: scale(1.2);
  accent-color: #667eea;
}

/* Table Styles */
.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 1.5rem;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.table th,
.table td {
  border: none;
  padding: 1rem 0.75rem;
  text-align: center;
  font-size: 0.9rem;
}

.table thead {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.table th {
  color: white;
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.table tbody tr {
  transition: all 0.3s ease;
  border-bottom: 1px solid #f1f5f9;
}

.table tbody tr:hover {
  background: #f8fafc;
  transform: translateX(4px);
}

.table tbody tr.selected {
  background: #eef2ff;
  border-left: 4px solid #667eea;
}

/* Button Styles */
.btn-primary,
.btn-secondary,
.btn-small {
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
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
  background: #f7fafc;
  color: #4a5568;
  border: 2px solid #e2e8f0;
}

.btn-secondary:hover:not(:disabled) {
  background: #edf2f7;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.btn-small {
  background: #f1f5f9;
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  margin: 0.25rem;
}

.btn-small:hover:not(:disabled) {
  background: #e2e8f0;
  transform: translateY(-1px);
}

.small-input {
  width: 120px;
  padding: 0.4rem 0.6rem;
  font-size: 0.8rem;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  text-align: center;
}

/* Status Messages */
.status {
  margin-top: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-weight: 500;
  text-align: center;
  backdrop-filter: blur(10px);
}

.status-error {
  color: #dc2626;
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.2);
}

.status-ok {
  color: #059669;
  background: rgba(5, 150, 105, 0.1);
  border: 1px solid rgba(5, 150, 105, 0.2);
}

.status-message {
  margin-top: 1rem;
  color: #059669;
  padding: 1rem;
  background: rgba(5, 150, 105, 0.1);
  border-radius: 8px;
  border-right: 4px solid #059669;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .table {
    display: block;
    overflow-x: auto;
  }
}

@media (max-width: 768px) {
  .page-container {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .header-row {
    flex-direction: column;
    align-items: stretch;
  }
  
  .card {
    padding: 1.5rem;
  }
  
  .table th,
  .table td {
    padding: 0.75rem 0.5rem;
    font-size: 0.8rem;
  }
}

/* Loading Animation */
button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
}

button:disabled::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -8px 0 0 -8px;
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
