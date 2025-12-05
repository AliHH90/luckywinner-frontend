<template>
  <div class="admin-container">
    <!-- Header Section -->
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">
          <span class="title-icon">🏆</span>
          مدیریت مسابقات
        </h1>
        <p class="page-subtitle">ایجاد، ویرایش و مدیریت مسابقات سیستم</p>
      </div>
      
      <div class="header-stats">
        <div class="stat-item">
          <div class="stat-value">{{ stats.totalCompetitions }}</div>
          <div class="stat-label">مسابقات کل</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ stats.activeCompetitions }}</div>
          <div class="stat-label">فعال</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ stats.finishedCompetitions }}</div>
          <div class="stat-label">پایان یافته</div>
        </div>
      </div>
    </header>

    <!-- Create New Competition -->
    <section class="create-section">
      <div class="section-header">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="section-icon">
          <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clip-rule="evenodd" />
        </svg>
        <h2 class="section-title">ایجاد مسابقه جدید</h2>
      </div>
      
      <div class="create-card">
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">
              <span class="label-text">عنوان مسابقه</span>
              <span class="label-required">*</span>
            </label>
            <input 
              v-model="newComp.title" 
              type="text" 
              class="form-input"
              placeholder="عنوان جذاب برای مسابقه..."
            />
            <div class="form-hint">حداکثر 100 کاراکتر</div>
          </div>
          
          <div class="form-group">
            <label class="form-label">توضیحات</label>
            <input 
              v-model="newComp.description" 
              type="text" 
              class="form-input"
              placeholder="توضیح مختصر درباره مسابقه..."
            />
          </div>
          
          <div class="form-group">
            <label class="form-label">دوره (Round)</label>
            <input 
              v-model.number="newComp.roundNumber" 
              type="number" 
              min="1" 
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label class="form-label">
              <span class="label-text">کد صحیح</span>
              <span class="label-optional">(اختیاری)</span>
            </label>
            <input 
              v-model="newComp.correctCode" 
              type="text" 
              class="form-input"
              placeholder="مثال: WIN-2025"
            />
          </div>
          
          <div class="form-group">
            <label class="form-label">
              <span class="label-text">زمان شروع</span>
            </label>
            <div class="datetime-input">
              <input 
                v-model="newComp.startTime" 
                type="datetime-local" 
                class="form-input"
              />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="datetime-icon">
                <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">
              <span class="label-text">زمان پایان</span>
            </label>
            <div class="datetime-input">
              <input 
                v-model="newComp.endTime" 
                type="datetime-local" 
                class="form-input"
              />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="datetime-icon">
                <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="form-actions">
          <button 
            @click="createCompetition" 
            :disabled="creating"
            class="btn btn-primary"
          >
            <svg v-if="creating" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="spinner">
              <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clip-rule="evenodd" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="btn-icon">
              <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clip-rule="evenodd" />
            </svg>
            {{ creating ? "در حال ایجاد..." : "ایجاد مسابقه جدید" }}
          </button>
        </div>
        
        <div v-if="createMessage" class="status-message success">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
          </svg>
          {{ createMessage }}
        </div>
      </div>
    </section>

    <!-- Competitions List -->
    <section class="list-section">
      <div class="section-header">
        <div class="header-title">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="section-icon">
            <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clip-rule="evenodd" />
            <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zm9.586 4.594a.75.75 0 00-1.172-.938l-2.476 3.096-.634-.682a.75.75 0 00-1.06 1.06l1.25 1.25a.75.75 0 001.116-.062l3-3.75z" clip-rule="evenodd" />
          </svg>
          <h2 class="section-title">لیست مسابقات</h2>
          <span class="count-badge">{{ competitions.length }} مسابقه</span>
        </div>
        
        <button 
          @click="loadCompetitions" 
          :disabled="loading"
          class="btn btn-secondary"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="btn-icon">
            <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clip-rule="evenodd" />
          </svg>
          بروزرسانی لیست
        </button>
      </div>
      
      <!-- Status Messages -->
      <div class="status-container">
        <div v-if="loading" class="status-message loading">
          <div class="spinner"></div>
          <span>در حال بارگذاری مسابقات...</span>
        </div>
        <div v-if="error" class="status-message error">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
          </svg>
          {{ error }}
        </div>
      </div>
      
      <!-- Competitions Table -->
      <div class="table-container" v-if="!loading && !error">
        <div class="table-responsive">
          <table class="competitions-table">
            <thead>
              <tr>
                <th class="text-center">#</th>
                <th>مسابقه</th>
                <th class="text-center">دوره</th>
                <th class="text-center">وضعیت</th>
                <th class="text-center">تاریخ‌ها</th>
                <th class="text-center">کد صحیح</th>
                <th class="text-center">عملیات</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="comp in competitions" 
                :key="comp.id"
                :class="{ 
                  selected: comp.id === selectedCompetitionId,
                  finished: comp.status === 'FINISHED'
                }"
              >
                <td class="text-center comp-id">{{ comp.id }}</td>
                <td class="comp-info">
                  <div class="comp-title">{{ comp.title }}</div>
                  <div class="comp-desc">{{ comp.description || 'بدون توضیحات' }}</div>
                </td>
                <td class="text-center">
                  <span class="round-badge">دوره {{ comp.roundNumber }}</span>
                </td>
                <td class="text-center">
                  <span :class="['status-badge', comp.status.toLowerCase()]">
                    {{ comp.status === 'RUNNING' ? 'در حال اجرا' : 'پایان یافته' }}
                  </span>
                </td>
                <td class="text-center">
                  <div class="date-info">
                    <div class="date-item">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="date-icon">
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
                      </svg>
                      <span>{{ formatDateTime(comp.startTime) }}</span>
                    </div>
                    <div class="date-item">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="date-icon">
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clip-rule="evenodd" />
                      </svg>
                      <span>{{ formatDateTime(comp.endTime) }}</span>
                    </div>
                  </div>
                </td>
                <td class="text-center">
                  <div class="code-cell">
                    <div class="current-code">{{ comp.correctCode || '-' }}</div>
                    <div class="code-actions">
                      <input 
                        v-model="codeInputs[comp.id]"
                        type="text"
                        class="code-input"
                        placeholder="کد جدید"
                        @keyup.enter="saveCode(comp)"
                      />
                      <button 
                        @click="saveCode(comp)"
                        :disabled="savingCodeId === comp.id"
                        class="btn-icon-small"
                        title="ذخیره کد"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </td>
                <td class="text-center">
                  <div class="actions-cell">
                    <button 
                      @click="finishCompetition(comp)"
                      :disabled="comp.status === 'FINISHED' || finishingId === comp.id"
                      class="action-btn finish-btn"
                      title="پایان مسابقه"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                      </svg>
                      پایان
                    </button>
                    
                    <button 
                      @click="selectCompetition(comp)"
                      class="action-btn question-btn"
                      title="مدیریت سؤال"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                      </svg>
                      سؤال
                    </button>
                    
                    <button 
                      @click="deleteCompetition(comp.id)"
                      :disabled="loadingDelete"
                      class="action-btn delete-btn"
                      title="حذف مسابقه"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                      </svg>
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
              
              <tr v-if="competitions.length === 0">
                <td colspan="7" class="empty-state">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="empty-icon">
                    <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                  </svg>
                  <div class="empty-text">
                    <h4>مسابقه‌ای یافت نشد</h4>
                    <p>هنوز مسابقه‌ای در سیستم ثبت نشده است. اولین مسابقه را ایجاد کنید!</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div v-if="deleteError" class="status-message error">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
          </svg>
          {{ deleteError }}
        </div>
      </div>
    </section>

    <!-- Question Management -->
    <section v-if="selectedCompetitionId" class="question-section">
      <div class="section-header">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="section-icon">
          <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
        </svg>
        <h2 class="section-title">مدیریت سؤال مسابقه #{{ selectedCompetitionId }}</h2>
      </div>
      
      <div class="question-card">
        <!-- Status Messages -->
        <div class="status-container">
          <div v-if="qLoading" class="status-message loading">
            <div class="spinner"></div>
            <span>در حال دریافت/بارگذاری سؤال...</span>
          </div>
          <div v-if="qError" class="status-message error">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
            </svg>
            {{ qError }}
          </div>
          <div v-if="qMessage" class="status-message info">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
            </svg>
            {{ qMessage }}
          </div>
        </div>
        
        <!-- Question Form -->
        <div class="question-form">
          <div class="form-group">
            <label class="form-label">
              <span class="label-text">متن سؤال</span>
              <span class="label-required">*</span>
            </label>
            <textarea 
              v-model="qForm.questionText" 
              rows="3" 
              class="form-textarea"
              placeholder="متن کامل سؤال را وارد کنید..."
            ></textarea>
          </div>
          
          <div class="options-grid">
            <div class="option-card" :class="{ correct: qForm.correctOption === 'A' }">
              <div class="option-header">
                <span class="option-letter">A</span>
                <label class="option-radio">
                  <input 
                    type="radio" 
                    value="A" 
                    v-model="qForm.correctOption"
                    class="radio-input"
                  />
                  <span class="radio-custom"></span>
                  <span class="radio-text">گزینه صحیح</span>
                </label>
              </div>
              <input 
                v-model="qForm.optionA" 
                type="text" 
                class="option-input"
                placeholder="گزینه A"
              />
            </div>
            
            <div class="option-card" :class="{ correct: qForm.correctOption === 'B' }">
              <div class="option-header">
                <span class="option-letter">B</span>
                <label class="option-radio">
                  <input 
                    type="radio" 
                    value="B" 
                    v-model="qForm.correctOption"
                    class="radio-input"
                  />
                  <span class="radio-custom"></span>
                  <span class="radio-text">گزینه صحیح</span>
                </label>
              </div>
              <input 
                v-model="qForm.optionB" 
                type="text" 
                class="option-input"
                placeholder="گزینه B"
              />
            </div>
            
            <div class="option-card" :class="{ correct: qForm.correctOption === 'C' }">
              <div class="option-header">
                <span class="option-letter">C</span>
                <label class="option-radio">
                  <input 
                    type="radio" 
                    value="C" 
                    v-model="qForm.correctOption"
                    class="radio-input"
                  />
                  <span class="radio-custom"></span>
                  <span class="radio-text">گزینه صحیح</span>
                </label>
              </div>
              <input 
                v-model="qForm.optionC" 
                type="text" 
                class="option-input"
                placeholder="گزینه C"
              />
            </div>
            
            <div class="option-card" :class="{ correct: qForm.correctOption === 'D' }">
              <div class="option-header">
                <span class="option-letter">D</span>
                <label class="option-radio">
                  <input 
                    type="radio" 
                    value="D" 
                    v-model="qForm.correctOption"
                    class="radio-input"
                  />
                  <span class="radio-custom"></span>
                  <span class="radio-text">گزینه صحیح</span>
                </label>
              </div>
              <input 
                v-model="qForm.optionD" 
                type="text" 
                class="option-input"
                placeholder="گزینه D"
              />
            </div>
          </div>
          
          <div class="form-actions">
            <button 
              @click="saveQuestion" 
              :disabled="qSaving"
              class="btn btn-primary"
            >
              <svg v-if="qSaving" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="spinner">
                <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clip-rule="evenodd" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="btn-icon">
                <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
              </svg>
              {{ qSaving ? "در حال ذخیره..." : "ذخیره سؤال" }}
            </button>
            
            <button 
              @click="deleteQuestion(selectedCompetitionId)"
              :disabled="loadingDelete"
              class="btn btn-danger"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="btn-icon">
                <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
              </svg>
              حذف سؤال
            </button>
          </div>
        </div>
      </div>
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

