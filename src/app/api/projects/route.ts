import { db } from "~/server/db";

export async function GET() {
    const projects = await db.project.findMany({
        include: {
            techStack: {
                include: {
                    technicalSkill: true,
                },
            },
            client: true,
            position: true,
        },
    });

    return new Response(JSON.stringify(projects), {
        headers: { "Content-Type": "application/json" },
    });
}