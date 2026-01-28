import { getFeeds, getFeedUser } from "src/lib/db/queries/feeds.js"; 

export async function handlerFeeds(cmdName: string, ...args: string[]) {
    const feeds = await getFeeds();

    if (!feeds) {
        throw new Error("Feeds do not exist");
    }

    console.log("Printing feeds");

    for (let feed of feeds) {
        const user = await getFeedUser(feed.user_id);
        if (!user) {
            throw new Error("User does not exist");
        }
        console.log(`  - Name: ${feed.name}`);
        console.log(`  - URL: ${feed.url}`);
        console.log(`  - User: ${user.name}\n`);
    }
}