var database = require("../database/config")

function listar() {
    var instrucao = `
        SELECT * FROM quiz;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar(id_user, resposta_certa, resposta_errada, total_final) {
    var instrucao = `
        INSERT INTO quiz (fk_usuario, respostas_certas, respostas_erradas, pontuacao_final)
        VALUES ('${id_user}', '${resposta_certa}', '${resposta_errada}', '${total_final}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    listar
};
