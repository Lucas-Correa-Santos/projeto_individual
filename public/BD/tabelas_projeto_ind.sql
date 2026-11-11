CREATE DATABASE shingeki;

USE shingeki;

SELECT * FROM usuario;

CREATE TABLE usuario(
	id INT PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(50) NOT NULL UNIQUE,
	email VARCHAR(70) NOT NULL,
	senha VARCHAR(30) NOT NULL,
	dt_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    tipo_usuario VARCHAR(40) DEFAULT "padrao" NOT NULL,
	tipo_tita VARCHAR(40) NOT NULL,
     CONSTRAINT ck_user 
        CHECK (tipo_usuario IN ('admin', 'padrao'))
);

CREATE TABLE quiz(
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT NOT NULL,
    respostas_certas INT NOT NULL,
    respostas_erradas INT NOT NULL,
    pontuacao_final INT NOT NULL,
    dt_tentativa DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

SELECT * FROM quiz;

CREATE TABLE avaliacao(
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT NOT NULL,
    aspecto VARCHAR(30) NOT NULL,
    tema VARCHAR(30) NOT NULL,
    nota INT NOT NULL,
    conhecia VARCHAR(30) NOT NULL,
    dt_avaliacao DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

INSERT INTO avaliacao
(fk_usuario, aspecto, tema, nota, conhecia)
VALUES
(1, 'historia', 'liberdade', 5, 'sim_assisti'),
(2, 'personagens', 'persistencia', 5, 'assistindo'),
(3, 'animacao', 'preconceito', 4, 'nao_assisti'),

(1, 'trilha_sonora', 'consequencias', 5, 'sim_assisti'),
(2, 'batalhas', 'liberdade', 5, 'sim_assisti'),
(3, 'misterios', 'perspectivas', 4, 'assistindo'),

(1, 'reflexoes', 'relacoes', 4, 'sim_assisti'),
(2, 'historia', 'consequencias', 5, 'assistindo'),
(3, 'personagens', 'persistencia', 3, 'nao_assisti'),

(1, 'animacao', 'liberdade', 5, 'sim_assisti'),
(2, 'trilha_sonora', 'preconceito', 4, 'sim_assisti'),
(3, 'batalhas', 'relacoes', 5, 'assistindo'),

(1, 'misterios', 'perspectivas', 5, 'sim_assisti'),
(2, 'reflexoes', 'consequencias', 5, 'sim_assisti'),
(3, 'historia', 'liberdade', 4, 'nao_assisti'),

(1, 'personagens', 'relacoes', 5, 'sim_assisti'),
(2, 'animacao', 'persistencia', 2, 'assistindo'),
(3, 'trilha_sonora', 'perspectivas', 4, 'nao_assisti'),

(1, 'batalhas', 'liberdade', 5, 'sim_assisti'),
(2, 'misterios', 'preconceito', 3, 'sim_assisti'),
(3, 'reflexoes', 'consequencias', 3, 'assistindo'),

(1, 'historia', 'perspectivas', 5, 'sim_assisti'),
(2, 'personagens', 'relacoes', 4, 'assistindo'),
(3, 'animacao', 'liberdade', 4, 'nao_assisti');

INSERT INTO usuario 
(username, email, senha, tipo_usuario, tipo_tita)
VALUES

(
    'lucas',
    'lucas@email.com',
    '12345679',
    'padrao',
    'ataque'
),

(
    'eren',
    'eren@email.com',
    '123456',
    'padrao',
    'ataque'
),
(
    'mikasa',
    'mikasa@email.com',
    '123456',
    'padrao',
    'femea'
),
(
    'armin',
    'armin@email.com',
    '123456',
    'padrao',
    'colossal'
);


/* SELECT 
	TRUNCATE (
    SUM(
		CASE
        WHEN nota = 1 THEN  'Muito Ruim'
		WHEN nota = 2 THEN 'Ruim'
        WHEN nota = 3 THEN 'Bom'
        WHEN nota = 4 THEN 'Muito Bom'
        ELSE 'Excelente'
        END)
    ) AS avaliacao_anime FROM avaliaocao; */
    
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