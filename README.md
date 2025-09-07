# Legalo - X402 Payment Flow Implementation

A complete implementation of the X402 payment protocol using USDC on Base network with wagmi and x402-axios integration.

## 🚀 Features

- ✅ **Wagmi useWalletClient Integration**: React hooks for Ethereum wallet interactions
- ✅ **X402-Axios Support**: HTTP 402 payment protocol handling
- ✅ **USDC on Base**: Fast, low-cost stablecoin payments
- ✅ **Transaction Confirmation**: Real-time confirmation tracking
- ✅ **Error Handling**: Comprehensive error scenarios coverage
- ✅ **End-to-End Testing**: Complete payment flow verification

## 🛠 Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Wagmi**: React hooks for Ethereum
- **Viem**: TypeScript interface for Ethereum
- **RainbowKit**: Wallet connection UI
- **Tailwind CSS**: Utility-first styling
- **Jest**: Testing framework

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd legalo-x402-payments
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your API keys:
- `NEXT_PUBLIC_ALCHEMY_API_KEY`: Your Alchemy API key
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`: Your WalletConnect project ID
- `NEXT_PUBLIC_X402_API_URL`: Your X402 API endpoint
- `NEXT_PUBLIC_X402_API_KEY`: Your X402 API key

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔧 Configuration

### Base Network Setup

The application is configured to work with Base mainnet:
- **Network**: Base (Chain ID: 8453)
- **USDC Contract**: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- **RPC**: Alchemy provider with fallback to public RPC

### Wallet Support

Supported wallets through RainbowKit:
- MetaMask
- WalletConnect
- Coinbase Wallet
- Rainbow Wallet
- And more...

## 🧪 Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

Run tests in watch mode:
```bash
npm run test:watch
# or
yarn test:watch
```

## 📋 Implementation Tasks Completed

- [x] **Use wagmi useWalletClient + x402-axios**: Integrated wagmi hooks with x402 protocol handling
- [x] **Test payment flow end-to-end**: Complete payment flow from initiation to confirmation
- [x] **Verify USDC on Base integration**: Real USDC contract interaction on Base network
- [x] **Check transaction confirmations**: Real-time confirmation tracking with receipt validation
- [x] **Test error handling**: Comprehensive error scenarios including insufficient balance, network errors, and timeouts

## 🔄 X402 Payment Flow

1. **Resource Request**: Client requests a protected resource
2. **402 Response**: Server responds with HTTP 402 Payment Required
3. **Payment Processing**: Client processes USDC payment on Base network
4. **Transaction Confirmation**: Wait for blockchain confirmation
5. **Retry with Proof**: Retry request with payment transaction hash
6. **Access Granted**: Server verifies payment and grants access

## 🎯 Usage Examples

### Direct USDC Payment

```typescript
import { usePayment } from '@/hooks/usePayment'

function PaymentComponent() {
  const { processPayment, paymentStatus } = usePayment()

  const handlePayment = async () => {
    await processPayment({
      amount: '10.00',
      recipient: '0x742d35Cc6634C0532925a3b8D0C9e3e0C8b4c8e8',
      description: 'Service payment'
    })
  }

  return (
    <button onClick={handlePayment}>
      Pay 10 USDC
    </button>
  )
}
```

### X402 Protocol Usage

```typescript
import { usePayment } from '@/hooks/usePayment'

function X402Component() {
  const { processX402Payment } = usePayment()

  const accessResource = async () => {
    try {
      const data = await processX402Payment('https://api.example.com/premium')
      console.log('Resource data:', data)
    } catch (error) {
      console.error('Payment required or failed:', error)
    }
  }

  return (
    <button onClick={accessResource}>
      Access Premium Content
    </button>
  )
}
```

## 🔒 Security Features

- **Client-side signing**: All transactions signed locally in user's wallet
- **Balance verification**: Check USDC balance before attempting payments
- **Transaction validation**: Verify transaction receipts and confirmations
- **Error boundaries**: Graceful error handling and recovery
- **Type safety**: Full TypeScript coverage for contract interactions

## 🌐 Network Configuration

The application supports Base network with the following configuration:

```typescript
// Base mainnet
const base = {
  id: 8453,
  name: 'Base',
  network: 'base',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://mainnet.base.org'] },
    public: { http: ['https://mainnet.base.org'] }
  },
  blockExplorers: {
    default: { name: 'BaseScan', url: 'https://basescan.org' }
  }
}
```

## 📚 API Reference

### usePayment Hook

```typescript
const {
  paymentStatus,      // Current payment status
  isConnected,        // Wallet connection status
  address,            // Connected wallet address
  getUSDCBalance,     // Get USDC balance
  processPayment,     // Process direct payment
  processX402Payment, // Process X402 payment
  resetPaymentStatus  // Reset payment state
} = usePayment()
```

### X402PaymentService

```typescript
const service = new X402PaymentService({
  baseUrl: 'https://api.x402.example.com',
  apiKey: 'your-api-key',
  timeout: 30000
})

// Initiate payment
await service.initiatePayment(paymentRequest)

// Verify payment
await service.verifyPayment(transactionHash)

// Process X402 flow
await service.processX402Payment(resourceUrl)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- [Base Network](https://base.org/)
- [USDC on Base](https://basescan.org/token/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
- [Wagmi Documentation](https://wagmi.sh/)
- [RainbowKit Documentation](https://www.rainbowkit.com/)
- [X402 Protocol Specification](https://tools.ietf.org/html/rfc7234#section-6.5.2)
