export interface PaymentRequest {
  amount: string
  recipient: string
  description?: string
  metadata?: Record<string, any>
}

export interface PaymentResponse {
  transactionHash: string
  status: 'pending' | 'confirmed' | 'failed'
  amount: string
  recipient: string
  timestamp: number
  confirmations: number
  gasUsed?: string
  gasPrice?: string
}

export interface X402PaymentConfig {
  baseUrl: string
  apiKey?: string
  timeout?: number
  retries?: number
}

export interface USDCContract {
  address: string
  decimals: number
  symbol: string
}

export interface PaymentStatus {
  id: string
  status: 'idle' | 'preparing' | 'pending' | 'confirming' | 'confirmed' | 'failed'
  error?: string
  transactionHash?: string
  confirmations?: number
  receipt?: any
}

export interface PaymentError {
  code: string
  message: string
  details?: any
}
