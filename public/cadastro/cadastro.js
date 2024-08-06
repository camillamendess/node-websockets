import { emitirCadastrarUsuario } from "./socket-front-cadastro.js";

const form = document.getElementById("form-cadastro");

form.addEventListener("submit", (evento) => {
  evento.preventDefault(); // Não recarregar a página

  const usuario = form["input-usuario"].value; // Pegar valor digitado no form
  const senha = form["input-senha"].value;

  emitirCadastrarUsuario({ usuario, senha });
});
