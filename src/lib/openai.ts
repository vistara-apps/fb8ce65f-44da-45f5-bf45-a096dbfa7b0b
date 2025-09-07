import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateRightsSummary(query: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a legal rights expert. Provide clear, accurate, and actionable information about legal rights. Always include disclaimers that this is educational information and not legal advice.`,
        },
        {
          role: 'user',
          content: `Provide a comprehensive summary about: ${query}. Include key rights, common issues, and actionable steps. Keep it under 500 words.`,
        },
      ],
      max_tokens: 800,
      temperature: 0.3,
    });

    return response.choices[0]?.message?.content || 'Unable to generate summary.';
  } catch (error) {
    console.error('Error generating rights summary:', error);
    return 'Unable to generate summary at this time.';
  }
}

export async function categorizeQuery(query: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `Categorize legal rights queries into one of these categories: tenant, workplace, consumer, legal. Respond with only the category name.`,
        },
        {
          role: 'user',
          content: query,
        },
      ],
      max_tokens: 10,
      temperature: 0.1,
    });

    const category = response.choices[0]?.message?.content?.toLowerCase().trim();
    return ['tenant', 'workplace', 'consumer', 'legal'].includes(category || '') 
      ? category! 
      : 'legal';
  } catch (error) {
    console.error('Error categorizing query:', error);
    return 'legal';
  }
}

export async function customizeTemplate(template: string, userContext: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are helping customize legal document templates. Maintain the professional tone and legal structure while incorporating user-specific details. Keep all legal disclaimers and important formatting.`,
        },
        {
          role: 'user',
          content: `Customize this template with the following context: ${userContext}\n\nTemplate:\n${template}`,
        },
      ],
      max_tokens: 1500,
      temperature: 0.2,
    });

    return response.choices[0]?.message?.content || template;
  } catch (error) {
    console.error('Error customizing template:', error);
    return template;
  }
}

export { openai };
