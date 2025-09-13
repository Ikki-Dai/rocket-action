// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean
  data: T
  timestamp: string
}

export interface ApiError {
  success: false
  error: {
    code: string
    message: string
    statusCode: number
    timestamp: string
    path: string
  }
}

// 分页类型
export interface PaginationParams {
  page?: number
  limit?: number
}

export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}