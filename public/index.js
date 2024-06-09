import { emitirAdicionarDocumento } from "./socket-front-index.js";

const listaDocumentos = document.getElementById("lista-documentos");
const form = document.getElementById("form-adiciona-documento");
const inputDocumento = document.getElementById("input-documento");

form.addEventListener("submit", (evento) => {
  evento.preventDefault(); // Previnir o comportamento padrão de recarregamento de página
  emitirAdicionarDocumento(inputDocumento.value);
  inputDocumento.value = "";
});

function inserirLinkDocumento(nomeDoc) {
  listaDocumentos.innerHTML += `
    <a href="documento.html?nome=${nomeDoc}" class="list-group-item list-group-item-action">
      ${nomeDoc}
    </a>
  `;
}

export { inserirLinkDocumento };
