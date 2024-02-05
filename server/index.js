const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors"); // Import the cors middleware

const PORT = process.env.PORT || 5000;
const router = require("./router");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Use the cors middleware
app.use(cors());

io.on("connection", (socket) => {
  console.log("We have a new Connection !!!");

  // socket.on("join", (name) => {
  //   console.log("message: " + name);
  // });

  socket.on("join", ({ name, room }) => {
    // Emit Code Recived--Error Undefined.
    console.log(name, room);
    const error = true;
    // if (error) {
    //   callback({ error: "error" });
    // }
  });

  socket.on("disconnect", () => {
    console.log("User had left !!!");
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on Port ${PORT}`));
