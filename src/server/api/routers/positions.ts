import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const positionRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const positions = await ctx.db.position.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return positions;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const position = await ctx.db.position.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          name: true,
        },
      });

      if (!position) {
        throw new Error("Position not found");
      }

      return position;
    }),
});
