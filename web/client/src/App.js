import React from "react";
import socketIOClient from "socket.io-client";

import Status from './Status.js';
import Logs from './Logs.js';

function App() {
  const socket = socketIOClient("http://192.168.100.8:4001");

  return (
    <>
      <Status socket={socket} />
      <Logs socket={socket} />
    </>
  );
}

export default App;