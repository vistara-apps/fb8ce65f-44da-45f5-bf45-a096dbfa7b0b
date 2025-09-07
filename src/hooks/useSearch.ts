import { useState, useCallback, useEffect } from 'react';
import { RightsModule, Template, SearchResult } from '@/types';
import { searchRightsModules, searchTemplates } from '@/lib/supabase';
import { enhanceSearchQuery, analyzeUserQuery } from '@/lib/openai';
import { debounce } from '@/lib/utils';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Analyze the user's query to understand intent
        const analysis = await analyzeUserQuery(searchQuery);
        
        // Enhance the search query with related terms
        const enhancedTerms = await enhanceSearchQuery(searchQuery);
        const allSearchTerms = [searchQuery, ...enhancedTerms];

        // Search both rights modules and templates
        const [rightsModules, templates] = await Promise.all([
          searchRightsModules(searchQuery),
          searchTemplates(searchQuery),
        ]);

        // Combine and score results
        const combinedResults: SearchResult[] = [
          ...rightsModules.map((module: RightsModule) => ({
            type: 'module' as const,
            item: module,
            relevanceScore: calculateRelevanceScore(module, allSearchTerms, analysis),
          })),
          ...templates.map((template: Template) => ({
            type: 'template' as const,
            item: template,
            relevanceScore: calculateRelevanceScore(template, allSearchTerms, analysis),
          })),
        ];

        // Sort by relevance score
        combinedResults.sort((a, b) => b.relevanceScore - a.relevanceScore);

        setResults(combinedResults);
        
        // Add to search history
        setSearchHistory(prev => {
          const newHistory = [searchQuery, ...prev.filter(q => q !== searchQuery)];
          return newHistory.slice(0, 10); // Keep only last 10 searches
        });

      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to search. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  // Calculate relevance score based on query match and user intent
  const calculateRelevanceScore = (
    item: RightsModule | Template,
    searchTerms: string[],
    analysis: { intent: string; category: string; confidence: number }
  ): number => {
    let score = 0;

    // Base score from text matching
    const itemText = `${item.title} ${('summary' in item ? item.summary : item.usageInstructions)}`.toLowerCase();
    
    searchTerms.forEach(term => {
      const termLower = term.toLowerCase();
      if (itemText.includes(termLower)) {
        score += termLower === searchTerms[0].toLowerCase() ? 10 : 5; // Higher score for original query
      }
    });

    // Boost score based on intent matching
    if (analysis.intent === 'template' && 'category' in item) {
      score += 15;
    } else if (analysis.intent === 'search' && 'type' in item) {
      score += 15;
    }

    // Boost score based on category matching
    if ('type' in item && item.type === analysis.category) {
      score += 10;
    } else if ('category' in item && analysis.category !== 'general') {
      score += 5;
    }

    // Apply confidence multiplier
    score *= analysis.confidence;

    return score;
  };

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    debouncedSearch(searchQuery);
  }, [debouncedSearch]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setError(null);
  }, []);

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
  }, []);

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
    searchHistory,
    handleSearch,
    clearSearch,
    clearHistory,
  };
}
