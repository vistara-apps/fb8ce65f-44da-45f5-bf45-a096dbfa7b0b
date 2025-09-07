import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export const aiModel = openai('gpt-4-turbo-preview');

export async function generateRightsSummary(query: string): Promise<string> {
  try {
    const { text } = await generateText({
      model: aiModel,
      prompt: `You are a legal rights expert. Provide a clear, concise summary of legal rights related to: "${query}". 
      Focus on practical, actionable information that a regular person can understand. 
      Keep it under 200 words and include key points they should know.`,
    });
    
    return text;
  } catch (error) {
    console.error('Error generating rights summary:', error);
    return 'Unable to generate summary at this time. Please try again later.';
  }
}

export async function customizeTemplate(template: string, userContext: string): Promise<string> {
  try {
    const { text } = await generateText({
      model: aiModel,
      prompt: `Customize this legal template based on the user's context:
      
      Template: ${template}
      
      User Context: ${userContext}
      
      Provide a customized version that maintains legal accuracy while being specific to their situation. 
      Keep the formal tone but make it relevant to their specific case.`,
    });
    
    return text;
  } catch (error) {
    console.error('Error customizing template:', error);
    return template; // Return original template if customization fails
  }
}

export async function parseUserQuery(query: string): Promise<{
  category: string;
  keywords: string[];
  intent: 'search' | 'template' | 'guidance';
}> {
  try {
    const { text } = await generateText({
      model: aiModel,
      prompt: `Analyze this user query about legal rights: "${query}"
      
      Return a JSON object with:
      - category: one of "tenant", "workplace", "consumer", "family", "criminal", "general"
      - keywords: array of relevant search terms
      - intent: "search" for information lookup, "template" for document needs, "guidance" for step-by-step help
      
      Example: {"category": "tenant", "keywords": ["rent", "deposit", "eviction"], "intent": "search"}`,
    });
    
    return JSON.parse(text);
  } catch (error) {
    console.error('Error parsing user query:', error);
    return {
      category: 'general',
      keywords: [query],
      intent: 'search'
    };
  }
}
