var quizModel = require("../models/quizModel");

function listar(req, res) {
    quizModel.listar().then(function(resultado){
        // precisamos informar que o resultado voltará para o front-end como uma resposta em json
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function cadastrar(req, res) {
    var id_user = req.body.userIDServer;
    var total_final = req.body.pontoFinalServer;
    var resposta_certa = req.body.respostascertasServer;
    var resposta_errada = req.body.respostaserradasServer;

    console.log("quiz cadastrar body:", req.body);

    // validação básica
    if (!id_user) {
        return res.status(400).json({ erro: "userIDServer ausente" });
    }

    // garantir tipos numéricos (se aplicável)
    id_user = parseInt(id_user);
    total_final = parseInt(total_final);
    resposta_certa = parseInt(resposta_certa);
    resposta_errada = parseInt(resposta_errada);

    quizModel.cadastrar(id_user, resposta_certa, resposta_errada, total_final)
    .then(function (resultado) {
        res.json(resultado);
    })
    .catch(function(erro){
        console.log("\nHouve um erro ao cadastrar esse quiz!! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    listar,
    cadastrar
}
