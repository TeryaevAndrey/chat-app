import socket from "socket.io-client";

const io = socket("ws://localhost:5000");

export default io; 