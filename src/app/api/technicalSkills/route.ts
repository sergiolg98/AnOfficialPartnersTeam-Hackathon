import { db } from "~/server/db";

export async function GET(request: Request) {
    try {
        const technicalSkills = await db.technicalSkill.findMany();

        return new Response(JSON.stringify(technicalSkills), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
        return new Response('Error al obtener los skills técnicos', {
            status: 500,
        });
    }
}
