import { CommandsRegistry, registerCommand, runCommand } from './commands/commands.js';
import { handlerLogin } from './commands/command_login.js';
import { handlerRegister } from './commands/command_register.js';
import { handlerReset } from './commands/command_reset.js';
import { handlerUsers } from './commands/command_users.js';
import { handlerAgg } from './commands/aggregate.js';

async function main() {
    let registry: CommandsRegistry = {};
    registerCommand(registry, "login", handlerLogin);
    registerCommand(registry, "register", handlerRegister)
    registerCommand(registry, "reset", handlerReset);
    registerCommand(registry, "users", handlerUsers);
    registerCommand(registry, "agg", handlerAgg);

    let args: string[] = process.argv.slice(2);

    if (args.length < 1) {
        console.error('Need at least one argument');
        process.exit(1);
    }

    const cmdName = args[0];
    args = args.slice(1);

    try {
        await runCommand(registry, cmdName, ...args);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`An error occurred: ${error.message}`);
        } else {
            console.error(error);
        }
        process.exit(1);
    }

    process.exit(0);
}

main();