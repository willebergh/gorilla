
/**
 * Load a list of commands
 * @param { Command Object } program 
 */
module.exports.init = function init(program) {
    commands.forEach(obj => {
        program
            .command(obj.cmd)
            .description(obj.desc)
            .action(obj.action)
    })
}

const commands = [
    {
        cmd: "login",
        desc: "Sign in to your account",
        action: require("./login")
    },
    {
        cmd: "join <room>",
        desc: "Join a chat room",
        action: room => require("./join")(room)
    },
]
