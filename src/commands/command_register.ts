import { setUser } from 'src/config.js';
import { createUser, getUser } from '../lib/db/queries/users.js';

export async function handlerRegister(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <name>`);
    }

    const name = args[0];

    const exsisting = await getUser(name);
    if (exsisting) {
        throw new Error(`User ${name} already exists`);
    }

    const data = await createUser(name);
    
    setUser(data.name);
    console.log("User created successfully");
}