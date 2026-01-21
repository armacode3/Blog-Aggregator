import { CommandsRegistry, registerCommand, runCommand } from './commands/commands.js';
import { handlerLogin } from './commands/users.js';
function main() {
    let registry: CommandsRegistry = {};
    registerCommand(registry, "login", handlerLogin);

    let args: string[] = process.argv.slice(2);

    if (args.length < 1) {
        console.error('Need at least one argument');
        process.exit(1);
    }

    const cmdName = args[0];
    args = args.slice(1);

    try {
        runCommand(registry, cmdName, ...args);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();