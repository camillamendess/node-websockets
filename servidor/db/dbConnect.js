import { MongoClient } from "mongodb";

const cliente = new MongoClient(
  "mongodb+srv://cmendss83:admin123@aluraclusterproject.vos2k5t.mongodb.net/?retryWrites=true&w=majority&appName=AluraClusterProject"
);

let documentosColecao;

try {
  await cliente.connect();

  const db = cliente.db("alura-websockets");
  documentosColecao = db.collection("documentos");

  console.log("Conectado ao banco de dados com sucesso!");
} catch (erro) {
  console.log(erro);
}

export { documentosColecao };
