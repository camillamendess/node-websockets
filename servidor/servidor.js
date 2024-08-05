import express from "express";
import url from "url";
import path from "path"; // fornece utilitários para trabalhar com caminhos de arquivos e diretórios.
import http from "http";

// Importa a classe Server do módulo socket.io, que permite a comunicação em tempo real baseada em WebSockets.
import { Server } from "socket.io";
import "./db/dbConnect.js";

const app = express();
const porta = process.env.port || 3000;

// Obtém o caminho do arquivo atual usando 'import.meta.url'.
const caminhoAtual = url.fileURLToPath(import.meta.url);

// Define o diretório público onde os arquivos estáticos (HTML, CSS, JS) estarão localizados.
const diretorioPublico = path.join(caminhoAtual, "../..", "public");

// Configura o aplicativo express para servir arquivos estáticos do diretório público.
app.use(express.static(diretorioPublico));

const servidorHttp = http.createServer(app);

servidorHttp.listen(porta, () => {
  console.log(`Servidor escutando na porta ${porta}`);
});

// Cria uma nova instância do servidor Socket.IO e a associa ao servidor HTTP.
const io = new Server(servidorHttp);

// Exporta a instância do servidor Socket.IO para que possa ser usada em outros módulos.
export default io;
