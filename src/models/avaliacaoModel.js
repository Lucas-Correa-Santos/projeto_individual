var database = require("../database/config")

function listar() {
    var instrucao = `
        SELECT * FROM avaliacao;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar(id_user, aspecto_favorito, tema_favorito, nota_final, conhece_anime) {
    var instrucao = `
        INSERT INTO avaliacao (fk_usuario, aspecto, tema, nota, conhecia)
        VALUES ('${id_user}', '${aspecto_favorito}', '${tema_favorito}', '${nota_final}', '${conhece_anime}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    listar
};
