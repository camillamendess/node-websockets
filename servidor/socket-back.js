import registrarEventosDocumento from "./registrarEventos/Documento.js";
import registrarEventosInicio from "./registrarEventos/Inicio.js";
import registrarEventosCadastro from "./registrarEventos/Cadastro.js";

import io from "./servidor.js";

io.on("connection", (socket) => {
  registrarEventosInicio(socket, io);
  registrarEventosDocumento(socket, io);
  registrarEventosCadastro(socket, io);
});
