
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
                } else if (key === "option") {
                    cmdObj[key](...value);
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
            command: ["connect [username@server]"],
            description: "Connect to a server",
            action: (userAtServer) => require("./connect")(userAtServer)
        },
        {
            command: ["join <room>"],
            description: "Join a chat room",
            action: room => require("./join")(room)
        },
        {
            command: ["login"],
            description: "Sign in to your account",
            action: require("./login")
        },
        {
            command: ["serve <port>"],
            description: "Run the chat server",
            option: ["-p, --password <pwd>", "Enable password protection"],
            action: (port, cmdObj) => require("./serve")(port, cmdObj)
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