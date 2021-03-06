const
    express = require("express"), app = express(),
    server = require("http").createServer(app),
    io = require("socket.io")(server);

module.exports = function (port, cmdObj) {
    const { password } = cmdObj;

    const middleware = require("../middleware/websocket");
    const lobby = io.of("/lobby");
    const users = [];

    lobby
        .use((...args) => middleware(password, users, ...args))
        .on("connect", socket => {
            const username = socket.handshake.query.username;
            console.log(`[-]: ${username} connected to the server!`)
            console.log(`  ┗► Users online: ${users.length}`)

            socket.on("disconnect", () => {
                users.splice(users.indexOf(username), 1);
                console.log(`[-]: ${username} disconnected from the server!`)
                console.log(`  ┗► Users online: ${users.length}`)
            })
        })

    const rooms = io.of("/rooms");
    handleRooms(rooms);

    server.listen(port, () => console.log(`Server started on port ${port}`))
}

function handleRooms(namespace) {
    namespace.on("connection", socket => {
        socket.on("join-room", handleJoinRoom)
        socket.on("send-message", handleSendMessage)
        socket.on("disconnect", handleDisconnect)

        function handleJoinRoom(data) {
            socket.join(data.room);
            socket.currentRoom = data.room;
            socket.user = data.user
            updateClients();
            socket.emit("room-joined", { user: socket.user });
            namespace.in(socket.currentRoom).emit("new-connection", {
                username: socket.user.username
            })
        }

        function handleSendMessage(message) {
            namespace.to(socket.currentRoom).emit("new-message", {
                message, user: socket.user
            })
        }

        function handleDisconnect(reason) {
            updateClients();
            socket.disconnect();
        }

        function updateClients() {
            namespace.in(socket.currentRoom).clients((err, c) => {
                const clients = [];
                c.forEach(c => {
                    clients.push(namespace.connected[c].user)
                })
                console.log(`Room ${socket.currentRoom} now has ${clients.length} clients!`)
            })
        }
    })
}