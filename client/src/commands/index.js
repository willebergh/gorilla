
/**
 * Load a list of commands
 * @param { Command Object } program 
 * @param { String } subCommands 
 */
module.exports.init = function init(program, cmdList) {

    if (cmdList) {
        run(commands[cmdList])
    } else {
        run(commands.root)
    }

    function run(commands) {
        commands.forEach(obj => {
            var cmdObj;
            Object.entries(obj).forEach(([key, value]) => {
                if (key === "command") {
                    cmdObj = program[key](...value);
                } else {
                    cmdObj[key](value);
                }
            })
        })
    }
}

const commands = {
    root: [
        {
            command: ["login"],
            description: "Sign in to your account",
            action: require("./login")
        },
        {
            command: ["join <room>"],
            description: "Join a chat room",
            action: room => require("./join")(room)
        },
        {
            command: ["settings", "Mange settings"],
        }
    ],
    settings: [
        {
            command: ["view"],
            description: "View current settings",
            action: require("./settings/view")
        },
        {
            command: ["set <key> <value>"],
            description: "Change a setting",
            action: (key, value) => require("./settings/set")(key, value)
        }
    ]
}