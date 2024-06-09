import {
  atualizaDocumento,
  encontrarDocumento,
  obterDocumentos,
} from "./documentosDb.js";
import io from "./server.js";

// Define um manipulador de eventos para a conexão de novos clientes.
io.on("connection", (socket) => {
  // Quando um cliente se conecta, exibe uma mensagem no console com o ID do socket.
  console.log("Um cliente se conectou! ID:", socket.id);

  socket.on("obter_documentos", async (devolverDocs) => {
    const documentos = await obterDocumentos();
    devolverDocs(documentos);
  });

  socket.on("selecionar_documento", async (nomeDoDocumento, devolverTexto) => {
    socket.join(nomeDoDocumento);

    const documento = await encontrarDocumento(nomeDoDocumento);
    if (documento) {
      devolverTexto(documento.texto);
    }
  });

  // Define um manipulador de eventos para o evento 'texto_editor' recebido do cliente.
  socket.on("texto_editor", ({ texto, nomeDocumento }) => {
    const atualizacao = atualizaDocumento(nomeDocumento, texto);

    if (atualizacao.modifiedCount) {
      socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
    }
  });
});
