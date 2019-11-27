const fs = require("fs");
const os = require("os");
const path = require("path");

module.exports = function () {
    return new Promise((resolve, reject) => {
        const platform = os.platform();
        var home = platform === "win32"
            ? process.env.USERPROFILE
            : process.env.HOME
        const dir = path.join(home, ".gorilla");
        const config = path.join(dir, "default.json");

        checkConfigDir(() => {
            return resolve();
        })

        function checkConfigDir(callback) {
            fs.stat(dir, (err, stats) => {
                if (err) {
                    createConfigDir(() => callback());
                } else {
                    checkConfigFile(() => callback());
                }
            })
        }

        function checkConfigFile(callback) {
            fs.access(config, fs.constants.F_OK, err => {
                if (err) createConfigFile(() => {
                    callback();
                });
                callback();
            })
        }

        function createConfigDir(callback) {
            fs.mkdir(dir, err => {
                if (err) return reject(err);
                createConfigFile(() => callback());
            })
        }

        function createConfigFile(callback) {
            const data = JSON.stringify(template, false, 4);
            fs.writeFile(config, data, "utf8", err => {
                if (err) return reject(err);
                callback();
            })
        }
    })
}

const template = {
    server: "",
    apiKey: "",
    user: {
        fullName: "",
        username: "",
        chatColor: "",
    },

}