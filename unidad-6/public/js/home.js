//iniciamos la conexion desde nuestro cliente
const socket = io();

//capturamos el historial de mensajes
socket.on("message history", (messages) => {
  const chatBox = document.getElementById("chatBox");
  messages.forEach((dataMessage) => {
    let p = document.createElement("p");
    p.textContent = `${dataMessage.username} - ${dataMessage.message}`;
    chatBox.appendChild(p);
  });
})

//formulario
const formChat = document.getElementById("formChat");
const inputChat = document.getElementById("inputChat");
const inputUsername = document.getElementById("inputUsername");

formChat.addEventListener("submit", (event) => {
  event.preventDefault();

  const message = inputChat.value;
  const username = inputUsername.value;

  inputChat.value = "";

  //emitimos un evento de nuevo mensaje al servidor
  socket.emit("new message", { message, username });
});


//capturamos los mensajes nuevos
socket.on("broadcast new message", (dataMessage) => {
  //insertar el nuevo mensaje en el html
  const chatBox = document.getElementById("chatBox");
  const p = document.createElement("p");
  p.textContent = `${dataMessage.username} - ${dataMessage.message}`;
  chatBox.appendChild(p);
});