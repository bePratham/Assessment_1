import express, { Application, Request, Response } from "express";
import http from "http";
import cors from "cors";
import { Server, Socket } from "socket.io";
import { userJoin, getUsers, userLeave, User } from "./utils/user";

const app: Application = express();
const server: http.Server = http.createServer(app);
const io: Server = new Server(server);

app.use(cors());
app.use((req: Request, res: Response, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("server");
});

// socket.io
let imageUrl: string | any;
let userRoom: string | any;

io.on("connection", (socket: Socket) => {
  socket.on("user-joined", (data: {
    roomId: string;
    userId: string;
    userName: string;
    host: boolean;
    presenter: boolean;
  }) => {
    const { roomId, userId, userName, host, presenter } = data;
    userRoom = roomId;
    const user: User = userJoin(socket.id, userName, roomId, host, presenter);
    const roomUsers: User[] = getUsers(user.room);
    socket.join(user.room);
    socket.emit("message", {
      message: "Welcome to ChatRoom",
    });
    socket.broadcast.to(user.room).emit("message", {
      message: `${user.username} has joined`,
    });

    io.to(user.room).emit("users", roomUsers);
    io.to(user.room).emit("canvasImage", imageUrl);
  });

  socket.on("drawing", (data: string) => {
    imageUrl = data;
    socket.broadcast.to(userRoom).emit("canvasImage", imageUrl);
  });

  socket.on("disconnect", () => {
    const userLeaves: User | undefined = userLeave(socket.id);
    const roomUsers: User[] = getUsers(userRoom);

    if (userLeaves) {
      io.to(userLeaves.room).emit("message", {
        message: `${userLeaves.username} left the chat`,
      });
      io.to(userLeaves.room).emit("users", roomUsers);
    }
  });
});

// serve on port
const PORT: number = parseInt(process.env.PORT || "5000");

server.listen(PORT, () =>
  console.log(`server is listening on http://localhost:${PORT}`)
);
