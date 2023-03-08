import { io } from "socket.io-client";

const socket = io("wss://chat-backend-m4xi.onrender.com");

export default socket;
