import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as usersSchema from "./schema/users";
import * as choresSchema from "./schema/chores";

export const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({
  client: sql,
  casing: "snake_case",
  schema: { ...usersSchema, ...choresSchema },
});
