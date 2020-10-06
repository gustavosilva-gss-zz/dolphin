const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const multer = require("multer");

const upload = multer();

const mongo = require('mongodb').MongoClient;

const uri = "mongodb://localhost:27017/";
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("New client connected");

  mongo.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
  
    const db = client.db("dolphin");
  
    const logs = db.collection('logs');
  
    logs.find({}).toArray((err, result) => {
      //send all logs to frontend with websocket
      io.sockets.emit("newLog", result.reverse());
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

let infringementTime;
let stableTime;
let image;

app.post("/infringement", upload.single('file'), (req, res) => {
  infringementTime = new Date().getTime();

  image = req.file.buffer;

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
  mongo.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;

    const db = client.db("dolphin");

    const logs = db.collection('logs');

    const log = {
      timestamp: new Date().getTime(),
      duration: stableTime - infringementTime,
      image: image
    };

    logs.insertOne(log, (err, result) => {
      if (err) throw err;

      logs.find({}).toArray((err, result) => io.sockets.emit("newLog", result.reverse()));

      infringementTime = null;
    });

  });
}

server.listen(4001, '192.168.100.8');