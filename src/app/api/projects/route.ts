import { db } from "~/server/db";
import { NextRequest } from 'next/server';
import { Project } from "@prisma/client";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('id');

    if (projectId) {
        const project = await db.project.findUnique({
            where: { id: Number(projectId) },
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

        return new Response(JSON.stringify(project), {
            headers: { "Content-Type": "application/json" },
        });
    } else {
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
}

export async function POST(request: Request) {
    try {
        const { name, projectDescription, techStack, clientId, positionId } = await request.json();

        const newProject = await db.project.create({
            data: {
                name,
                projectDescription,
                status: 'PENDING',
                techStack: {
                    create: techStack.map((skill: { technicalSkillId: number }) => ({
                        technicalSkillId: skill.technicalSkillId
                    }))
                },
                client: clientId ? { connect: { id: clientId } } : undefined,
                position: positionId ? { connect: { id: positionId } } : undefined,
            },
        });

        return new Response(JSON.stringify(newProject), {
            status: 201, 
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
        return new Response('Error al crear el proyecto', {
            status: 500,
        });
    }
}