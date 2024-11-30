import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const developersRouter = createTRPCRouter({
  // Obtener todos los desarrolladores
  getAll: publicProcedure.query(async ({ ctx }) => {
    const developers = await ctx.db.developer.findMany({
      select: {
        id: true,
        seniority: true,
        languageSkills: true,
        position: true,
        availability: true,
        softSkills: {
          select: {
            softSkill: {
              select: {
                name: true,
                rangeLevel: true,
              },
            },
            level: true,
          },
        },
        technicalSkills: {
          select: {
            technicalSkill: {
              select: {
                name: true,
              },
            },
            level: true,
          },
        },
      },
    });

    return developers;
  }),

  // Obtener un desarrollador por su ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const developer = await ctx.db.developer.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          seniority: true,
          languageSkills: true,
          position: true,
          availability: true,
          softSkills: {
            select: {
              softSkill: {
                select: {
                  name: true,
                  rangeLevel: true,
                },
              },
              level: true,
            },
          },
          technicalSkills: {
            select: {
              technicalSkill: {
                select: {
                  name: true,
                },
              },
              level: true,
            },
          },
        },
      });

      if (!developer) {
        throw new Error("Developer not found");
      }

      return developer;
    }),
});