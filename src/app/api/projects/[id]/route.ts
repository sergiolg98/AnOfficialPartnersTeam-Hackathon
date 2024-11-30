import { generateText } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';
import { db } from "~/server/db";

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
  
  const projectId = (await params).id // 'a', 'b', or 'c'

  // necesito la descriptioin del proyecto y su position
   const projectFound = await db.project.findUniqueOrThrow({
    where: {
      id: Number(projectId),
    },
    include: {
        position: true,
    }
  });

  if(!projectFound) return

   const projectPosition = projectFound.position?.name;

   const developerWithSamePosition = await db.developer.findMany({
        where: {
            position: projectPosition
        }
   });

   // This only gets the dev email and the dev dailys standups
   const developersBasedOnDailys = await db.developerExperienceBasedDaily.findMany({
        where: {
            name: {
                in: developerWithSamePosition.map(dev => dev.email) 
            },
        }
   });

  return Response.json(developersBasedOnDailys);
}
