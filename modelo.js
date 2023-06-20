var repositorio = require("./RepositorioDB.js");

// usada pelo teste de unidade
// para que o modelo passe a usar uma versão "mockada" de bd
function reconfig_repositorio() {
  repositorio = require("./RepositorioMemoria.js");
}

// listar_perguntas retorna um array de objetos com os seguintes campos:
// { id_pergunta: int
//   texto: int
//   id_usuario: int
//   num_respostas: int
// }
function listar_perguntas() {
  const perguntas = repositorio.recuperar_todas_perguntas();
  return perguntas;
}

function cadastrar_pergunta(texto) {
  repositorio.criar_pergunta(texto);
}

function cadastrar_resposta(id_pergunta, texto) {
  repositorio.criar_resposta(id_pergunta, texto);
}

function get_pergunta(id_pergunta) {
  const pergunta = repositorio.recuperar_pergunta(id_pergunta);
  return pergunta;
}

function get_respostas(id_pergunta) {
  const respostas = repositorio.recuperar_todas_respostas(id_pergunta);
  return respostas;
}

function get_num_respostas(id_pergunta) {
  const n_respostas = repositorio.recuperar_num_respostas(id_pergunta);
  return n_respostas;
}

function editar_pergunta(id, texto) {
  repositorio.editar_pergunta(id, texto);
}

function remover_pergunta(id_pergunta) {
  repositorio.remover_pergunta(id_pergunta);
}

exports.reconfig_repositorio = reconfig_repositorio;
exports.listar_perguntas = listar_perguntas;
exports.cadastrar_pergunta = cadastrar_pergunta;
exports.cadastrar_resposta = cadastrar_resposta;
exports.get_pergunta = get_pergunta;
exports.get_respostas = get_respostas;
exports.get_num_respostas = get_num_respostas;
exports.editar_pergunta = editar_pergunta;
exports.remover_pergunta = remover_pergunta;
