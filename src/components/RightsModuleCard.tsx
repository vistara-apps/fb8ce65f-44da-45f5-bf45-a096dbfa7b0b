import React from 'react';
import { Bookmark, BookmarkCheck, Eye, Tag } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RightsModule } from '@/types';
import { cn, truncateText, capitalizeFirst } from '@/lib/utils';

interface RightsModuleCardProps {
  module: RightsModule;
  isSaved?: boolean;
  onSave?: (moduleId: string) => void;
  onUnsave?: (moduleId: string) => void;
  onView?: (moduleId: string) => void;
  className?: string;
}

export function RightsModuleCard({
  module,
  isSaved = false,
  onSave,
  onUnsave,
  onView,
  className,
}: RightsModuleCardProps) {
  const handleSaveToggle = () => {
    if (isSaved && onUnsave) {
      onUnsave(module.id);
    } else if (!isSaved && onSave) {
      onSave(module.id);
    }
  };

  const handleView = () => {
    if (onView) {
      onView(module.id);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'tenant':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'workplace':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'consumer':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card variant="interactive" className={cn("h-full", className)} onClick={handleView}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight mb-2">
              {module.title}
            </CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <span className={cn(
                "inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium border",
                getTypeColor(module.type)
              )}>
                <Tag className="w-3 h-3 mr-1" />
                {capitalizeFirst(module.type)}
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleSaveToggle();
            }}
            className="ml-2 h-8 w-8 p-0"
          >
            {isSaved ? (
              <BookmarkCheck className="h-4 w-4 text-primary" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
            <span className="sr-only">
              {isSaved ? 'Remove from saved' : 'Save for later'}
            </span>
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <CardDescription className="text-sm leading-relaxed mb-4">
          {truncateText(module.summary, 120)}
        </CardDescription>
        
        {module.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {module.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-sm text-xs bg-accent text-accent-foreground"
              >
                {tag}
              </span>
            ))}
            {module.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-sm text-xs text-muted-foreground">
                +{module.tags.length - 3} more
              </span>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleView();
            }}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            View Details
          </Button>
          
          <span className="text-xs text-muted-foreground">
            {module.detailedContent.length > 500 ? 'Detailed guide' : 'Quick reference'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
