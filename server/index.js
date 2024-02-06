const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors"); // Import the cors middleware

const PORT = process.env.PORT || 5000;
const router = require("./router");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  users,
} = require("./users");

// Use the cors middleware
app.use(cors());

io.on("connection", (socket) => {
  console.log("We have a new Connection !!!");

  // socket.on("join", (name) => {
  //   console.log("message: " + name);
  // });

  socket.on("join", ({ name, room }, callback) => {
    // Emit Code Recived--Error Undefined.
    console.log(name, room);
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `${user.name},Welcome to the room ${user.room}`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name},has Joined!` });

    socket.join(user.room);
    callback();
    console.log(name, room);

    io.to(user.room).emit("rooData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });
    io.to(user.room).emit("roomData", { room: user.room, text: message });
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name}has left`,
      });
    }
    console.log("User had left !!!");
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on Port ${PORT}`));
