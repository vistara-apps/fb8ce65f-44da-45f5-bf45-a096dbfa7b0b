// User data model
export interface User {
  fID: string;
  walletAddress?: string;
  savedRights: string[];
}

// Rights module data model
export interface RightsModule {
  id: string;
  title: string;
  summary: string;
  detailedContent: string;
  tags: string[];
  type: 'tenant' | 'workplace' | 'consumer' | 'general';
}

// Template data model
export interface Template {
  id: string;
  title: string;
  body: string;
  usageInstructions: string;
  category: 'demand_letter' | 'complaint_form' | 'notice' | 'general';
}

// Search result interface
export interface SearchResult {
  type: 'module' | 'template';
  item: RightsModule | Template;
  relevanceScore: number;
}

// Payment interface
export interface PaymentRequest {
  amount: number;
  currency: 'USDC';
  itemId: string;
  itemType: 'template' | 'premium_content';
}

// API response interfaces
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
}

// Component prop interfaces
export interface CardProps {
  variant?: 'default' | 'interactive';
  className?: string;
  children: React.ReactNode;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  className?: string;
}

export interface AccordionProps {
  items: Array<{
    id: string;
    title: string;
    content: React.ReactNode;
  }>;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}
