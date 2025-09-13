// 用户相关类型
export interface User {
  id: number
  username: string
  email: string
  fullName: string
  avatarUrl?: string
  role: 'admin' | 'member'
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
  fullName: string
}

export interface AuthResponse {
  access_token: string
  user: User
}