const fs = require("fs");
const path = require("path");

module.exports = function (subCmd, args) {
    switch (subCmd) {
        case "view": return view();
        case "set": return set(args);
    }
}

function view() {
    const filePath = path.join(process.env.NODE_CONFIG_DIR, "default.json");
    const config = JSON.parse(fs.readFileSync(filePath));

    console.log("Your current settings: \n")
    Object.entries(config).forEach(([key, value], i) => {
        if (typeof value === "object") {
            console.log(`\n${key}:`)
            Object.entries(value).forEach(([k, v], i) => {
                print(k, v)
            })
        } else {
            print(key, value)
        }
    })

    function print(key, value) {
        console.log(`${key}:\t${value}`)
    }
}

function set() {

}