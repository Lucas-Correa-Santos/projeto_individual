var express = require("express");
var router = express.Router();

var avaliacaoController = require("../controllers/avaliacaoController");

router.post("/cadastrar", function (req, res) {
    // função a ser chamada quando acessar /avaliacao/cadastrar
    avaliacaoController.cadastrar(req, res);
});

router.get("/grafico/notaAnime", function (req, res) {
    // função a ser chamada quando acessar /avaliacao/listar
    avaliacaoController.notaAnime(req, res);
});

router.get("/grafico/respostasCertas", function (req, res) {
    // função a ser chamada quando acessar /avaliacao/listar
    avaliacaoController.respostasCertas(req, res);
});

router.get("/grafico/tiposTitas", function (req, res) {
    // retorna os tipos de titãs mais escolhidos (contagem por tipo_tita)
    avaliacaoController.tiposTitas(req, res);
});

router.get("/grafico/mediaAvaliacoes", function (req, res) {
    // retorna a media de avaliação geral do anime
    avaliacaoController.mediaAvaliacoes(req, res);
});

module.exports = router;

