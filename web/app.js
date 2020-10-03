const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const mongo = require('mongodb').MongoClient;

const uri = "mongodb://localhost:27017";

mongo.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
  if (err) throw err;

  const db = client.db('dolphin');

  const logs = db.collection('logs');

  logs.find().toArray((err, items) => {
    console.log(items)
  });

});

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

let infringementTime;
let stableTime;

app.post("/infringement", (req, res) => {
  infringementTime = new Date().getTime();
  
  io.sockets.emit("infringement");
  res.sendStatus(202);
});

app.post("/stable", (req, res) => {
  stableTime = new Date().getTime();

  if (stableTime > infringementTime && infringementTime !== null) {
    // means the user put back the mask
    infringementTime = null;
  }
  
  io.sockets.emit("stable");
  res.sendStatus(202);
});

server.listen(4001, '192.168.100.12');