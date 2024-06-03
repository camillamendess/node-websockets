import io from "./server.js";

const documentos = [
  {
    nome: "JavaScript",
    texto: "texto de JavaScript...",
  },
  {
    nome: "Node",
    texto: "texto de node...",
  },
  {
    nome: "Socket.io",
    texto: "texto de Socket.io...",
  }
]

// Define um manipulador de eventos para a conexão de novos clientes.
io.on("connection", (socket) => {
  // Quando um cliente se conecta, exibe uma mensagem no console com o ID do socket.
  console.log("Um cliente se conectou! ID:", socket.id);

  socket.on("selecionar_documento", (nomeDoDocumento, devolverTexto) => {
    socket.join(nomeDoDocumento);

    const documento = encontrarDocumento(nomeDoDocumento);
    
    if(documento) {
      devolverTexto(documento.texto);
    }
  });

  // Define um manipulador de eventos para o evento 'texto_editor' recebido do cliente.
  socket.on("texto_editor", ({ texto, nomeDocumento }) => {
    const documento = encontrarDocumento(nomeDocumento);

    if(documento) {
      documento.texto = texto;
      socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
    }
  });
});

function encontrarDocumento(nome) {
  const documento = documentos.find((documento) => {
    return documento.nome === nome;
  });

  return documento;
}


