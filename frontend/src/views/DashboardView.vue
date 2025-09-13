<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <div class="container">
        <div class="header-content">
          <h1>🚀 Rocket Task Manager</h1>
          <div class="user-info">
            <span>欢迎, {{ user?.fullName || user?.username }}</span>
            <button @click="handleLogout" class="btn btn-secondary">登出</button>
          </div>
        </div>
      </div>
    </header>

    <main class="dashboard-main">
      <div class="container">
        <div class="dashboard-grid">
          <div class="card">
            <h2>欢迎使用 Rocket Task Manager</h2>
            <p>这是一个基于 Vue 3 + NestJS 的现代任务管理系统</p>
            <div class="features">
              <h3>主要功能：</h3>
              <ul>
                <li>✅ 用户认证与授权</li>
                <li>✅ 任务管理</li>
                <li>✅ 团队协作</li>
                <li>✅ 项目管理</li>
                <li>✅ 实时通知</li>
              </ul>
            </div>
          </div>

          <div class="card">
            <h3>用户信息</h3>
            <div class="user-details">
              <p><strong>用户名:</strong> {{ user?.username }}</p>
              <p><strong>邮箱:</strong> {{ user?.email }}</p>
              <p><strong>角色:</strong> {{ user?.role }}</p>
              <p><strong>注册时间:</strong> {{ formatDate(user?.createdAt) }}</p>
            </div>
          </div>

          <div class="card">
            <h3>快速操作</h3>
            <div class="quick-actions">
              <router-link to="/tasks" class="btn btn-primary">查看任务</router-link>
              <router-link to="/teams" class="btn btn-secondary">管理团队</router-link>
              <router-link to="/settings" class="btn btn-secondary">用户设置</router-link>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => authStore.user)

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('zh-CN')
}
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background-color: #f8fafc;
}

.dashboard-header {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content h1 {
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: 700;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.dashboard-main {
  padding: 2rem 0;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.features ul {
  list-style: none;
  padding: 0;
}

.features li {
  padding: 0.5rem 0;
  color: #4b5563;
}

.user-details p {
  margin-bottom: 0.5rem;
  color: #4b5563;
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.quick-actions .btn {
  justify-content: center;
}
</style>