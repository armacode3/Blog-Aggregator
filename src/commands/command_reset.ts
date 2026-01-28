import { deleteUser } from "../lib/db/queries/users.js";

export async function handlerReset(cmdName: string, ...args: string[]) {
    await deleteUser();

    console.log("Users reset");
}