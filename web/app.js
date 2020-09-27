const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.post("/infringement", (req, res) => {
  io.sockets.emit("infringement");
  res.sendStatus(202);
});

app.post("/stable", (req, res) => {
  io.sockets.emit("stable");
  res.sendStatus(202);
});

server.listen(4001, '192.168.100.8');