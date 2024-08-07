import {
  emitirExcluirDocumento,
  emitirTextoEditor,
  selecionarDocumento,
} from "./socket-front-documento.js";

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome");

if (!nomeDocumento) {
  alert("Nome do documento não especificado na URL.");
  window.location.href = "/";
}

const textoEditor = document.getElementById("editor-texto");
const tituloDocumento = document.getElementById("titulo-documento");
const botaoExcluir = document.getElementById("excluir-documento");

tituloDocumento.textContent = nomeDocumento || "Documento sem título";

function tratarAutorizacaoSucesso(payloadToken) {
  console.log(`Autorização bem-sucedida para o usuário: ${payloadToken.nomeUsuario}`);
  selecionarDocumento({ nomeDocumento, nomeUsuario: payloadToken.nomeUsuario });
}

textoEditor.addEventListener("keyup", () => {
  emitirTextoEditor({
    texto: textoEditor.value,
    nomeDocumento,
  });
});

function atualizaTextoEditor(texto) {
  textoEditor.value = texto;
}

botaoExcluir.addEventListener("click", () => {
  emitirExcluirDocumento(nomeDocumento);
});

function alertarERedirecionar(nome) {
  if (nome === nomeDocumento) {
    alert(`Documento ${nome} excluído!`);
    window.location.href = "/";
  }
}

export { atualizaTextoEditor, alertarERedirecionar, tratarAutorizacaoSucesso };
