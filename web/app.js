const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const mongo = require('mongodb').MongoClient;

const uri = "mongodb://localhost:27017/";
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

mongo.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
  if (err) throw err;

  const db = client.db("dolphin");

  const logs = db.collection('logs');

  logs.find().toArray((err, items) => {
    console.log(new Date(items[0]["duration"]).getTime() / 1000);
    console.log(new Date(items[0]["timestamp"]));
  });
});

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
    logInfringement();
  }
  
  io.sockets.emit("stable");
  res.sendStatus(202);
});

function logInfringement() {
  //dont forget to start mongo before
  //sudo service mongod start
  mongo.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if (err) throw err;
  
    const db = client.db("dolphin");

    const logs = db.collection('logs');

    const log = {
      timestamp: new Date().getTime(),
      duration: stableTime - infringementTime
    };

    logs.insertOne(log, (err, result) => {
      if (err) throw err;

      //send to frontend with websocket
      io.sockets.emit("newLog", log);

      infringementTime = null;
    });
  
  });
}

server.listen(4001, '192.168.100.12');