const socket = io();

function emitirCadastrarUsuario(dados) {
  socket.emit("cadastrar_usuario", dados);
}

socket.on("cadastro_sucesso", () => alert("Cadastro realizado com sucesso!"));
socket.on("cadastro_erro", () => alert("Erro ao realizar cadastro."));
socket.on("cadastro_existente", () => alert("Usuario já existe!"));

export { emitirCadastrarUsuario };
