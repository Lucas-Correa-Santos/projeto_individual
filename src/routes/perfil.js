var express = require("express");
var router = express.Router();

var perfilController = require("../controllers/perfilController");

// Rota para recuperar dados do perfil do usuário autenticado
// Exemplo: GET /perfil?userID=1
router.get("/", function (req, res) {
    perfilController.getPerfil(req, res);
});

module.exports = router;
