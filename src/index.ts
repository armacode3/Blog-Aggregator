import { setUser, readConfig } from './config.js';

function main() {
    setUser("Armando");
    console.log(readConfig());
}

main();