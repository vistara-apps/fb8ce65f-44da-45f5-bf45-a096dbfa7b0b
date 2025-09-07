import axios, { AxiosInstance } from 'axios'
import { X402PaymentConfig, PaymentRequest, PaymentResponse, PaymentError } from '@/types/payment'

export class X402PaymentService {
  private client: AxiosInstance
  private config: X402PaymentConfig

  constructor(config: X402PaymentConfig) {
    this.config = config
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiKey && { 'Authorization': `Bearer ${config.apiKey}` })
      }
    })

    // Add request interceptor for x402 protocol
    this.client.interceptors.request.use((config) => {
      // Add x402 specific headers
      config.headers['X-402-Protocol'] = '1.0'
      config.headers['X-402-Payment-Required'] = 'true'
      return config
    })

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 402) {
          // Handle payment required response
          const paymentInfo = error.response.data
          throw new PaymentError('PAYMENT_REQUIRED', 'Payment required to access resource', paymentInfo)
        }
        throw error
      }
    )
  }

  async initiatePayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      const response = await this.client.post('/payments/initiate', {
        amount: request.amount,
        recipient: request.recipient,
        description: request.description,
        metadata: request.metadata,
        currency: 'USDC',
        network: 'base'
      })

      return response.data
    } catch (error) {
      if (error instanceof PaymentError) {
        throw error
      }
      throw new PaymentError('PAYMENT_FAILED', 'Failed to initiate payment', error)
    }
  }

  async verifyPayment(transactionHash: string): Promise<PaymentResponse> {
    try {
      const response = await this.client.get(`/payments/verify/${transactionHash}`)
      return response.data
    } catch (error) {
      throw new PaymentError('VERIFICATION_FAILED', 'Failed to verify payment', error)
    }
  }

  async getPaymentStatus(transactionHash: string): Promise<PaymentResponse> {
    try {
      const response = await this.client.get(`/payments/status/${transactionHash}`)
      return response.data
    } catch (error) {
      throw new PaymentError('STATUS_CHECK_FAILED', 'Failed to check payment status', error)
    }
  }

  async processX402Payment(resourceUrl: string, paymentData: any): Promise<any> {
    try {
      // First, try to access the resource
      const response = await this.client.get(resourceUrl)
      return response.data
    } catch (error: any) {
      if (error.response?.status === 402) {
        // Payment required - process payment
        const paymentInfo = error.response.data
        
        // Initiate payment based on x402 response
        const paymentRequest: PaymentRequest = {
          amount: paymentInfo.amount,
          recipient: paymentInfo.recipient,
          description: paymentInfo.description || 'X402 Payment',
          metadata: { resourceUrl, ...paymentInfo.metadata }
        }

        const paymentResponse = await this.initiatePayment(paymentRequest)
        
        // Wait for payment confirmation
        await this.waitForConfirmation(paymentResponse.transactionHash)
        
        // Retry resource access with payment proof
        const retryResponse = await this.client.get(resourceUrl, {
          headers: {
            'X-402-Payment-Hash': paymentResponse.transactionHash
          }
        })
        
        return retryResponse.data
      }
      throw error
    }
  }

  private async waitForConfirmation(transactionHash: string, maxAttempts: number = 30): Promise<void> {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const status = await this.getPaymentStatus(transactionHash)
      
      if (status.status === 'confirmed') {
        return
      }
      
      if (status.status === 'failed') {
        throw new PaymentError('PAYMENT_FAILED', 'Payment transaction failed')
      }
      
      // Wait 2 seconds before next check
      await new Promise(resolve => setTimeout(resolve, 2000))
    }
    
    throw new PaymentError('CONFIRMATION_TIMEOUT', 'Payment confirmation timeout')
  }
}

// Default x402 service instance
export const x402Service = new X402PaymentService({
  baseUrl: process.env.NEXT_PUBLIC_X402_API_URL || 'https://api.x402.example.com',
  apiKey: process.env.NEXT_PUBLIC_X402_API_KEY,
  timeout: 30000,
  retries: 3
})

class PaymentError extends Error {
  constructor(public code: string, message: string, public details?: any) {
    super(message)
    this.name = 'PaymentError'
  }
}
