import { encontrarUsuario } from "../db/usuariosDb.js";
import gerarJwt from "../utils/gerarJwt.js";
import loginUsuario from "../utils/loginUsuario.js";

function registrarEventosLogin(socket, io) {
  socket.on("login_usuario", async ({ nome, senha }) => {
    const usuario = await encontrarUsuario(nome);

    if (usuario) {
      const autenticado = loginUsuario(senha, usuario);

      if (autenticado) {
        const tokenJWT = gerarJwt({nomeUsuario: nome });

        socket.emit("login_sucesso", tokenJWT);
      } else {
        socket.emit("login_erro");
      }
    } else {
        socket.emit("usuario_nao_encontrado");
    }
  });
}

export default registrarEventosLogin;
