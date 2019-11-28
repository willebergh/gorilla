const io = require("socket.io-client");
const prompt = require("prompt");
const colors = require("colors");
const ora = require("ora");

module.exports = function (userAtServer) {
    const username = userAtServer.split("@")[0]
    const server = userAtServer.split("@")[1]

    initSocket(server, { username })

}

var tries = 0;
function initSocket(server, query) {
    const socket = io(`${server}/lobby`, { query });
    const spinner = ora({
        text: "Checking with the boss...",
        stream: process.stdout
    }).start();

    socket.on("error", err => {
        if (err === "unavailable-username") {
            spinner.fail("Username is unavailable!");
            process.exit();
        } else if (tries === 4) {
            spinner.fail("Kicked by the boss!");
            process.exit();
        } else if (tries === 0) {
            tries++;
            spinner.info(`Please enter password for ${server}`);
        } else {
            tries++;
            spinner.fail("Wrong password, please try again!");
        }
        prompt.message = "";
        prompt.delimiter = ":";

        prompt.start();
        prompt.get([{
            name: "password",
            message: `${"┗►"[tries === 1 ? "blue" : "red"]} password`,
            required: true,
            hidden: true,
            replace: "*"
        }], (err, result) => {
            let newQuery = { ...query, password: result.password };
            return initSocket(server, newQuery);
        });

    })

    socket.on("connect", () => {
        tries = 0;
        spinner.succeed("Connected!");
    })
}