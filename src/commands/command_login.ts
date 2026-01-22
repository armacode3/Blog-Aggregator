import { setUser } from "../config.js";
import { getUser } from "../lib/db/queries/users.js"

export async function handlerLogin(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <name>`);
    }

    const name = args[0];

    const exsisting = await getUser(name);


    if (!exsisting) {
        throw new Error(`User ${name} not found`);
    }

    setUser(exsisting.name);
    console.log("User switched successfully");
}