import OpenAI from 'openai';
import { RightsModule, Template } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateRightsSummary(query: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a legal rights assistant. Provide clear, accurate, and helpful information about legal rights. Always include disclaimers that this is not legal advice and users should consult with qualified attorneys for specific legal matters."
        },
        {
          role: "user",
          content: `Provide a brief summary about legal rights related to: ${query}`
        }
      ],
      max_tokens: 300,
      temperature: 0.3,
    });

    return completion.choices[0]?.message?.content || "Unable to generate summary at this time.";
  } catch (error) {
    console.error('Error generating rights summary:', error);
    return "Unable to generate summary at this time. Please try again later.";
  }
}

export async function enhanceSearchQuery(query: string): Promise<string[]> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a search query enhancer for legal rights information. Generate related search terms and synonyms that would help find relevant legal rights information."
        },
        {
          role: "user",
          content: `Generate 5 related search terms for: ${query}. Return only the terms separated by commas.`
        }
      ],
      max_tokens: 100,
      temperature: 0.5,
    });

    const response = completion.choices[0]?.message?.content || "";
    return response.split(',').map(term => term.trim()).filter(term => term.length > 0);
  } catch (error) {
    console.error('Error enhancing search query:', error);
    return [];
  }
}

export async function customizeTemplate(template: Template, userContext: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a legal document assistant. Help customize legal templates based on user context while maintaining legal accuracy. Always include appropriate disclaimers."
        },
        {
          role: "user",
          content: `Customize this legal template based on the user's context:

Template: ${template.body}

User Context: ${userContext}

Instructions: ${template.usageInstructions}

Please customize the template while keeping all legal language intact and adding appropriate placeholders for user-specific information.`
        }
      ],
      max_tokens: 800,
      temperature: 0.2,
    });

    return completion.choices[0]?.message?.content || template.body;
  } catch (error) {
    console.error('Error customizing template:', error);
    return template.body;
  }
}

export async function generateScenarioGuidance(scenario: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a legal rights advisor. Provide step-by-step guidance for common legal scenarios. Always emphasize the importance of consulting with qualified legal professionals and include appropriate disclaimers."
        },
        {
          role: "user",
          content: `Provide step-by-step guidance for this legal scenario: ${scenario}

Please structure your response as a numbered list of actionable steps.`
        }
      ],
      max_tokens: 500,
      temperature: 0.3,
    });

    return completion.choices[0]?.message?.content || "Unable to generate guidance at this time.";
  } catch (error) {
    console.error('Error generating scenario guidance:', error);
    return "Unable to generate guidance at this time. Please try again later.";
  }
}

export async function analyzeUserQuery(query: string): Promise<{
  intent: 'search' | 'template' | 'guidance' | 'general';
  category: 'tenant' | 'workplace' | 'consumer' | 'general';
  confidence: number;
}> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Analyze user queries for legal rights assistance and return a JSON response with:
- intent: 'search' (looking for information), 'template' (needs a document), 'guidance' (needs step-by-step help), or 'general'
- category: 'tenant' (housing/rental), 'workplace' (employment), 'consumer' (purchases/services), or 'general'
- confidence: number between 0 and 1

Return only valid JSON.`
        },
        {
          role: "user",
          content: query
        }
      ],
      max_tokens: 100,
      temperature: 0.1,
    });

    const response = completion.choices[0]?.message?.content || "";
    try {
      return JSON.parse(response);
    } catch {
      return { intent: 'general', category: 'general', confidence: 0.5 };
    }
  } catch (error) {
    console.error('Error analyzing user query:', error);
    return { intent: 'general', category: 'general', confidence: 0.5 };
  }
}
