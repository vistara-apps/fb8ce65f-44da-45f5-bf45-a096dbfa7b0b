# Legalo - Your Pocket Rights Navigator

A production-ready Next.js Base Mini App that provides easily accessible and understandable legal rights information and actionable guidance for everyday situations within a Farcaster frame.

## 🚀 Features

### Core Features
- **Rights Knowledge Base**: Curated collection of common rights scenarios (tenant disputes, workplace issues, consumer protections)
- **Scenario-Specific Guidance**: Interactive checklists and step-by-step guides for specific rights-related situations
- **Dispute Resolution Templates**: Pre-written, customizable letter templates for common disputes

### Technical Features
- **AI-Powered Search**: Enhanced search with OpenAI integration for better query understanding
- **Smart Categorization**: Automatic categorization of rights by type (tenant, workplace, consumer, general)
- **User Personalization**: Save rights modules and templates for quick access
- **Micro-transactions**: USDC payments on Base network for premium templates
- **Responsive Design**: Mobile-first design optimized for Farcaster frames

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Privy (Farcaster integration)
- **AI**: OpenAI GPT-3.5-turbo
- **Blockchain**: Base network, USDC payments
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd legalo-base-miniapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   
   # Privy Configuration
   NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id_here
   
   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key_here
   
   # Base Network Configuration
   NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
   
   # Application Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up the database**
   
   Create the following tables in your Supabase database:

   ```sql
   -- Users table
   CREATE TABLE users (
     "fID" TEXT PRIMARY KEY,
     "walletAddress" TEXT,
     "savedRights" TEXT[] DEFAULT '{}'::TEXT[],
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Rights modules table
   CREATE TABLE rights_modules (
     id TEXT PRIMARY KEY,
     title TEXT NOT NULL,
     summary TEXT NOT NULL,
     "detailedContent" TEXT NOT NULL,
     tags TEXT[] DEFAULT '{}'::TEXT[],
     type TEXT NOT NULL CHECK (type IN ('tenant', 'workplace', 'consumer', 'general')),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Templates table
   CREATE TABLE templates (
     id TEXT PRIMARY KEY,
     title TEXT NOT NULL,
     body TEXT NOT NULL,
     "usageInstructions" TEXT NOT NULL,
     category TEXT NOT NULL CHECK (category IN ('demand_letter', 'complaint_form', 'notice', 'general')),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable Row Level Security
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   ALTER TABLE rights_modules ENABLE ROW LEVEL SECURITY;
   ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

   -- Create policies (adjust based on your security requirements)
   CREATE POLICY "Users can view their own data" ON users FOR ALL USING (true);
   CREATE POLICY "Rights modules are viewable by everyone" ON rights_modules FOR SELECT USING (true);
   CREATE POLICY "Templates are viewable by everyone" ON templates FOR SELECT USING (true);
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── search/        # Search functionality
│   │   ├── templates/     # Template management
│   │   └── modules/       # Rights modules
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main application
├── components/            # React components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── AppShell.tsx      # Main app layout
│   ├── SearchInput.tsx   # Search component
│   ├── RightsModuleCard.tsx
│   └── TemplateCard.tsx
├── hooks/                # Custom React hooks
│   ├── useSearch.ts      # Search functionality
│   └── useUser.ts        # User management
├── lib/                  # Utility libraries
│   ├── supabase.ts       # Database operations
│   ├── openai.ts         # AI integration
│   └── utils.ts          # Helper functions
└── types/                # TypeScript type definitions
    └── index.ts
```

## 🎨 Design System

The app follows a consistent design system based on the specifications:

### Colors
- **Primary**: `hsl(240 80% 50%)` - Blue for primary actions
- **Accent**: `hsl(170 80% 45%)` - Teal for highlights
- **Background**: `hsl(220 20% 98%)` - Light gray background
- **Surface**: `hsl(220 20% 100%)` - White surfaces

### Typography
- **Display**: `text-3xl font-semibold` - For headings
- **Body**: `text-base leading-6` - For body text

### Spacing
- **Small**: `8px`
- **Medium**: `12px`
- **Large**: `24px`

### Components
- **AppShell**: Main application layout with navigation
- **Card**: Content containers with interactive variants
- **Button**: Primary, secondary, and outline variants
- **SearchInput**: Enhanced search with debouncing
- **Accordion**: Collapsible content sections
- **Modal**: Dialog overlays for detailed content

## 🔧 API Endpoints

### Search
- `GET /api/search?q={query}` - Search rights modules and templates

### Templates
- `GET /api/templates/{id}` - Get template by ID
- `POST /api/templates/{id}` - Customize template with user context

### Modules
- `GET /api/modules/{id}` - Get rights module by ID

## 🔐 Authentication & Payments

### Privy Integration
- Farcaster ID authentication
- Wallet connection for payments
- User profile management

### Base Network Payments
- USDC micro-transactions
- Template purchases ($0.99 USDC)
- Secure on-chain payments

## 🤖 AI Features

### OpenAI Integration
- Query analysis and intent detection
- Search query enhancement
- Template customization
- Scenario-specific guidance generation

### Smart Search
- Relevance scoring based on user intent
- Category-aware results
- Enhanced query suggestions

## 📱 Mobile Optimization

- Mobile-first responsive design
- Touch-friendly interface
- Optimized for Farcaster frames
- Progressive Web App features

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production
```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_key
NEXT_PUBLIC_PRIVY_APP_ID=your_production_privy_app_id
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build for production
npm run build
```

## 📄 Legal Disclaimer

This application provides educational information about legal rights and is not intended as legal advice. Users should consult with qualified attorneys for specific legal matters.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation
- Review the code comments for implementation details

---

**Legalo** - Empowering users with accessible legal rights information 🏛️⚖️
