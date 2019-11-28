const prompt = require("prompt");
const colors = require("colors");

module.exports = function (userAtServer) {
    const username = userAtServer.split("@")[0]
    const server = userAtServer.split("@")[1]

    initSocket(server, {})

}

function initSocket(server, query) {
    const io = require("socket.io-client");
    const socket = io(`${server}/lobby`, { query });

    socket.on("error", err => {
        prompt.message = "";
        prompt.delimiter = ":";

        prompt.start();
        prompt.get([{
            name: "password",
            message: "Password".white,
            required: true,
            hidden: true
        }], (err, result) => {
            let newQuery = { password: result.password };
            return initSocket(server, newQuery);
        });
    })

    socket.on("connect", () => {
        console.log("Connected!");
    })
}