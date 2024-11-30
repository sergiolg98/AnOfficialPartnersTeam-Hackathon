import { clearLine } from "readline";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const clientsRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const client = await ctx.db.client.findUnique({
        where: { id: input.id },
      });

      if (!client) {
        throw new Error("Developer not found");
      }

      return client;
    }),
});