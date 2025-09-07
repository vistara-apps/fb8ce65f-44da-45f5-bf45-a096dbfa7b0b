'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/AppShell';
import { SearchInput } from '@/components/SearchInput';
import { RightsModuleCard } from '@/components/RightsModuleCard';
import { TemplateCard } from '@/components/TemplateCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useSearch } from '@/hooks/useSearch';
import { useUser } from '@/hooks/useUser';
import { RightsModule, Template } from '@/types';
import { Scale, Search, FileText, BookOpen, Users, Shield, Home, Zap } from 'lucide-react';

// Mock data for demonstration
const mockRightsModules: RightsModule[] = [
  {
    id: '1',
    title: 'Tenant Rights: Security Deposit Issues',
    summary: 'Understanding your rights regarding security deposits, including when landlords can withhold deposits and how to get them back.',
    detailedContent: 'Security deposits are governed by state law and typically must be returned within 14-30 days after move-out. Landlords can only withhold deposits for specific reasons like unpaid rent, cleaning beyond normal wear and tear, or repairs for tenant-caused damage. Always document the condition of your rental unit with photos when moving in and out.',
    tags: ['security deposit', 'landlord', 'rental', 'move-out'],
    type: 'tenant'
  },
  {
    id: '2',
    title: 'Workplace Rights: Overtime Pay',
    summary: 'Know your rights to overtime compensation and when employers must pay time-and-a-half wages.',
    detailedContent: 'Under the Fair Labor Standards Act (FLSA), non-exempt employees must receive overtime pay at 1.5 times their regular rate for hours worked over 40 in a workweek. Some states have daily overtime requirements. Certain employees are exempt from overtime, including executives, professionals, and administrative workers who meet specific criteria.',
    tags: ['overtime', 'wages', 'FLSA', 'employment'],
    type: 'workplace'
  },
  {
    id: '3',
    title: 'Consumer Rights: Warranty Protection',
    summary: 'Understanding warranty rights for purchases and how to enforce them when products fail.',
    detailedContent: 'Consumers have rights under both express warranties (written guarantees) and implied warranties (automatic protections). The Magnuson-Moss Warranty Act provides federal protection for consumer warranties. If a product fails during the warranty period, you may be entitled to repair, replacement, or refund.',
    tags: ['warranty', 'consumer protection', 'purchases', 'refund'],
    type: 'consumer'
  }
];

