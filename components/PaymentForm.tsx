'use client'

import { useState, useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { usePayment } from '@/hooks/usePayment'
import { PaymentRequest } from '@/types/payment'

export function PaymentForm() {
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [description, setDescription] = useState('')
  const [balance, setBalance] = useState('0')

  const {
    paymentStatus,
    isConnected,
    address,
    getUSDCBalance,
    processPayment,
    resetPaymentStatus
  } = usePayment()

  useEffect(() => {
    if (isConnected) {
      getUSDCBalance().then(setBalance)
    }
  }, [isConnected, getUSDCBalance])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!amount || !recipient) {
      alert('Please fill in all required fields')
      return
    }

    const paymentRequest: PaymentRequest = {
      amount,
      recipient,
      description,
      metadata: {
        timestamp: Date.now(),
        userAddress: address
      }
    }

    try {
      await processPayment(paymentRequest)
    } catch (error: any) {
      console.error('Payment failed:', error)
      alert(`Payment failed: ${error.message}`)
    }
  }

  const getStatusColor = () => {
    switch (paymentStatus.status) {
      case 'confirmed': return 'status-success'
      case 'failed': return 'status-error'
      case 'preparing':
      case 'pending':
      case 'confirming': return 'status-pending'
      default: return ''
    }
  }

  const getStatusMessage = () => {
    switch (paymentStatus.status) {
      case 'preparing': return 'Preparing payment...'
      case 'pending': return 'Transaction submitted, waiting for confirmation...'
      case 'confirming': return 'Confirming transaction...'
      case 'confirmed': return 'Payment confirmed successfully!'
      case 'failed': return `Payment failed: ${paymentStatus.error}`
      default: return ''
    }
  }

  return (
    <div className="payment-card max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">USDC Payment on Base</h2>
      
      {!isConnected ? (
        <div className="text-center">
          <p className="mb-4 text-gray-600">Connect your wallet to make payments</p>
          <ConnectButton />
        </div>
      ) : (
        <>
          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              USDC Balance: {parseFloat(balance).toFixed(2)} USDC
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="recipient" className="block text-sm font-medium mb-1">
                Recipient Address *
              </label>
              <input
                type="text"
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="0x..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium mb-1">
                Amount (USDC) *
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description (Optional)
              </label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Payment description"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={paymentStatus.status !== 'idle' && paymentStatus.status !== 'confirmed' && paymentStatus.status !== 'failed'}
              className="payment-button w-full"
            >
              {paymentStatus.status === 'idle' || paymentStatus.status === 'confirmed' || paymentStatus.status === 'failed'
                ? 'Send Payment'
                : 'Processing...'}
            </button>
          </form>

          {paymentStatus.status !== 'idle' && (
            <div className={`mt-4 ${getStatusColor()}`}>
              <p className="font-medium">{getStatusMessage()}</p>
              {paymentStatus.transactionHash && (
                <p className="text-sm mt-1">
                  Transaction: 
                  <a 
                    href={`https://basescan.org/tx/${paymentStatus.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 underline hover:no-underline"
                  >
                    {paymentStatus.transactionHash.slice(0, 10)}...
                  </a>
                </p>
              )}
              {paymentStatus.confirmations && (
                <p className="text-sm">Confirmations: {paymentStatus.confirmations}</p>
              )}
            </div>
          )}

          {(paymentStatus.status === 'confirmed' || paymentStatus.status === 'failed') && (
            <button
              onClick={resetPaymentStatus}
              className="mt-4 w-full px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              Reset
            </button>
          )}
        </>
      )}
    </div>
  )
}
