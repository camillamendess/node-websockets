import "./socket-front-index.js";

const listaDocumentos = document.getElementById("lista-documentos");

function inserirLinkDocumento(nomeDoc) {
  listaDocumentos.innerHTML += `
    <a href="documento.html?nome=${nomeDoc}" class="list-group-item list-group-item-action">
      ${nomeDoc}
    </a>
  `;
}

export { inserirLinkDocumento };