const mockTemplates: Template[] = [
  {
    id: '1',
    title: 'Security Deposit Demand Letter',
    body: 'Dear [Landlord Name],\n\nI am writing to formally request the return of my security deposit in the amount of $[Amount] for the rental property located at [Property Address]. I vacated the premises on [Move-out Date], which was [Number] days ago.\n\nAccording to [State] law, security deposits must be returned within [Time Period] days of move-out, along with an itemized list of any deductions...',
    usageInstructions: 'Use this template when your landlord has not returned your security deposit within the legally required timeframe. Fill in the bracketed information with your specific details.',
    category: 'demand_letter'
  },
  {
    id: '2',
    title: 'Wage Complaint Form',
    body: 'TO: [Employer Name]\nFROM: [Your Name]\nDATE: [Date]\nRE: Unpaid Wages Complaint\n\nI am writing to formally notify you of unpaid wages owed to me. The details are as follows:\n\nPay Period(s): [Dates]\nHours Worked: [Total Hours]\nRegular Rate: $[Rate]/hour\nOvertime Hours: [OT Hours]\nOvertime Rate: $[OT Rate]/hour...',
    usageInstructions: 'Use this template to formally request unpaid wages from your employer. Document all hours worked and rates of pay.',
    category: 'complaint_form'
  }
];

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState<'home' | 'search' | 'templates' | 'saved' | 'profile'>('home');
  const [selectedModule, setSelectedModule] = useState<RightsModule | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  
  const { query, setQuery, results, isLoading, handleSearch } = useSearch();
  const { user, saveModule, unsaveModule, isModuleSaved } = useUser('demo-user-123');

  const handleModuleView = (moduleId: string) => {
    const module = mockRightsModules.find(m => m.id === moduleId);
    if (module) {
      setSelectedModule(module);
    }
  };

  const handleTemplatePreview = (templateId: string) => {
    const template = mockTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
    }
  };

  const handleTemplatePurchase = (templateId: string) => {
    setShowPaymentDialog(true);
  };

  const renderHomePage = () => (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center mb-4">
          <Scale className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-display">Welcome to Legalo</h1>
        <p className="text-muted-foreground text-lg">
          Your Pocket Rights Navigator
        </p>
        <p className="text-body max-w-md mx-auto">
          Get instant access to legal rights information and actionable guidance for everyday situations.
        </p>
      </div>

      {/* Quick Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Quick Search
          </CardTitle>
          <CardDescription>
            Search for rights information or legal templates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SearchInput
            value={query}
            onChange={setQuery}
            onSearch={(q) => {
              handleSearch(q);
              setCurrentPage('search');
            }}
            placeholder="e.g., security deposit, overtime pay, warranty..."
          />
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card variant="interactive" onClick={() => setCurrentPage('search')}>
          <CardContent className="pt-6 text-center">
            <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold">Browse Rights</h3>
            <p className="text-sm text-muted-foreground">
              Explore rights by category
            </p>
          </CardContent>
        </Card>
        
        <Card variant="interactive" onClick={() => setCurrentPage('templates')}>
          <CardContent className="pt-6 text-center">
            <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold">Legal Templates</h3>
            <p className="text-sm text-muted-foreground">
              Ready-to-use documents
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Featured Rights Modules */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Popular Rights Topics</h2>
        <div className="space-y-4">
          {mockRightsModules.slice(0, 2).map((module) => (
            <RightsModuleCard
              key={module.id}
              module={module}
              isSaved={isModuleSaved(module.id)}
              onSave={saveModule}
              onUnsave={unsaveModule}
              onView={handleModuleView}
            />
          ))}
        </div>
      </div>

      {/* Legal Disclaimer */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800 mb-1">Legal Disclaimer</h3>
              <p className="text-sm text-amber-700">
                This information is for educational purposes only and does not constitute legal advice. 
                For specific legal matters, please consult with a qualified attorney.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSearchPage = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-display mb-2">Search Rights & Templates</h1>
        <p className="text-muted-foreground">
          Find information and documents for your legal needs
        </p>
      </div>

      <SearchInput
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
        placeholder="Search for rights information or templates..."
      />

      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="pt-6">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Search Results ({results.length})</h2>
          {results.map((result, index) => (
            <div key={`${result.type}-${result.item.id}`}>
              {result.type === 'module' ? (
                <RightsModuleCard
                  module={result.item as RightsModule}
                  isSaved={isModuleSaved(result.item.id)}
                  onSave={saveModule}
                  onUnsave={unsaveModule}
                  onView={handleModuleView}
                />
              ) : (
                <TemplateCard
                  template={result.item as Template}
                  onPreview={handleTemplatePreview}
                  onPurchase={handleTemplatePurchase}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {!isLoading && query && results.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground">
              Try different keywords or browse our categories
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderTemplatesPage = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-display mb-2">Legal Templates</h1>
        <p className="text-muted-foreground">
          Professional templates for common legal situations
        </p>
      </div>

      <div className="space-y-4">
        {mockTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onPreview={handleTemplatePreview}
            onPurchase={handleTemplatePurchase}
          />
        ))}
      </div>
    </div>
  );

  const renderSavedPage = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-display mb-2">Saved Items</h1>
        <p className="text-muted-foreground">
          Your bookmarked rights information
        </p>
      </div>

      {user?.savedRights.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No saved items yet</h3>
            <p className="text-muted-foreground mb-4">
              Save rights modules for quick access later
            </p>
            <Button onClick={() => setCurrentPage('search')}>
              Browse Rights
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {mockRightsModules
            .filter(module => user?.savedRights.includes(module.id))
            .map((module) => (
              <RightsModuleCard
                key={module.id}
                module={module}
                isSaved={true}
                onUnsave={unsaveModule}
                onView={handleModuleView}
              />
            ))}
        </div>
      )}
    </div>
  );

  const renderProfilePage = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-display mb-2">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Farcaster ID</label>
            <p className="text-muted-foreground">{user?.fID || 'Not connected'}</p>
          </div>
          <div>
            <label className="text-sm font-medium">Wallet Address</label>
            <p className="text-muted-foreground">
              {user?.walletAddress || 'Not connected'}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium">Saved Rights</label>
            <p className="text-muted-foreground">
              {user?.savedRights.length || 0} items saved
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About Legalo</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Legalo provides accessible legal rights information and templates to help you 
            navigate everyday legal situations with confidence.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="h-4 w-4" />
            <span>Powered by AI and legal expertise</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return renderHomePage();
      case 'search':
        return renderSearchPage();
      case 'templates':
        return renderTemplatesPage();
      case 'saved':
        return renderSavedPage();
      case 'profile':
        return renderProfilePage();
      default:
        return renderHomePage();
    }
  };

  return (
    <>
      <AppShell currentPage={currentPage} onNavigate={setCurrentPage}>
        {renderCurrentPage()}
      </AppShell>

      {/* Rights Module Detail Dialog */}
      <Dialog open={!!selectedModule} onOpenChange={() => setSelectedModule(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedModule?.title}</DialogTitle>
            <DialogDescription>
              Detailed information about your rights
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Summary</h3>
              <p className="text-sm text-muted-foreground">
                {selectedModule?.summary}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Detailed Information</h3>
              <p className="text-sm leading-relaxed">
                {selectedModule?.detailedContent}
              </p>
            </div>
            {selectedModule?.tags && (
              <div>
                <h3 className="font-semibold mb-2">Related Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedModule.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-sm text-xs bg-accent text-accent-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                <Shield className="h-3 w-3 inline mr-1" />
                This information is for educational purposes only and does not constitute legal advice.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Template Preview Dialog */}
      <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedTemplate?.title}</DialogTitle>
            <DialogDescription>
              Template preview and usage instructions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Usage Instructions</h3>
              <p className="text-sm text-muted-foreground">
                {selectedTemplate?.usageInstructions}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Template Content</h3>
              <div className="bg-muted p-4 rounded-md">
                <pre className="text-sm whitespace-pre-wrap font-mono">
                  {selectedTemplate?.body}
                </pre>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={() => setShowPaymentDialog(true)} className="flex-1">
                Purchase Template
              </Button>
              <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Purchase Template</DialogTitle>
            <DialogDescription>
              Complete your purchase to download this template
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold">$0.99 USDC</div>
              <p className="text-sm text-muted-foreground">One-time purchase</p>
            </div>
            <div className="space-y-2">
              <Button className="w-full" size="lg">
                Pay with Wallet
              </Button>
              <Button variant="outline" className="w-full">
                Connect Wallet First
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Secure payment powered by Base network
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
