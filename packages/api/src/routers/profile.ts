import { db } from "@my-better-t-app/db";
import { adminProcedure, protectedProcedure } from "..";
import { profile } from "@my-better-t-app/db/schema/index";
import { eq } from "drizzle-orm";
import z from "zod";

export const profileRouter = {
  getProfile: protectedProcedure.handler(({ context }) => {
    return db
      .select()
      .from(profile)
      .where(eq(profile.user_id, context.session.user.id));
  }),
  updateProfile: protectedProcedure
    .input(z.object({ name: z.string().min(1), bio: z.string().max(1000) }))
    .handler(async ({ input, context }) => {
      return await db
        .update(profile)
        .set({ name: input.name, bio: input.bio })
        .where(eq(profile.user_id, context.session.user.id));
    }),
  getAllProfile: adminProcedure.handler(async () => {
    return await db.select().from(profile);
  }),
};
