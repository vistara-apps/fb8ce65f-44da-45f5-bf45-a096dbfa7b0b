import { NextRequest, NextResponse } from 'next/server';
import { searchRightsModules, searchTemplates } from '@/lib/supabase';
import { enhanceSearchQuery, analyzeUserQuery } from '@/lib/openai';
import { SearchResult } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    // Analyze the user's query to understand intent
    const analysis = await analyzeUserQuery(query);
    
    // Enhance the search query with related terms
    const enhancedTerms = await enhanceSearchQuery(query);
    const allSearchTerms = [query, ...enhancedTerms];

    // Search both rights modules and templates
    const [rightsModules, templates] = await Promise.all([
      searchRightsModules(query),
      searchTemplates(query),
    ]);

    // Combine and score results
    const combinedResults: SearchResult[] = [
      ...rightsModules.map((module) => ({
        type: 'module' as const,
        item: module,
        relevanceScore: calculateRelevanceScore(module, allSearchTerms, analysis),
      })),
      ...templates.map((template) => ({
        type: 'template' as const,
        item: template,
        relevanceScore: calculateRelevanceScore(template, allSearchTerms, analysis),
      })),
    ];

    // Sort by relevance score
    combinedResults.sort((a, b) => b.relevanceScore - a.relevanceScore);

    return NextResponse.json({
      success: true,
      data: {
        results: combinedResults,
        total: combinedResults.length,
        analysis,
        enhancedTerms,
      },
    });

  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Calculate relevance score based on query match and user intent
function calculateRelevanceScore(
  item: any,
  searchTerms: string[],
  analysis: { intent: string; category: string; confidence: number }
): number {
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
}
