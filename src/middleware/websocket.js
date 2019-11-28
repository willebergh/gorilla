

module.exports = function (password, users, socket, next) {

    try {
        if (password) {
            if (socket.handshake.query && socket.handshake.query.password) {
                if (socket.handshake.query.password !== password) throw "unauthorized";
            } else throw "unauthorized";
        }
        if (socket.handshake.query && socket.handshake.query.username) {
            if (users.find(user => user === socket.handshake.query.username)) throw "unavailable-username";
            else users.push(socket.handshake.query.username);
        } else throw "no-username";

    } catch (err) {
        return next(new Error(err));
    }

    return next();


}

