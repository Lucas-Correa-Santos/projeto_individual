var express = require("express");
var router = express.Router();

var avaliacaoController = require("../controllers/avaliacaoController");

router.post("/cadastrar", function (req, res) {
    // função a ser chamada quando acessar /avaliacao/cadastrar
    avaliacaoController.cadastrar(req, res);
});

router.get("/listar", function (req, res) {
    // função a ser chamada quando acessar /avaliacao/listar
    avaliacaoController.listar(req, res);
});

module.exports = router;

