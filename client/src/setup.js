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
        const dotenv = path.join(__dirname, "..", ".env");

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
            const data = JSON.stringify(templates.config, false, 4);
            fs.writeFile(config, data, "utf8", err => {
                if (err) return reject(err);
                initEnvironment(() => {
                    callback();
                })
            })
        }

        function initEnvironment(callback) {
            const data = templates.dotenv(dir);
            fs.writeFile(dotenv, data, "utf8", err => {
                if (err) return reject(err);
                callback();
            })
        }
    })
}

const templates = {
    config: {
        server: "",
        apiKey: "",
        user: {
            fullName: "",
            username: "",
            chatColor: "",
        }
    },
    dotenv: NODE_CONFIG_DIR => {
        return `NODE_CONFIG_DIR=${NODE_CONFIG_DIR}\nSUPPRESS_NO_CONFIG_WARNING=true`;
    }

}