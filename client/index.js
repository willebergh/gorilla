const spawnGorilla = require("./src/utils/spawnGorilla");
spawnGorilla(true, () => {
    const commander = require("commander");
    const program = new commander.Command();

    const commands = require("./src/commands");
    commands.init(program);
    program
        .version("0.0.1")
        .parse(process.argv);
})