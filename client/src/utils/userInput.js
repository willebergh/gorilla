const readline = require('readline');
const utils = require("readline-utils");
const windowSize = require("window-size");

/**
 * 
 * @param { string } question 
 * @param { object } options
 */
module.exports = function (question, options) {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "[!] Wille > ",
            terminal: false
        })

        options = {
            hidden: false,
            bottom: false,
            ...options
        }

        try {
            if (typeof question !== "string") throw "Question is not a string!";
            rl.stdoutMuted = options.hidden ? true : false;
        } catch (err) {
            rl.close()
            return reject(err);
        }

        if (options.bottom) readline.cursorTo(process.stdout, 0, windowSize.height);

        rl.prompt();
        rl.on("line", line => {
            rl.close();
            return resolve(line);
        })


        /**
         * rl.question(question, awnser => {
            if (options.bottom) readline.moveCursor(process.stdout, 0, -1);
            rl.close();
            return resolve(awnser);
        })
         */

        rl._writeToOutput = function _writeToOutput(stringToWrite) {
            if (rl.stdoutMuted)
                rl.output.write("*");
            else
                rl.output.write(stringToWrite);
        };
    })
}