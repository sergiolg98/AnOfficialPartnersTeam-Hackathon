import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const techStackInput = z.array(
  z.object({
    technicalSkillId: z.number(),
  })
);

const createProjectInput = z.object({
  name: z.string(),
  projectDescription: z.string(),
  techStack: techStackInput,
  clientId: z.number().optional(),
  positionId: z.number().optional(),
});

export const projectsRouter = createTRPCRouter({
  // Get all projects
  getAll: publicProcedure.query(async ({ ctx }) => {
    const projects = await ctx.db.project.findMany({
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

    return projects;
  }),

  // Get project by ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const project = await ctx.db.project.findUnique({
        where: { id: input.id },
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

      if (!project) {
        throw new Error("Project not found");
      }

      return project;
    }),

  // Create new project
  create: publicProcedure
    .input(createProjectInput)
    .mutation(async ({ ctx, input }) => {
      try {
        const newProject = await ctx.db.project.create({
          data: {
            name: input.name,
            projectDescription: input.projectDescription,
            status: 'PENDING',
            techStack: {
              create: input.techStack.map((skill) => ({
                technicalSkillId: skill.technicalSkillId
              }))
            },
            client: input.clientId ? { connect: { id: input.clientId } } : undefined,
            position: input.positionId ? { connect: { id: input.positionId } } : undefined,
          },
        });

        return newProject;
      } catch (error) {
        throw new Error("Failed to create project");
      }
    }),
});