import { emitirLoginUsuario } from "./socket-front-login.js";

const form = document.getElementById("form-login");

form.addEventListener("submit", (evento) => {
  evento.preventDefault(); // Não recarregar a página

  const nome = form["input-nome"].value; // Pegar valor digitado no form
  const senha = form["input-senha"].value;

  emitirLoginUsuario({ nome, senha });
});
