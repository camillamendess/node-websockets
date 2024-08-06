const socket = io();

function emitirLoginUsuario(dados) {
  socket.emit("login_usuario", dados);
}

socket.on("login_sucesso", () => {
  alert("Login efetuado com sucesso!");
  window.location.href = "/";
});

socket.on("login_erro", () => alert("Erro no login."))
socket.on("usuario_nao_encontrado", () => alert("Usuário não encontrado."))

export { emitirLoginUsuario };
