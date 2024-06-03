import { atualizaTextoEditor } from "./documento.js";

// Inicializa a conexão com o servidor Socket.IO.
const socket = io();

function selecionarDocumento(nome) {
  socket.emit("selecionar_documento", nome, (texto) => {
    atualizaTextoEditor(texto);
  });
}

// Define a função 'emitirTextoEditor', que envia o texto do editor para o servidor.
function emitirTextoEditor(dados) {
  // Emite um evento 'texto_editor' para o servidor com o texto atual do editor.
  socket.emit("texto_editor", dados);
}


// Define um manipulador de eventos para o evento 'texto_editor_clientes' recebido do servidor.
socket.on("texto_editor_clientes", (texto) => {
  /* Quando o evento 'texto_editor_clientes' é recebido, atualiza o texto do editor chamando a função 'atualizaTextoEditor' com o texto recebido. */
  atualizaTextoEditor(texto);
});

export { emitirTextoEditor, selecionarDocumento };
