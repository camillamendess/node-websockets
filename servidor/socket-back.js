import registrarEventosInicio from "./registrarEventos/registrarEventosInicio.js";
import registrarEventosDocumento from "./registrarEventos/registrarEventosDocumento.js";
import io from "./servidor.js";

io.on("connection", (socket) => {
  registrarEventosInicio(socket, io);
  registrarEventosDocumento(socket, io);
});
