const updateConfig = require("../../utils/updateConfig");
const config = require("config");

module.exports = function (key, value) {
    if (config.has(key)) {
        updateConfig({ [key]: value })
    } else {
        console.log(`"${key}" is not a setting`)
    }
}