CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

CREATE TABLE IF NOT EXISTS produto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  descricao TEXT
);

CREATE TABLE IF NOT EXISTS carrinho_de_compra (
  id INT AUTO_INCREMENT PRIMARY KEY,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS carrinho_produto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  carrinhoId INT NOT NULL,
  produtoId INT NOT NULL,
  quantidade INT DEFAULT 1,
  CONSTRAINT fk_carrinho FOREIGN KEY (carrinhoId) REFERENCES carrinho_de_compra(id),
  CONSTRAINT fk_produto FOREIGN KEY (produtoId) REFERENCES produto(id)
);
