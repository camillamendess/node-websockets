import {
  atualizaDocumento,
  encontrarDocumento,
  excluirDocumento,
} from "../db/documentosDb.js";

function registrarEventosDocumento(socket, io) {
  socket.on("selecionar_documento", async ({ nomeDocumento, nomeUsuario }, devolverTexto) => {
    try {
      console.log(`Selecionando documento: ${nomeDocumento}`);
      socket.join(nomeDocumento);

      const documento = await encontrarDocumento(nomeDocumento);
      if (documento) {
        console.log(`Documento encontrado: ${documento.texto}`);
        devolverTexto(documento.texto);
      } else {
        console.log(`Documento não encontrado: ${nomeDocumento}`);
        devolverTexto(null);
      }
    } catch (error) {
      console.error(`Erro ao selecionar documento: ${error.message}`);
      devolverTexto(null);
    }
  });

  socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
    try {
      console.log(`Atualizando documento: ${nomeDocumento}`);
      const atualizacao = await atualizaDocumento(nomeDocumento, texto);

      if (atualizacao.modifiedCount) {
        console.log(`Documento atualizado: ${nomeDocumento}`);
        socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
      } else {
        console.log(`Documento não foi atualizado: ${nomeDocumento}`);
      }
    } catch (error) {
      console.error(`Erro ao atualizar documento: ${error.message}`);
    }
  });

  socket.on("excluir_documento", async (nome) => {
    try {
      console.log(`Excluindo documento: ${nome}`);
      const exclusao = await excluirDocumento(nome);
      if (exclusao.deletedCount) {
        console.log(`Documento excluído: ${nome}`);
        io.emit("excluir_documento_interface", nome);
      } else {
        console.log(`Documento não foi excluído: ${nome}`);
      }
    } catch (error) {
      console.error(`Erro ao excluir documento: ${error.message}`);
    }
  });
}

export default registrarEventosDocumento;
