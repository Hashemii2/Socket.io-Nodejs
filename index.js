const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("user connected...");
  socket.on("chat message", (message) => {
    socket.broadcast.emit("chat message", message);
  });
});
httpServer.listen(3000, console.log("listening on port 3000..."));
