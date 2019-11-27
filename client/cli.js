#!/usr/bin/env node
const setup = require("./src/setup");
const spawnGorilla = require("./src/utils/spawnGorilla");

setup()
    .then(() => {
        spawnGorilla(false, () => cli());
    })
    .catch(err => {
        console.log(err);
        process.exit();
    })

function cli() {
    require("dotenv").config();
    const commander = require("commander");
    const program = new commander.Command();

    const commands = require("./src/commands");
    commands.init(program);
    program
        .version("0.0.1")
        .parse(process.argv);
}

