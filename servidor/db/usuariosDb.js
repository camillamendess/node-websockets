import criaHashESalSenha from "../utils/criaHashESalSenha.js";
import { usuariosColecao } from "./dbConnect.js";

function encontrarUsuario(nome) {
  return usuariosColecao.findOne({ nome });
}

function cadastrarUsuario({ usuario, senha }) {
  const { hashSenha, salSenha } = criaHashESalSenha(senha);
  return usuariosColecao.insertOne({ usuario, hashSenha, salSenha });
}

export { cadastrarUsuario, encontrarUsuario };
