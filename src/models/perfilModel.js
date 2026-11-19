var database = require("../database/config");

// Retorna os dados do usuário e (se existir) sua avaliação.
// Observação: ajustar nomes de colunas/foreign keys conforme o schema real do banco.
function getPerfilPorId(userID) {
    // Esta query usa LEFT JOIN para garantir que o usuário seja retornado
    // mesmo quando não existir uma avaliação associada.
    var instrucaoSql = `
        SELECT u.id, u.username, u.email, u.tipo_tita, u.dt_cadastro,
               a.aspecto AS aspecto, a.tema AS tema, a.nota AS nota, a.conhecia AS conhecia
        FROM usuario u
        LEFT JOIN avaliacao a ON a.fk_usuario = u.id
        WHERE u.id = ${userID};
    `;

    console.log("Executando instrucao SQL de perfil:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    getPerfilPorId
};
