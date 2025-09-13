import { apiClient } from './api'
import type { LoginData, RegisterData, AuthResponse, User } from '@/types/auth'

export const authApi = {
  // 用户登录
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', data)
    return response.data
  },

  // 用户注册
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data)
    return response.data
  },

  // 刷新token
  async refresh(): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/refresh')
    return response.data
  },

  // 用户登出
  async logout(): Promise<void> {
    await apiClient.post('/auth/logout')
  },

  // 获取当前用户信息
  async getProfile(): Promise<User> {
    const response = await apiClient.get<User>('/users/me')
    return response.data
  },

  // 更新用户信息
  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await apiClient.put<User>('/users/me', data)
    return response.data
  },

  // 修改密码
  async changePassword(data: { currentPassword: string; newPassword: string }): Promise<void> {
    await apiClient.put('/users/me/password', data)
  },
}