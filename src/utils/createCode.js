
/**
 * @param { int } length
 */
module.exports = function (length) {
    return new Promise((resolve, reject) => {
        var code = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            code += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return resolve(code)
    });
}