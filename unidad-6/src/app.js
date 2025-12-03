import express from "express";
import http from "http";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
//websockets
const io = new Server(server);

app.use(express.static("public"));

//handlebars config
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//endpoints
app.use("/", viewsRouter);

//persistencia en memoria de los mensajes de chat
const messages = [];

//websockets desde el servidor
io.on("connection", (socket)=> {
  console.log("Nuevo usuario conectado");
  //emitimos un evento desde el servidor al cliente
  socket.emit("message history", messages);

  //escuchamos un evento
  socket.on("new message", (data)=> {
    messages.push(data);

    io.emit("broadcast new message", data);
  });

});

server.listen(8080, ()=> {
  console.log("Servidor iniciado correctamente!");
});