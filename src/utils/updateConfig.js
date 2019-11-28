const fs = require("fs");
const path = require("path");

module.exports = function (override) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(process.env.NODE_CONFIG_DIR, "default.json")
        const config = JSON.parse(fs.readFileSync(filePath));
        const updated = {
            ...config,
            ...override
        }

        fs.writeFile(filePath, JSON.stringify(updated, null, 4), "utf8", err => {
            if (err) {
                return reject(err);
            } else {
                return resolve();
            }
        }
        );
    })
}