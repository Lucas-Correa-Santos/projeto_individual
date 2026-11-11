var database = require("../database/config")

function notaAnime() {
    var instrucao = `
            SELECT
        CASE
            WHEN nota = 1 THEN 'Muito ruim'
            WHEN nota = 2 THEN 'Ruim'
            WHEN nota = 3 THEN 'Bom'
            WHEN nota = 4 THEN 'Muito bom'
            WHEN nota = 5 THEN 'Excelente'
            END AS classificacao,
            COUNT(*) AS quantidade
            FROM avaliacao
            GROUP BY classificacao
            ORDER BY
            CASE classificacao
            WHEN 'Muito ruim' THEN 1
            WHEN 'Ruim' THEN 2
            WHEN 'Bom' THEN 3
            WHEN 'Muito bom' THEN 4
            WHEN 'Excelente' THEN 5
        END;
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
    notaAnime
};
