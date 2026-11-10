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

CREATE TABLE likes(
	fk_usuario INT,
	dt_like DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(fk_usuario, fk_post),
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id),
    FOREIGN KEY (fk_post) REFERENCES post(id)
);

CREATE TABLE quiz(
fk_usuario INT PRIMARY KEY,
respostas_certas INT NOT NULL,
respostas_erradas INT NOT NULL,
tentativas INT,
pontuacao_final INT NOT NULL,
dt_tentativa DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);
SELECT * FROM quiz;


