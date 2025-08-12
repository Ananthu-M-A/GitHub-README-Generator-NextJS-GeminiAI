// app/lib/openai.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateReadmeContent(repositoryData: any): Promise<string> {
  const prompt = `
Generate a comprehensive and engaging README.md file for this GitHub repository:

Repository Name: ${repositoryData.name}
Description: ${repositoryData.description}
Main Language: ${repositoryData.language}
Languages Used: ${Object.keys(repositoryData.languages).join(', ')}
Dependencies: ${JSON.stringify(repositoryData.dependencies, null, 2)}

Please create a README that includes:
1. Project title and description
2. Features list
3. Installation instructions
4. Usage examples
5. Contributing guidelines
6. License information

Make it engaging and professional while being informative.
Format as markdown.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert technical writer who creates exceptional README files for software projects."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    return completion.choices.message.content || '';
  } catch (error) {
    throw new Error('Failed to generate README content');
  }
}
