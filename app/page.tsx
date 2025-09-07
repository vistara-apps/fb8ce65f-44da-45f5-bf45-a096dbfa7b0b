import { PaymentForm } from '@/components/PaymentForm'
import { X402Demo } from '@/components/X402Demo'

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Legalo - X402 Payment System</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A complete implementation of the X402 payment protocol using USDC on Base network. 
            Test both direct payments and automated X402 payment flows.
          </p>
        </header>

        <div className="space-y-12">
          {/* Direct Payment Form */}
          <section>
            <h2 className="text-2xl font-semibold text-center mb-6">Direct USDC Payment</h2>
            <PaymentForm />
          </section>

          {/* X402 Demo */}
          <section>
            <h2 className="text-2xl font-semibold text-center mb-6">X402 Protocol Demo</h2>
            <X402Demo />
          </section>

          {/* Technical Details */}
          <section className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-6">Technical Implementation</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="payment-card">
                <h3 className="text-lg font-semibold mb-3">🔧 Core Technologies</h3>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Wagmi:</strong> React hooks for Ethereum</li>
                  <li>• <strong>Viem:</strong> TypeScript interface for Ethereum</li>
                  <li>• <strong>RainbowKit:</strong> Wallet connection UI</li>
                  <li>• <strong>X402-Axios:</strong> HTTP 402 payment handling</li>
                  <li>• <strong>Base Network:</strong> L2 for fast, cheap transactions</li>
                  <li>• <strong>USDC:</strong> Stable cryptocurrency payments</li>
                </ul>
              </div>

              <div className="payment-card">
                <h3 className="text-lg font-semibold mb-3">✅ Features Implemented</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Wallet connection with multiple providers</li>
                  <li>• USDC balance checking and transfers</li>
                  <li>• Transaction confirmation monitoring</li>
                  <li>• X402 protocol request/response handling</li>
                  <li>• Automatic payment retry logic</li>
                  <li>• Comprehensive error handling</li>
                </ul>
              </div>

              <div className="payment-card">
                <h3 className="text-lg font-semibold mb-3">🔒 Security Features</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Client-side transaction signing</li>
                  <li>• Balance verification before payments</li>
                  <li>• Transaction receipt validation</li>
                  <li>• Timeout and retry mechanisms</li>
                  <li>• Error boundary protection</li>
                  <li>• Type-safe contract interactions</li>
                </ul>
              </div>

              <div className="payment-card">
                <h3 className="text-lg font-semibold mb-3">🧪 Testing Capabilities</h3>
                <ul className="space-y-2 text-sm">
                  <li>• End-to-end payment flow testing</li>
                  <li>• X402 protocol simulation</li>
                  <li>• Transaction confirmation tracking</li>
                  <li>• Error scenario handling</li>
                  <li>• Real Base network integration</li>
                  <li>• Live USDC contract interaction</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Environment Setup */}
          <section className="max-w-3xl mx-auto">
            <div className="payment-card">
              <h3 className="text-lg font-semibold mb-3">🔧 Environment Configuration</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                To fully test this implementation, set up the following environment variables:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm font-mono">
                <div>NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key</div>
                <div>NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id</div>
                <div>NEXT_PUBLIC_X402_API_URL=https://your-x402-api.com</div>
                <div>NEXT_PUBLIC_X402_API_KEY=your_x402_api_key</div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                * The application will work with default providers, but custom API keys provide better performance
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
