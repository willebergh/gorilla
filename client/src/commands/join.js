const windowSize = require("window-size");
const term = require("terminal-kit").terminal;
const readline = require('readline');
const config = require("config");

var user;

module.exports = function (room) {
    const server = config.get("server");
    const user = config.get("user");
    const socket = require("socket.io-client")(server + "/rooms");
    socket.on("connect", () => {
        socket.emit("join-room", { user, room });
    })

    socket.on("room-joined", data => {
        rl.setPrompt(`[!] ${user.username} > `);
        rl.prompt();
    })

    socket.on("new-connection", data => {
        rl.pause();
        process.stdout.clearLine();
        term.move(0, -1)
        readline.cursorTo(process.stdout, 0);
        console.log(`\n[#] ${data.username} joined the game!`)
        rl.resume();
        rl.prompt();
    })

    socket.on("new-message", data => {
        rl.pause();
        process.stdout.clearLine();
        term.move(0, -1)
        console.log(`\n[-] ${data.user.username}: ${data.message}`);
        rl.resume();
        rl.prompt();
    })

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    })

    readline.cursorTo(process.stdout, 0, windowSize.height);
    rl.on("line", line => {
        readline.moveCursor(process.stdout, 0, -1)
        socket.emit("send-message", line);
    })

}