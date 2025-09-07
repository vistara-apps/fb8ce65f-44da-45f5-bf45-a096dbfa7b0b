'use client';

import { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { SearchInput } from '@/components/search-input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, FileText, Scale, Users, Home, CreditCard } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'tenant',
    title: 'Tenant Rights',
    description: 'Rent, deposits, evictions, and housing issues',
    icon: Home,
    color: 'bg-blue-100 text-blue-800',
  },
  {
    id: 'workplace',
    title: 'Workplace Rights',
    description: 'Employment, wages, discrimination, and safety',
    icon: Users,
    color: 'bg-green-100 text-green-800',
  },
  {
    id: 'consumer',
    title: 'Consumer Rights',
    description: 'Purchases, refunds, warranties, and fraud',
    icon: CreditCard,
    color: 'bg-purple-100 text-purple-800',
  },
  {
    id: 'legal',
    title: 'Legal Procedures',
    description: 'Court processes, legal documents, and procedures',
    icon: Scale,
    color: 'bg-orange-100 text-orange-800',
  },
];

const FEATURED_MODULES = [
  {
    id: '1',
    title: 'Security Deposit Rights',
    summary: 'Know your rights when landlords withhold security deposits',
    type: 'tenant',
    isPremium: false,
  },
  {
    id: '2',
    title: 'Workplace Harassment',
    summary: 'Understanding harassment laws and reporting procedures',
    type: 'workplace',
    isPremium: false,
  },
  {
    id: '3',
    title: 'Return & Refund Rights',
    summary: 'Consumer protection laws for returns and refunds',
    type: 'consumer',
    isPremium: false,
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: Implement search functionality
    console.log('Searching for:', query);
  };

  const handleCategoryClick = (categoryId: string) => {
    // TODO: Navigate to category page
    console.log('Category clicked:', categoryId);
  };

  const handleModuleClick = (moduleId: string) => {
    // TODO: Navigate to module page
    console.log('Module clicked:', moduleId);
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Need help with your rights?
          </h2>
          <p className="text-muted-foreground">
            Get instant access to legal information and actionable guidance
          </p>
        </div>

        {/* Search */}
        <SearchInput onSearch={handleSearch} />

        {/* Categories */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Browse by Category</h3>
          <div className="grid grid-cols-2 gap-4">
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <Card
                  key={category.id}
                  variant="interactive"
                  onClick={() => handleCategoryClick(category.id)}
                  className="cursor-pointer"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${category.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{category.title}</h4>
                        <p className="text-xs text-muted-foreground truncate">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Featured Modules */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Popular Rights Modules</h3>
          <div className="space-y-3">
            {FEATURED_MODULES.map((module) => (
              <Card
                key={module.id}
                variant="interactive"
                onClick={() => handleModuleClick(module.id)}
                className="cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium">{module.title}</h4>
                        {module.isPremium && (
                          <Badge variant="secondary" className="text-xs">
                            Premium
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {module.summary}
                      </p>
                    </div>
                    <BookOpen className="h-5 w-5 text-muted-foreground ml-3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
              <FileText className="h-6 w-6" />
              <span className="text-sm">Browse Templates</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
              <Scale className="h-6 w-6" />
              <span className="text-sm">Legal Guidance</span>
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
