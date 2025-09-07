'use client'

import { useState } from 'react'
import { usePayment } from '@/hooks/usePayment'

export function X402Demo() {
  const [resourceUrl, setResourceUrl] = useState('https://api.example.com/premium-content')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { processX402Payment, isConnected } = usePayment()

  const handleAccessResource = async () => {
    if (!isConnected) {
      setError('Please connect your wallet first')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = await processX402Payment(resourceUrl)
      setResult(data)
    } catch (err: any) {
      setError(err.message || 'Failed to access resource')
    } finally {
      setLoading(false)
    }
  }

  const simulateX402Response = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      // Simulate a 402 Payment Required response
      const mockPaymentInfo = {
        amount: '1.00',
        recipient: '0x742d35Cc6634C0532925a3b8D0C9e3e0C8b4c8e8',
        description: 'Access to premium API endpoint',
        metadata: {
          resourceId: 'premium-content-123',
          validFor: '24h'
        }
      }

      // This would normally come from the x402 service
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate payment processing
      const paymentRequest = {
        amount: mockPaymentInfo.amount,
        recipient: mockPaymentInfo.recipient,
        description: mockPaymentInfo.description,
        metadata: mockPaymentInfo.metadata
      }

      // In a real scenario, this would trigger the actual payment flow
      setResult({
        message: 'X402 Payment flow would be triggered',
        paymentRequired: true,
        paymentInfo: mockPaymentInfo,
        note: 'This is a simulation - in production, the payment would be processed automatically'
      })

    } catch (err: any) {
      setError(err.message || 'Failed to simulate X402 flow')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="payment-card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">X402 Payment Flow Demo</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="resourceUrl" className="block text-sm font-medium mb-1">
            Resource URL
          </label>
          <input
            type="text"
            id="resourceUrl"
            value={resourceUrl}
            onChange={(e) => setResourceUrl(e.target.value)}
            placeholder="https://api.example.com/premium-content"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleAccessResource}
            disabled={loading || !isConnected}
            className="payment-button flex-1"
          >
            {loading ? 'Processing...' : 'Access Resource (Real X402)'}
          </button>
          
          <button
            onClick={simulateX402Response}
            disabled={loading}
            className="payment-button flex-1 bg-green-600 hover:bg-green-700"
          >
            {loading ? 'Processing...' : 'Simulate X402 Flow'}
          </button>
        </div>

        {!isConnected && (
          <div className="status-error">
            <p>⚠️ Connect your wallet to test the X402 payment flow</p>
          </div>
        )}

        {error && (
          <div className="status-error">
            <h3 className="font-semibold">Error:</h3>
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="status-success">
            <h3 className="font-semibold mb-2">Result:</h3>
            <pre className="text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
            How X402 Payment Flow Works:
          </h3>
          <ol className="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-decimal list-inside">
            <li>Client requests a protected resource</li>
            <li>Server responds with 402 Payment Required status</li>
            <li>Response includes payment details (amount, recipient, etc.)</li>
            <li>Client processes USDC payment on Base network</li>
            <li>Client retries request with payment proof</li>
            <li>Server verifies payment and grants access</li>
          </ol>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            Implementation Features:
          </h3>
          <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1 list-disc list-inside">
            <li>✅ Wagmi useWalletClient integration</li>
            <li>✅ X402-axios for HTTP 402 handling</li>
            <li>✅ USDC on Base network support</li>
            <li>✅ Transaction confirmation tracking</li>
            <li>✅ Comprehensive error handling</li>
            <li>✅ End-to-end payment flow testing</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
