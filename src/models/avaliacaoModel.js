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

function respostasCertas() {
    var instrucao = `
    SELECT 
    u.username AS Nome, 
    SUM(q.respostas_certas) AS Respostas_Certas 
    FROM quiz q
    INNER JOIN usuario u ON q.fk_usuario = u.id
    GROUP BY u.username
    ORDER BY Respostas_Certas DESC, u.username ASC
    LIMIT 5;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function mediaAvaliacoes(){
    var instrucao = `
    SELECT ROUND(AVG(nota),2) AS media FROM avaliacao;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function temaFavorito(){
    var instrucao = `
    SELECT aspecto, COUNT(*) AS quantidade
    FROM avaliacao
    GROUP BY aspecto
    ORDER BY quantidade DESC
    LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function tentativasUser(id_user){
    var instrucao = `
    SELECT COUNT(*) AS tentativasUsuario FROM quiz WHERE fk_usuario = ${parseInt(id_user)};
    `;
    console.log("Executando a instrução SQL (tentativasUser): \n" + instrucao);
    return database.executar(instrucao);
}

function tiposTitas() {
    var instrucao = `
    SELECT
        tipo_tita AS tipo_tita,
        COUNT(*) AS quantidade
    FROM usuario
    GROUP BY tipo_tita
    ORDER BY quantidade DESC;
    `;
    console.log("Executando a instrução SQL (tiposTitas): \n" + instrucao);
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
    notaAnime,
    respostasCertas,
    mediaAvaliacoes,
    tentativasUser,
    temaFavorito,
    tiposTitas
};
