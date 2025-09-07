# Legalo - Your Pocket Rights Navigator

Legalo provides easily accessible and understandable legal rights information and actionable guidance for everyday situations within a Farcaster frame.

## Features

- **Rights Knowledge Base**: Curated collection of legal rights scenarios with summaries and detailed information
- **Scenario-Specific Guidance**: Interactive checklists and step-by-step guides for rights-related situations
- **Dispute Resolution Templates**: Pre-written, customizable letter templates for common disputes
- **Farcaster Frame Integration**: Seamless experience within Farcaster social app
- **Micro-transaction Payments**: Pay-per-access for premium templates using USDC on Base
- **AI-Powered Search**: Intelligent search and content generation using OpenAI

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Drizzle ORM, PostgreSQL
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Privy (Farcaster ID + Wallet)
- **AI**: OpenAI GPT-4 for content generation and search
- **Payments**: Base blockchain (USDC)
- **Frames**: frames.js for Farcaster integration

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database (or Supabase account)
- OpenAI API key
- Privy account
- Base RPC access

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd legalo
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in your environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase credentials
- `OPENAI_API_KEY`: OpenAI API key
- `NEXT_PUBLIC_PRIVY_APP_ID`: Privy application ID
- `NEXT_PUBLIC_BASE_RPC_URL`: Base network RPC URL

4. Set up the database:
```bash
npm run db:generate
npm run db:migrate
```

5. Seed the database with sample data:
```bash
npx tsx src/lib/seed.ts
```

6. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── frames/        # Farcaster frame endpoints
│   │   ├── rights-modules/# Rights modules API
│   │   └── templates/     # Templates API
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── app-shell.tsx     # Main app layout
│   └── search-input.tsx  # Search component
├── lib/                  # Utility libraries
│   ├── db/              # Database schema and connection
│   ├── openai.ts        # OpenAI integration
│   ├── supabase.ts      # Supabase client
│   ├── utils.ts         # Utility functions
│   └── seed.ts          # Database seeding
└── types/               # TypeScript type definitions
```

## API Endpoints

### Rights Modules
- `GET /api/rights-modules` - Search and filter rights modules
- `POST /api/rights-modules` - Create new rights module

### Templates
- `GET /api/templates` - Search and filter templates
- `POST /api/templates` - Create new template

### Farcaster Frames
- `GET|POST /api/frames` - Main frame handler
- Frame supports browsing categories, searching, and template access

## Database Schema

### Core Entities

- **Users**: Farcaster user information and saved items
- **RightsModules**: Legal rights information and guidance
- **Templates**: Dispute resolution letter templates
- **UserSaves**: User's saved modules and templates
- **Payments**: Micro-transaction records

## Features Implementation

### Rights Knowledge Base
- Searchable collection of legal rights scenarios
- Categorized by type (tenant, workplace, consumer, etc.)
- Free and premium content tiers

### AI-Powered Features
- Intelligent query parsing and categorization
- Content summarization and generation
- Template customization based on user context

### Payment Integration
- USDC payments on Base blockchain
- Micro-transaction model for premium content
- Wallet integration via Privy

### Farcaster Frame
- Interactive frame experience
- Browse categories and search functionality
- Template preview and purchase flow
- Save functionality for easy access

## Development

### Database Operations
```bash
# Generate migrations
npm run db:generate

# Run migrations
npm run db:migrate

# Open database studio
npm run db:studio
```

### Adding New Rights Modules
1. Add content to the seed file or use the API
2. Include proper categorization and tags
3. Mark premium content appropriately

### Adding New Templates
1. Create template with proper formatting
2. Include usage instructions
3. Set appropriate pricing for premium templates

## Deployment

The application is designed to be deployed on Vercel with:
- Supabase for database hosting
- Environment variables configured in Vercel dashboard
- Automatic deployments from main branch

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Legal Disclaimer

This application provides legal information for educational purposes only and does not constitute legal advice. Users should consult with qualified attorneys for specific legal matters.

## License

[Add your license information here]
