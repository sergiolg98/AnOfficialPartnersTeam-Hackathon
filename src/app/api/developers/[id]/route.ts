import { generateText } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const openai = createOpenAI({
  // custom settings, e.g.
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const { text } = await generateText({
  model: anthropic('claude-3-haiku-20240307'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});

  const model = openai.embedding('text-embedding-3-large', {
    dimensions: 512 // optional, number of dimensions for the embedding
  })

  const result = await model.doEmbed({values: [text]})
  
  const slug = (await params).id // 'a', 'b', or 'c'
  return Response.json({ message: `${slug} ${text} ${JSON.stringify(result.embeddings)}` });
}
