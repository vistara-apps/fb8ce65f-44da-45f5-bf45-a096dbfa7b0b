'use client'

import { useState, useCallback } from 'react'
import { useWalletClient, usePublicClient, useAccount } from 'wagmi'
import { parseUnits, formatUnits } from 'viem'
import { PaymentRequest, PaymentStatus, PaymentError } from '@/types/payment'
import { USDC_BASE, ERC20_ABI } from '@/lib/contracts'
import { x402Service } from '@/lib/x402-service'

export function usePayment() {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({
    id: '',
    status: 'idle'
  })

  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()
  const { address, isConnected } = useAccount()

  const getUSDCBalance = useCallback(async (): Promise<string> => {
    if (!address || !publicClient) return '0'

    try {
      const balance = await publicClient.readContract({
        address: USDC_BASE.address as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [address]
      })

      return formatUnits(balance as bigint, USDC_BASE.decimals)
    } catch (error) {
      console.error('Error fetching USDC balance:', error)
      return '0'
    }
  }, [address, publicClient])

  const sendUSDCPayment = useCallback(async (
    recipient: string,
    amount: string
  ): Promise<string> => {
    if (!walletClient || !address) {
      throw new Error('Wallet not connected')
    }

    try {
      const amountInWei = parseUnits(amount, USDC_BASE.decimals)

      const hash = await walletClient.writeContract({
        address: USDC_BASE.address as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'transfer',
        args: [recipient as `0x${string}`, amountInWei],
        account: address
      })

      return hash
    } catch (error) {
      console.error('Error sending USDC payment:', error)
      throw error
    }
  }, [walletClient, address])

  const waitForTransactionConfirmation = useCallback(async (
    hash: string,
    confirmations: number = 1
  ): Promise<any> => {
    if (!publicClient) throw new Error('Public client not available')

    try {
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: hash as `0x${string}`,
        confirmations
      })

      return receipt
    } catch (error) {
      console.error('Error waiting for transaction confirmation:', error)
      throw error
    }
  }, [publicClient])

  const processPayment = useCallback(async (request: PaymentRequest): Promise<void> => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected')
    }

    const paymentId = `payment-${Date.now()}`
    
    setPaymentStatus({
      id: paymentId,
      status: 'preparing'
    })

    try {
      // Check USDC balance
      const balance = await getUSDCBalance()
      const balanceNum = parseFloat(balance)
      const amountNum = parseFloat(request.amount)

      if (balanceNum < amountNum) {
        throw new Error(`Insufficient USDC balance. Required: ${request.amount}, Available: ${balance}`)
      }

      setPaymentStatus(prev => ({ ...prev, status: 'pending' }))

      // Send USDC transaction
      const transactionHash = await sendUSDCPayment(request.recipient, request.amount)

      setPaymentStatus(prev => ({
        ...prev,
        status: 'confirming',
        transactionHash
      }))

      // Wait for transaction confirmation
      const receipt = await waitForTransactionConfirmation(transactionHash, 2)

      setPaymentStatus(prev => ({
        ...prev,
        status: 'confirmed',
        confirmations: receipt.blockNumber ? 2 : 1,
        receipt
      }))

      // Notify x402 service about the payment
      try {
        await x402Service.verifyPayment(transactionHash)
      } catch (error) {
        console.warn('X402 verification failed:', error)
        // Don't fail the entire payment if x402 verification fails
      }

    } catch (error: any) {
      setPaymentStatus(prev => ({
        ...prev,
        status: 'failed',
        error: error.message
      }))
      throw error
    }
  }, [isConnected, address, getUSDCBalance, sendUSDCPayment, waitForTransactionConfirmation])

  const processX402Payment = useCallback(async (
    resourceUrl: string,
    paymentData?: any
  ): Promise<any> => {
    try {
      return await x402Service.processX402Payment(resourceUrl, paymentData)
    } catch (error: any) {
      if (error.code === 'PAYMENT_REQUIRED') {
        // Extract payment info and process payment
        const paymentInfo = error.details
        const paymentRequest: PaymentRequest = {
          amount: paymentInfo.amount,
          recipient: paymentInfo.recipient,
          description: paymentInfo.description || 'X402 Payment',
          metadata: { resourceUrl, ...paymentInfo.metadata }
        }

        await processPayment(paymentRequest)
        
        // Retry the resource access
        return await x402Service.processX402Payment(resourceUrl, paymentData)
      }
      throw error
    }
  }, [processPayment])

  const resetPaymentStatus = useCallback(() => {
    setPaymentStatus({
      id: '',
      status: 'idle'
    })
  }, [])

  return {
    paymentStatus,
    isConnected,
    address,
    getUSDCBalance,
    processPayment,
    processX402Payment,
    resetPaymentStatus,
    sendUSDCPayment,
    waitForTransactionConfirmation
  }
}
