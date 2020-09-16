module.exports.chatSocket = (server) => {
  let io = require("socket.io")(server);

  io.sockets.on("connection", function (socket) {
    console.log("New connection recieved ", socket.id);

    socket.on("disconnect", function () {
      console.log("disconnected");
    });

    socket.on("online", function (data) {
      console.log("You are online now", data);

      socket.emit("up", {
        online: "true",
      });
    });

    socket.on("join-room", function (data) {
      socket.join(data.chatroom);

      io.in(data.chatroom).emit("user-joined", {
        user: data,
      });
    });

    socket.on("send_message", function (data) {
      io.in(data.chatroom).emit("recieve-message", data);
    });
  });
};
