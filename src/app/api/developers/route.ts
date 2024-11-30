import { db } from "~/server/db";

export async function POST(request: Request) {
    const res = await request.json();
    await db.post.create({
        data: {
            name: JSON.stringify(res),
        }
    })
    return Response.json({ res })
}
