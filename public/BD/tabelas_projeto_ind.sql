CREATE DATABASE shingeki;

USE shingeki;

SELECT * FROM usuario;

CREATE TABLE usuario(
	id INT PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(50) NOT NULL UNIQUE,
	email VARCHAR(70) NOT NULL,
	senha VARCHAR(30) NOT NULL,
	dt_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
	tipo_tita VARCHAR(40) NOT NULL,
	img_url VARCHAR(250) NULL
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