// برای حذف سؤال
const loadingDelete = ref(false);
const deleteError = ref("");

// آمار مسابقات
const stats = reactive({
  totalCompetitions: 0,
  activeCompetitions: 0,
  finishedCompetitions: 0
});

// -------------- helpers --------------
function authHeaders(json = true) {
  const h = {};
  if (json) h["Content-Type"] = "application/json";
  if (authStore.token) h["Authorization"] = `Bearer ${authStore.token}`;
  return h;
}

function formatDateTime(dt) {
  if (!dt) return "";
  const date = new Date(dt);
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
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
    
    // Update stats
    stats.totalCompetitions = data.length;
    stats.activeCompetitions = data.filter(c => c.status === 'RUNNING').length;
    stats.finishedCompetitions = data.filter(c => c.status === 'FINISHED').length;

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

// -------------- حذف مسابقه --------------
async function deleteCompetition(competitionId) {
  if (!competitionId || loadingDelete.value) return;

  if (!confirm("آیا از حذف این مسابقه مطمئن هستید؟ این عمل غیرقابل بازگشت است!")) return;

  loadingDelete.value = true;
  deleteError.value = "";

  try {
    const res = await fetch(`${API_BASE}/admin/competitions/${competitionId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "خطا در حذف مسابقه");
    }

    // حذف از لیست
    competitions.value = competitions.value.filter(
      (c) => c.id !== competitionId
    );
    
    // آپدیت آمار
    loadCompetitions();
  } catch (e) {
    deleteError.value = e.message || "خطا در حذف مسابقه";
  } finally {
    loadingDelete.value = false;
  }
}

// -------------- حذف سؤال --------------
async function deleteQuestion(competitionId) {
  if (!competitionId || loadingDelete.value) return;

  if (!confirm("آیا از حذف سؤال این مسابقه مطمئن هستید؟")) return;

  loadingDelete.value = true;
  qError.value = "";

  try {
    const res = await fetch(`${API_BASE}/admin/competitions/${competitionId}/question`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "خطا در حذف سؤال");
    }

    // ریست فرم سؤال
    resetQuestionForm();
    qMessage.value = "سؤال با موفقیت حذف شد.";
  } catch (e) {
    qError.value = e.message || "خطا در حذف سؤال";
  } finally {
    loadingDelete.value = false;
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
    stats.finishedCompetitions++;
    stats.activeCompetitions--;
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
    qForm.correctOption = data.correctOption || "A";
  } catch (e) {
    console.error(e);
    qError.value = "خطا در دریافت سؤال: " + (e.message || "نامشخص");
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
        method: "PUT",
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
    qError.value = "خطا در ذخیره سؤال: " + (e.message || "نامشخص");
  } finally {
    qSaving.value = false;
  }
}

onMounted(() => {
  loadCompetitions();
});
</script>

<style scoped>
.admin-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  font-family: 'Vazirmatn', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  direction: rtl;
}

/* Header Styles */
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  color: white;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.2);
  position: relative;
  overflow: hidden;
}

.page-header::before {
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

.header-content {
  position: relative;
  z-index: 1;
  text-align: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.title-icon {
  font-size: 2rem;
}

.page-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
}

.header-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  position: relative;
  z-index: 1;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

/* Section Styles */
section {
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.section-icon {
  width: 28px;
  height: 28px;
  color: #667eea;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.count-badge {
  background: #e2e8f0;
  color: #4a5568;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

/* Create Section */
.create-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
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

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #4a5568;
  font-size: 0.95rem;
}

.label-required {
  color: #f56565;
}

.label-optional {
  color: #a0aec0;
  font-size: 0.85rem;
}

.form-input,
.form-textarea {
  padding: 0.875rem 1rem;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  font-size: 1rem;
  background: #f8fafc;
  transition: all 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.datetime-input {
  position: relative;
}

.datetime-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #a0aec0;
  pointer-events: none;
}

.form-hint {
  font-size: 0.85rem;
  color: #a0aec0;
  margin-top: 0.25rem;
}

/* Button Styles */
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
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

.btn-danger {
  background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
  color: white;
}

.btn-danger:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(245, 101, 101, 0.3);
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

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Status Messages */
.status-container {
  margin-bottom: 1.5rem;
}

.status-message {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-weight: 500;
}

.status-message.loading {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.status-message.error {
  background: rgba(245, 101, 101, 0.1);
  color: #f56565;
  border: 1px solid rgba(245, 101, 101, 0.2);
}

.status-message.success {
  background: rgba(72, 187, 120, 0.1);
  color: #48bb78;
  border: 1px solid rgba(72, 187, 120, 0.2);
}

.status-message.info {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.status-message svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

/* Table Container */
.table-container {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.table-responsive {
  overflow-x: auto;
}

.competitions-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 1000px;
}

.competitions-table thead {
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
}

.competitions-table th {
  padding: 1.25rem 1rem;
  font-weight: 600;
  color: #4a5568;
  text-align: right;
  border-bottom: 2px solid #e2e8f0;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.competitions-table th.text-center {
  text-align: center;
}

.competitions-table tbody tr {
  transition: all 0.3s ease;
  border-bottom: 1px solid #f1f5f9;
}

.competitions-table tbody tr:hover {
  background-color: #f8fafc;
}

.competitions-table tbody tr.selected {
  background-color: #e6f7ff;
}

.competitions-table tbody tr.finished {
  opacity: 0.8;
}

.competitions-table td {
  padding: 1.25rem 1rem;
  vertical-align: middle;
}

.competitions-table td.text-center {
  text-align: center;
}

/* Competition Info */
.comp-id {
  font-weight: 600;
  color: #667eea;
  font-family: monospace;
  font-size: 1.1rem;
}

.comp-info {
  min-width: 250px;
}

.comp-title {
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.25rem;
}

.comp-desc {
  font-size: 0.9rem;
  color: #718096;
  line-height: 1.4;
}

/* Badges */
.round-badge {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  background: #e2e8f0;
  color: #4a5568;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-badge {
  display: inline-block;
  padding: 0.375rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-badge.running {
  background: rgba(72, 187, 120, 0.1);
  color: #48bb78;
}

.status-badge.finished {
  background: rgba(160, 174, 192, 0.1);
  color: #a0aec0;
}

/* Date Info */
.date-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 180px;
}

.date-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #4a5568;
}

.date-icon {
  width: 16px;
  height: 16px;
  color: #a0aec0;
  flex-shrink: 0;
}

/* Code Cell */
.code-cell {
  min-width: 150px;
}

.current-code {
  font-family: monospace;
  background: #f7fafc;
  padding: 0.5rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  color: #4a5568;
}

.code-actions {
  display: flex;
  gap: 0.5rem;
}

.code-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
}

.code-input:focus {
  outline: none;
  border-color: #667eea;
}

.btn-icon-small {
  width: 36px;
  height: 36px;
  border: none;
  background: #667eea;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-icon-small:hover:not(:disabled) {
  background: #764ba2;
  transform: translateY(-2px);
}

.btn-icon-small:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-icon-small svg {
  width: 16px;
  height: 16px;
}

/* Actions Cell */
.actions-cell {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  min-width: 200px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  justify-content: center;
}

.finish-btn {
  background: rgba(72, 187, 120, 0.1);
  color: #48bb78;
}

.finish-btn:hover:not(:disabled) {
  background: #48bb78;
  color: white;
}

.question-btn {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.question-btn:hover {
  background: #667eea;
  color: white;
}

.delete-btn {
  background: rgba(245, 101, 101, 0.1);
  color: #f56565;
}

.delete-btn:hover:not(:disabled) {
  background: #f56565;
  color: white;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn svg {
  width: 16px;
  height: 16px;
}

/* Empty State */
.empty-state {
  padding: 4rem 2rem;
  text-align: center;
  color: #a0aec0;
}

.empty-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.empty-text h4 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #718096;
}

.empty-text p {
  font-size: 1rem;
  color: #a0aec0;
}

/* Question Section */
.question-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.option-card {
  padding: 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  transition: all 0.3s ease;
  background: #f8fafc;
}

.option-card.correct {
  border-color: #48bb78;
  background: rgba(72, 187, 120, 0.05);
}

.option-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.option-letter {
  width: 32px;
  height: 32px;
  background: #667eea;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.option-radio {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.radio-input {
  display: none;
}

.radio-custom {
  width: 18px;
  height: 18px;
  border: 2px solid #cbd5e0;
  border-radius: 50%;
  position: relative;
  transition: all 0.3s ease;
}

.radio-input:checked + .radio-custom {
  border-color: #48bb78;
  background: #48bb78;
}

.radio-input:checked + .radio-custom::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
}

.radio-text {
  font-size: 0.85rem;
  color: #718096;
}

.option-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.option-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.option-card.correct .option-input {
  border-color: #48bb78;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.form-actions .btn {
  flex: 1;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .admin-container {
    padding: 1.5rem;
  }
  
  .form-grid,
  .options-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .admin-container {
    padding: 1rem;
  }
  
  .page-header {
    padding: 2rem 1.5rem;
  }
  
  .page-title {
    font-size: 2rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .header-stats {
    flex-wrap: wrap;
    gap: 2rem;
  }
  
  .stat-value {
    font-size: 2rem;
  }
  
  .section-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .section-header .btn {
    align-self: flex-start;
  }
  
  .actions-cell {
    flex-direction: column;
  }
  
  .form-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.75rem;
  }
  
  .stat-value {
    font-size: 1.75rem;
  }
  
  .create-card,
  .question-card {
    padding: 1.5rem;
  }
  
  .btn {
    padding: 0.875rem 1.25rem;
    font-size: 0.9rem;
  }
  
  .competitions-table td,
  .competitions-table th {
    padding: 1rem 0.5rem;
  }
}
</style>