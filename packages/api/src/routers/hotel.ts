import { z } from "zod";
import { adminProcedure, publicProcedure } from "../index";
import { db } from "@my-better-t-app/db";
import { hotel } from "@my-better-t-app/db/schema/index";
import { eq } from "drizzle-orm";

export const hotelRouter = {
  all: publicProcedure.handler(async () => {
    return await db.select().from(hotel);
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .handler(async ({ input }) => {
      const result = await db
        .select()
        .from(hotel)
        .where(eq(hotel.id, input.id));
      return result[0];
    }),

  create: adminProcedure
    .input(
      z.object({
        name: z.string().min(1),
        address: z.string().min(1),
        description: z.string().optional(),
      })
    )
    .handler(async ({ input }) => {
      return await db.insert(hotel).values(input).returning();
    }),

  update: adminProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        address: z.string().optional(),
        description: z.string().optional(),
        isActive: z.boolean().optional(),
      })
    )
    .handler(async ({ input }) => {
      const { id, ...data } = input;
      return await db
        .update(hotel)
        .set(data)
        .where(eq(hotel.id, id))
        .returning();
    }),

  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .handler(async ({ input }) => {
      return await db.delete(hotel).where(eq(hotel.id, input.id)).returning();
    }),
};
