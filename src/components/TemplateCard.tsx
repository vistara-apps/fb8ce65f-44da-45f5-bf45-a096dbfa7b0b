import React from 'react';
import { FileText, Download, DollarSign, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Template } from '@/types';
import { cn, truncateText, capitalizeFirst, formatCurrency } from '@/lib/utils';

interface TemplateCardProps {
  template: Template;
  onPreview?: (templateId: string) => void;
  onPurchase?: (templateId: string) => void;
  className?: string;
  isPremium?: boolean;
  price?: number;
}

export function TemplateCard({
  template,
  onPreview,
  onPurchase,
  className,
  isPremium = true,
  price = 0.99,
}: TemplateCardProps) {
  const handlePreview = () => {
    if (onPreview) {
      onPreview(template.id);
    }
  };

  const handlePurchase = () => {
    if (onPurchase) {
      onPurchase(template.id);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'demand_letter':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'complaint_form':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'notice':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'demand_letter':
        return 'Demand Letter';
      case 'complaint_form':
        return 'Complaint Form';
      case 'notice':
        return 'Notice';
      default:
        return capitalizeFirst(category);
    }
  };

  return (
    <Card variant="interactive" className={cn("h-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight mb-2 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              {template.title}
            </CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <span className={cn(
                "inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium border",
                getCategoryColor(template.category)
              )}>
                {getCategoryLabel(template.category)}
              </span>
              {isPremium && (
                <span className="inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium bg-primary text-primary-foreground">
                  <DollarSign className="w-3 h-3 mr-1" />
                  {formatCurrency(price)}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <CardDescription className="text-sm leading-relaxed mb-4">
          {truncateText(template.usageInstructions, 100)}
        </CardDescription>
        
        <div className="bg-muted/50 rounded-md p-3 mb-4">
          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
            <Info className="h-3 w-3" />
            Template Preview:
          </p>
          <p className="text-sm font-mono leading-relaxed">
            {truncateText(template.body, 80)}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreview}
            className="flex items-center gap-2 flex-1"
          >
            <FileText className="h-4 w-4" />
            Preview
          </Button>
          
          {isPremium ? (
            <Button
              variant="primary"
              size="sm"
              onClick={handlePurchase}
              className="flex items-center gap-2 flex-1"
            >
              <DollarSign className="h-4 w-4" />
              Purchase
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={handlePurchase}
              className="flex items-center gap-2 flex-1"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          )}
        </div>
        
        {isPremium && (
          <p className="text-xs text-muted-foreground mt-2 text-center">
            One-time purchase • Instant download
          </p>
        )}
      </CardContent>
    </Card>
  );
}
