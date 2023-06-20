const express = require("express");
const modelo = require("./modelo.js");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("views", "./visao");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  try {
    const perguntas = modelo.listar_perguntas();
    res.render("index", {
      perguntas: perguntas,
    });
  } catch (erro) {
    res.status(500).json(erro.message);
  }
});

app.post("/perguntas", (req, res) => {
  try {
    modelo.cadastrar_pergunta(req.body.pergunta);
    res.render("pergunta-sucesso");
  } catch (erro) {
    res.status(500).json(erro.message);
  }
});

app.get("/respostas", (req, res) => {
  const id_pergunta = req.query.id_pergunta;
  const pergunta = modelo.get_pergunta(id_pergunta);
  const respostas = modelo.get_respostas(id_pergunta);
  try {
    res.render("respostas", {
      pergunta: pergunta,
      respostas: respostas,
    });
  } catch (erro) {
    res.status(500).json(erro.message);
  }
});

app.post("/respostas", (req, res) => {
  try {
    const id_pergunta = req.body.id_pergunta;
    const resposta = req.body.resposta;
    modelo.cadastrar_resposta(id_pergunta, resposta);
    res.render("resposta-sucesso", {
      id_pergunta: id_pergunta,
    });
  } catch (erro) {
    res.status(500).json(erro.message);
  }
});

app.get("/perguntas/editar", (req, res) => {
  try {
    const id = req.query.id_pergunta;

    const pergunta = modelo.get_pergunta(id);
    res.render("editarPergunta", {
      pergunta,
    });
  } catch (erro) {
    res.status(500).json(erro.message);
  }
});

app.post("/pergunta", (req, res) => {
  try {
    const id = req.body.id_pergunta;
    const novaPergunta = req.body.novaPergunta;
    console.log(novaPergunta);
    console.log(id);
    const pergunta = modelo.editar_pergunta(id, novaPergunta);
    res.render("pergunta-sucesso", {
      pergunta,
    });
  } catch (erro) {
    res.status(500).json(erro.message);
  }
});

app.get("/perguntas", (req, res) => {
  try {
    const id_pergunta = req.query.id_pergunta;
    modelo.remover_pergunta(id_pergunta);
    res.render("pergunta-sucesso");
  } catch (erro) {
    res.status(500).json(erro.message);
  }
});

const port = 3000;
app.listen(port, "localhost", () => {
  console.log(
    `ESM Forum rodando na porta ${port}. Link: http://localhost:3000`
  );
});
