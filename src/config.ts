import fs from "fs";
import os from "os";
import path from "path";

type Config = {
    dbUrl: string,
    currentUserName?: string,
};

export function setUser(username: string) {
    const cfg = readConfig();

    cfg.currentUserName = username;
    writeConfig(cfg);
}

export function readConfig(): Config {
    const relativePath = getConfigFilePath();
        
    const data = fs.readFileSync(relativePath, 'utf8');
    return validateConfig(JSON.parse(data));
}

function getConfigFilePath(): string {
    const userHomeDir = os.homedir();
    const relativePath = path.join(userHomeDir, '.gatorconfig.json');

    return relativePath;
}

function writeConfig(cfg: Config): void {
    const filePath = getConfigFilePath();
    try {
        const snakeCfg = {
            db_url: cfg.dbUrl,
            current_user_name: cfg.currentUserName,
        }
        const jsonString = JSON.stringify(snakeCfg);
        fs.writeFileSync(filePath, jsonString);
    } catch (error) {
        console.error("Error writing JSON file:", error);
    }
}

function validateConfig(rawConfig: any): Config {
    if (!('db_url' in rawConfig) || typeof rawConfig.db_url !== 'string') {
        throw new Error('db_url is required and must be a string');
    }

    const config: Config = {
        dbUrl: rawConfig.db_url,
    };

    if ('current_user_name' in rawConfig && typeof rawConfig.current_user_name === 'string') {
        config.currentUserName = rawConfig.current_user_name;
    } else if ('current__user_name' in rawConfig && typeof rawConfig.current__user_name !== 'string') {
        throw new Error('current_user_name must be a string if present');
    }

    return config;
}