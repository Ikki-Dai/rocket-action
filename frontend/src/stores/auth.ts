import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import { authApi } from '@/services/auth'
import type { User, LoginData, RegisterData } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const loading = ref(false)

  // 计算属性
  const isAuthenticated = computed(() => !!token.value)
  const userRole = computed(() => user.value?.role)
  const isAdmin = computed(() => user.value?.role === 'admin')

  // 操作
  const login = async (loginData: LoginData) => {
    loading.value = true
    try {
      const response = await authApi.login(loginData)
      user.value = response.user
      token.value = response.access_token
      localStorage.setItem('token', response.access_token)
    } finally {
      loading.value = false
    }
  }

  const register = async (registerData: RegisterData) => {
    loading.value = true
    try {
      const response = await authApi.register(registerData)
      user.value = response.user
      token.value = response.access_token
      localStorage.setItem('token', response.access_token)
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch (error) {
      // 即使API调用失败也要清除本地状态
      console.warn('Logout API failed:', error)
    } finally {
      user.value = null
      token.value = null
      localStorage.removeItem('token')
    }
  }

  const fetchUser = async () => {
    if (!token.value) return

    try {
      const userData = await authApi.getProfile()
      user.value = userData
    } catch (error) {
      // Token可能已过期，清除认证状态
      await logout()
      throw error
    }
  }

  const updateProfile = async (userData: Partial<User>) => {
    const updated = await authApi.updateProfile(userData)
    user.value = updated
    return updated
  }

  const changePassword = async (passwordData: { currentPassword: string; newPassword: string }) => {
    await authApi.changePassword(passwordData)
  }

  // 初始化时检查认证状态
  const initialize = async () => {
    if (token.value && !user.value) {
      try {
        await fetchUser()
      } catch (error) {
        console.warn('Failed to fetch user on initialization:', error)
      }
    }
  }

  return {
    // 状态
    user: readonly(user),
    token: readonly(token),
    loading: readonly(loading),
    // 计算属性
    isAuthenticated,
    userRole,
    isAdmin,
    // 操作
    login,
    register,
    logout,
    fetchUser,
    updateProfile,
    changePassword,
    initialize,
  }
})