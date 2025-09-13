<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>🚀 Rocket Task Manager</h1>
        <p>登录到你的账户</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email" class="form-label">邮箱</label>
          <input
            id="email"
            v-model="loginForm.email"
            type="email"
            class="form-input"
            placeholder="输入你的邮箱"
            required
          />
        </div>

        <div class="form-group">
          <label for="password" class="form-label">密码</label>
          <input
            id="password"
            v-model="loginForm.password"
            type="password"
            class="form-input"
            placeholder="输入你的密码"
            required
          />
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button
          type="submit"
          class="btn btn-primary login-btn"
          :disabled="loading"
          :class="{ loading }"
        >
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>

      <div class="login-footer">
        <p>
          还没有账户？
          <router-link to="/register" class="link">立即注册</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const loginForm = ref({
  email: '',
  password: '',
})

const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  if (!loginForm.value.email || !loginForm.value.password) {
    error.value = '请填写所有字段'
    return
  }

  loading.value = true
  error.value = ''

  try {
    await authStore.login(loginForm.value)
    router.push('/dashboard')
  } catch (err: any) {
    error.value = err.response?.data?.error?.message || '登录失败'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
}

.login-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h1 {
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.login-header p {
  color: #6b7280;
}

.login-form {
  margin-bottom: 1.5rem;
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
}

.login-footer {
  text-align: center;
}

.link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}

.link:hover {
  text-decoration: underline;
}
</style>