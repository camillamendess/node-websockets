import io from "./server.js";

// Define um manipulador de eventos para a conexão de novos clientes.
io.on("connection", (socket) => {
  // Quando um cliente se conecta, exibe uma mensagem no console com o ID do socket.
  console.log("Um cliente se conectou! ID:", socket.id);

  socket.on("selecionar_documento", (nomeDoDocumento) => {
    socket.join(nomeDoDocumento);
  });

  // Define um manipulador de eventos para o evento 'texto_editor' recebido do cliente.
  socket.on("texto_editor", ({ texto, nomeDocumento }) => {
    /* Quando um evento 'texto_editor' é recebido, envia o texto para todos os outros clientes conectados, exceto para o próprio remetente.
    socket.broadcast.emit("texto_editor_clientes", texto);*/

    socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
  });
});

/* Quando o servidor recebe o evento texto_editor com o texto enviado pelo cliente, ele reenvia (broadcast) esse texto para todos os outros clientes conectados, exceto para o remetente original. O evento reenviado é chamado texto_editor_clientes. */
