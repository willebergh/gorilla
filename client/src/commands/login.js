const axios = require("axios");
const cliSpinners = require("cli-spinners");
const ora = require('ora');
const config = require('config');
const updateConfig = require("../utils/updateConfig");
const readline = require("readline");


module.exports = async function () {
    const email = await userInput("Email: ");
    const password = await userInput("Password: ", true);
    console.log();

    const spinner = ora("Checking with the boss...").start();
    spinner.spinner = cliSpinners.dots;
    const url = "https://auth.dampgang.com"
    axios.post(url + "/login", { email, password, getApiKey: true })
        .then(res => {
            const { msg, apiKey } = res.data;
            if (msg === "success") {
                axios.get(url + "/user", { headers: { "DG-API-KEY": apiKey } })
                    .then(res => {
                        const { fullName, username } = res.data.user;
                        updateConfig({ apiKey, user: { fullName, username }, server: "https://h020-3000.dampgang.com" })
                            .then(() => {
                                spinner.succeed(`Welcome back ${fullName}`);
                            })
                    })
            } else {
                spinner.fail(msg);
            }
        })
        .catch(err => {
            const { msg } = err.response.data;
            spinner.fail(msg);
        })
}

function userInput(question, hidden) {
    return new Promise(resolve => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        })

        rl.stdoutMuted = hidden ? true : false;
        rl.question(question, answer => {
            rl.close();
            return resolve(answer);
        })

        rl._writeToOutput = function _writeToOutput(stringToWrite) {
            if (rl.stdoutMuted) rl.output.write("*");
            else rl.output.write(stringToWrite);
        };
    })
}