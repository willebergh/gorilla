const axios = require("axios");
const cliSpinners = require("cli-spinners");
const ora = require('ora');
const userInput = require("../utils/userInput");
const cookie = require("cookie");


module.exports = async function () {


    const email = await userInput("Email: ");
    const password = await userInput("Password: ", { hidden: true });
    console.log();

    const spinner = ora("Checking with the boss").start();
    spinner.spinner = cliSpinners.dots;
    axios.post("https://auth.dampgang.com/login", { email, password })
        .then(res => {
            const { msg } = res.data;
            if (msg === "success") {
                spinner.succeed("Welcome to DampGang!");
            } else {
                spinner.fail(msg);
            }
        })
        .catch(err => {
            const { msg } = err.response.data;
            spinner.fail(msg);
        })
}