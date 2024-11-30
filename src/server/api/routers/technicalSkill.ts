import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const technicalSkillRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const technicalSkill = await ctx.db.technicalSkill.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          name: true,
          developers: {
            select: {
              developer: {
                select: {
                  id: true,
                  name: true,
                  lastname: true,
                  position: true,
                },
              },
              level: true,
            },
          },
          projects: {
            select: {
              project: {
                select: {
                  id: true,
                  name: true,
                  projectDescription: true,
                },
              },
            },
          },
        },
      });

      if (!technicalSkill) {
        throw new Error("Technical skill not found");
      }

      return technicalSkill;
    }),
});
