import { emitirTextoEditor, selecionarDocumento } from "./socket-front-doc.js";

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome");

// Obtém uma referência ao elemento de texto do editor usando o seu ID 'editor-texto'.
const textoEditor = document.getElementById("editor-texto");

const tituloDocumento = document.getElementById("titulo-documento");
tituloDocumento.textContent = nomeDocumento || "Documento sem título";

selecionarDocumento(nomeDocumento);

// Adiciona um ouvinte de eventos para o evento 'keyup' (tecla liberada) no editor de texto.
textoEditor.addEventListener("keyup", () => {
  // Quando uma tecla é liberada, chama a função 'emitirTextoEditor' com o valor atual do editor de texto.
  emitirTextoEditor({
    texto: textoEditor.value,
    nomeDocumento,
  });
});

// Define a função 'atualizaTextoEditor', que atualiza o conteúdo do editor de texto.
function atualizaTextoEditor(texto) {
  // Define o valor do editor de texto com o texto recebido como argumento.
  textoEditor.value = texto;
}
export { atualizaTextoEditor };
