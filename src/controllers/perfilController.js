var perfilModel = require("../models/perfilModel");

// Controller para obter o perfil do usuário.
// Valida parâmetros, solicita dados ao model e formata a resposta.
function getPerfil(req, res) {
    var idUser = req.query.userID;

    if (!idUser) {
        return res.status(400).json({ erro: "userID ausente" });
    }

    idUser = parseInt(idUser);
    if (isNaN(idUser)) {
        return res.status(400).json({ erro: "userID inválido" });
    }

    perfilModel.getPerfilPorId(idUser)
    .then(function (resultado) {
        if (!resultado || resultado.length === 0) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        // normalizar retorno: pegar a primeira linha (LEFT JOIN pode retornar colunas de avaliacao nulas)
        var row = resultado[0];

        var usuario = {
            id: row.id,
            username: row.username,
            email: row.email,
            tipo_tita: row.tipo_tita,
            dt_cadastro: row.dt_cadastro
        };

        // se não houver campos de avaliação, manter avalicao = null
        var avaliacao = (row.aspecto || row.tema || row.nota || row.conhecia) ? {
            aspecto: row.aspecto,
            tema: row.tema,
            nota: row.nota,
            conhecia: row.conhecia
        } : null;

        res.status(200).json({ usuario: usuario, avaliacao: avaliacao });
    })
    .catch(function (erro) {
        console.log("Erro ao obter perfil:", erro.sqlMessage || erro);
        res.status(500).json(erro.sqlMessage || erro);
    });
}

module.exports = {
    getPerfil
};
