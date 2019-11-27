const fs = require("fs");
const path = require("path");

module.exports = function () {
    const filePath = path.join(process.env.NODE_CONFIG_DIR, "default.json");
    const config = JSON.parse(fs.readFileSync(filePath));

    console.log("Your current settings: \n")
    Object.entries(config).forEach(([key, value], i) => {
        if (typeof value === "object") {
            print(key, "")
            Object.entries(value).forEach(([k, v], i) => {
                print(k, v, true)
            })
        } else {
            print(key, value)
        }
    })

    function print(key, value, indent) {
        console.log(` ${indent ? "  - " : ""}${key}: ${value}`)
    }
}