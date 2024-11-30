import { DeveloperExperienceDailyEntity } from "~/app/api/types";
import { db } from "~/server/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ email: string }> }
) {

  const email: string = (await params).email;
  const records: DeveloperExperienceDailyEntity[] = await db.developerExperienceBasedDaily.findMany({
    where: {
      name: email,
    },
  });

  const descriptions = records.map((item) => JSON.parse(item.short_description))[0];
  const response = {
    email: email,
    short_descriptions: descriptions,
  };


  return Response.json(response);
}
