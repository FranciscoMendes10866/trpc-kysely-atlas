import { initTRPC } from "@trpc/server";
import { z } from "zod";

import { Context } from "./context";

export const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  getDogs: t.procedure.query(async ({ ctx }) => {
    return await ctx.db.selectFrom("dogs").selectAll().execute();
  }),
  getDogById: t.procedure
    .input(
      z.object({
        id: z.string().uuid(),
      }),
    )
    .query(async ({ input, ctx }) => {
      return await ctx.db
        .selectFrom("dogs")
        .selectAll()
        .where("id", "=", input.id)
        .executeTakeFirstOrThrow();
    }),
  createDog: t.procedure
    .input(
      z.object({
        name: z.string(),
        breed: z.string(),
        isGoodBoy: z.boolean(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db
        .insertInto("dogs")
        .values(input)
        .returningAll()
        .executeTakeFirstOrThrow();
    }),
  updateDog: t.procedure
    .input(
      z.object({
        name: z.string(),
        breed: z.string(),
        isGoodBoy: z.boolean(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db
        .insertInto("dogs")
        .values(input)
        .onConflict((oc) => oc.column("id").doUpdateSet(input))
        .returningAll()
        .executeTakeFirstOrThrow();
    }),
  removeDog: t.procedure
    .input(
      z.object({
        id: z.string().uuid(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db
        .deleteFrom("dogs")
        .where("id", "=", input.id)
        .returningAll()
        .executeTakeFirstOrThrow();
    }),
});

export type AppRouter = typeof appRouter;
