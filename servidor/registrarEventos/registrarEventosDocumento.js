import {
    atualizaDocumento,
    encontrarDocumento,
    excluirDocumento,
  } from "../db/documentosDb.js";

function registrarEventosDocumento(socket, io) {
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
    
      socket.on("excluir_documento", async (nome) => {
        const exclusao = await excluirDocumento(nome);
        if (exclusao.deletedCount) {
          io.emit("excluir_documento_interface", nome);
        }
      });
}

export default registrarEventosDocumento;