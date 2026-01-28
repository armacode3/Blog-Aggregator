import { getUsers } from "../lib/db/queries/users.js";
import { readConfig } from "../config.js";

export async function handlerUsers(cmdName: string, ...args: string[]) {
    const users = await getUsers();

    const current = readConfig().currentUserName;

    if (users.length === 0) {
        console.log("No current users");
    }

    for (let user of users) {
        console.log(user.name === current ? `* ${user.name} (current)` : `* ${user.name}`);
    }
}