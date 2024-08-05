import {
    encontrarDocumento,
    obterDocumentos,
    adicionarDocumento,
  } from "../db/documentosDb.js";

function registrarEventosInicio(socket, io) {
  socket.on("obter_documentos", async (devolverDocs) => {
    const documentos = await obterDocumentos();
    devolverDocs(documentos);
  });

  socket.on("adicionar_documento", async (nomeDoDocumento) => {
    const documentoExiste =
      (await encontrarDocumento(nomeDoDocumento)) !== null;

    if (documentoExiste) {
      socket.emit("documento_existente", nomeDoDocumento);
    } else {
      const resultado = await adicionarDocumento(nomeDoDocumento);

      if (resultado.acknowledged) {
        io.emit("adicionar_documento_interface", nomeDoDocumento);
      }
    }
  });
}

export default registrarEventosInicio;
