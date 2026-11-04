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

CREATE TABLE post(
	id INT PRIMARY KEY AUTO_INCREMENT,
	dt_postagem DATETIME DEFAULT CURRENT_TIMESTAMP,
	descricao VARCHAR(200) NULL,
	img_url VARCHAR(250) NULL,
	fk_usuario INT NOT NULL,
	fk_comentario INT,
	FOREIGN KEY (fk_comentario) REFERENCES post(id),
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

CREATE TABLE likes(
	fk_usuario INT,
	fk_post INT,
	dt_like DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(fk_usuario, fk_post),
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id),
    FOREIGN KEY (fk_post) REFERENCES post(id)
);

CREATE TABLE quiz(

);

