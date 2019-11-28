

module.exports = function (password, socket, next) {
    if (socket.handshake.query && socket.handshake.query.password) {
        if (socket.handshake.query.password === password) {
            return next();
        } else {
            let error = new Error("authentication-error");
            error.data = {
                type: "authentication-error",
                message: "Wrong password"
            };
            return next(error);
        }
    } else {
        next(new Error('Authentication error'));
    }
}

