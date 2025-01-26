import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";
import connectDB from "./server/db/index.js";
import { app } from "./server/app.js";

const PORT = process.env.PORT || 8000;

// Create HTTP server
const server = http.createServer(app);

// WebSocket setup
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN?.split(",").map((o) => o.trim()),
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Accept,Authorization,Content-Type,X-Requested-With,Range",
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
  });
});

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`⚙️ Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MONGO DB connection failed", err);
  });
