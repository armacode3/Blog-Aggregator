import { readConfig } from "src/config.js";
import { createFeed, Feed } from "../lib/db/queries/feeds.js";
import { User, getUser } from "../lib/db/queries/users.js";

export async function addFeed(cmdName: string, ...args: string[]) {
    if (args.length !== 2) {
        throw new Error(`Usage: ${cmdName} <name> <url>`);
    }
    
    const name = args[0];
    const url = args[1];
    
    const currentUser = readConfig().currentUserName;

    if (!currentUser) {
        throw new Error("Username does not exist");
    }

    const userData = await getUser(currentUser);

    const data = await createFeed(name, url, userData.id);

    printFeed(data, userData);
}

function printFeed(feed: Feed, user: User) {
    console.log(feed);
    console.log(user);
}