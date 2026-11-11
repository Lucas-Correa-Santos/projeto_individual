var avaliacaoModel = require("../models/avaliacaoModel");

function notaAnime(req, res) {
    avaliacaoModel.notaAnime().then(function(resultado){
        // precisamos informar que o resultado voltará para o front-end como uma resposta em json
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function cadastrar(req, res) {
    var id_user = req.body.userIDServer;
    var nota_final = req.body.notafinalServer;
    // o frontend envia aspectoServer e temaServer (nomes no payload), aqui estava usando nomes do quiz
    var aspecto_favorito = req.body.aspectoServer;
    var tema_favorito = req.body.temaServer;
    var conhece_anime = req.body.conheciaServer;

    console.log("avaliacao cadastrar body:", req.body);

    // validação básica
    if (!id_user) {
        return res.status(400).json({ erro: "userIDServer ausente" });
    }

    // garantir tipos numéricos (se aplicável)
    id_user = parseInt(id_user);
    nota_final = parseInt(nota_final);

    avaliacaoModel.cadastrar(id_user, aspecto_favorito, tema_favorito, nota_final, conhece_anime)
    .then(function (resultado) {
        res.json(resultado);
    })
    .catch(function(erro){
        console.log("\nHouve um erro ao cadastrar essa avaliacao!! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    notaAnime,
    cadastrar
}
