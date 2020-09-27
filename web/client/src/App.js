import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

function App() {
  const [masked, setMasked] = useState({});

  useEffect(() => {
    const socket = socketIOClient("http://192.168.100.8:4001");

    socket.connect("http://192.168.100.8:4001");

    socket.on("infringement", data => {
      setMasked(false);
    });

    socket.on("stable", data => {
      setMasked(true);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  }, []);

  return (
    <p>
      {masked ? 'parabens' : 'bota mascara mane'}
    </p>
  );
}

export default App;