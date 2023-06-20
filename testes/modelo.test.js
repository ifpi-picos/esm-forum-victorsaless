const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
});

test('Testando cadastrar_resposta', () => {
  modelo.cadastrar_resposta(1, 'resposta teste');
  const respostas = modelo.get_respostas(1); 
  expect(respostas.length).toBe(1);
});

test('Testando get_pergunta', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  const perguntas = modelo.listar_perguntas(); 
  const pergunta = modelo.get_pergunta(perguntas[0].id_pergunta)
  expect(pergunta.texto).toBe('1 + 1 = ?');
});

test('Testando get_num_respostas', () => {
  modelo.cadastrar_resposta(1, 'resposta teste');
  const respostas = modelo.get_num_respostas(1); 
  expect(respostas).toBe(1);
});
  
test('Testando editar_pergunta', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  const perguntas = modelo.listar_perguntas();
  const id = perguntas[0].id_pergunta
  modelo.editar_pergunta(id, 'pergunta editada');
  const pergunta = modelo.get_pergunta(id); 

  expect(pergunta.texto).toBe('pergunta editada');
});

test('Testando remover_pergunta', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  const perguntas = modelo.listar_perguntas();
  const id = perguntas[0].id_pergunta
  modelo.remover_pergunta(id);
  const pergunta = modelo.get_pergunta(id); 

  expect(pergunta).toBe(undefined);
});
