import React from "react";
import socketIOClient from "socket.io-client";

import Status from './status.js';

function App() {
  const socket = socketIOClient("http://192.168.100.12:4001");

  return (
    <>
      <Status socket={socket} />
    </>
  );
}

export default App;