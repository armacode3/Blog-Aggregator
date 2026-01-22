import { eq, sql } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema";

export async function createUser(name: string) {
    const [result] = await db.insert(users).values({ name: name }).returning();

    return result;
}

export async function getUser(name: string) {
    const result = await db.select().from(users).where(eq(users.name, name));

    return result[0];
}

export async function deleteUser() {
    await db.execute(sql.raw(`TRUNCATE TABLE users;`));
    console.log("Table truncated successfully");
    
}
