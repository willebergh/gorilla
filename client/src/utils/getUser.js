const axios = require("axios");

module.exports = function () {
    axios.get("https://auth.dampgang.com/user")
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err.response.data)
        })
}