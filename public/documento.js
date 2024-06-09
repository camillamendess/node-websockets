import {
  emitirTextoEditor,
  selecionarDocumento,
  emitirExcluirDocumento,
} from "./socket-front-doc.js";

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome");

const textoEditor = document.getElementById("editor-texto");
const tituloDocumento = document.getElementById("titulo-documento");
const botaoExcluirDocumento = document.getElementById("excluir-documento");

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

botaoExcluirDocumento.addEventListener("click", () => {
  emitirExcluirDocumento(nomeDocumento);
});

function alertarERedirecionar(nome) {
  if (nome === nomeDocumento) {
    alert(`O documento ${nome} foi excluido!`);
    window.location.href = "/";
  }
}

export { atualizaTextoEditor, alertarERedirecionar };
