#!/usr/bin/env node

require("dotenv").config();
const commander = require("commander");
const settings = new commander.Command();

const commands = require("./src/commands");
commands.init(settings, "settings");
settings
    .name("gorilla settings")
    .parse(process.argv);

