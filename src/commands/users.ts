import { setUser } from "../config.js";

export function handlerLogin(cmdName: string, ...args: string[]) {
    if (args.length === 0) {
        throw new Error('A username is required');
    }

    if (!args[0]) {
        throw new Error('First argument does not exist.');
    }

    setUser(args[0]);
    console.log("Username has been set");
}