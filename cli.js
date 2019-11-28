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
    const dotenv = require("path").join(__dirname, ".env");
    require("dotenv").config({ path: dotenv });
    const commander = require("commander");
    const program = new commander.Command();

    const commands = require("./src/commands");
    commands.init(program);
    program
        .name("gorilla")
        .version("0.0.1")
        .parse(process.argv);
}

