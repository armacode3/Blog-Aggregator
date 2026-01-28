import { eq } from "drizzle-orm";
import { db } from "..";
import { feeds, users } from "../schema";

export async function createFeed(name: string, url: string, user_id: string) {
    const [result] = await db.insert(feeds).values({ name: name, url: url, user_id: user_id }).returning();

    return result;
}

export async function getFeedUser(userId: string) {
    const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
    });

    return user;
}

export async function getFeeds() {
    const result = await db.select({ name: feeds.name, url: feeds.url, user_id: feeds.user_id }).from(feeds);
    
    return result;
}

export type Feed = typeof feeds.$inferSelect;