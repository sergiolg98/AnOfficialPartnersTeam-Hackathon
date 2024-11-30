import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const clientsRouter = createTRPCRouter({
    getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const client = await ctx.db.client.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          name: true,
          projects: {
            select: {
              id: true,
              name: true,
              projectDescription: true,
              status: true,
              techStack: {
                select: {
                  technicalSkill: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!client) {
        throw new Error("Client not found");
      }

      return client;
    }),
});
