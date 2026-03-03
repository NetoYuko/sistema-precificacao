CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    custo_caixa DECIMAL(10,2) NOT NULL,
    quantidade INTEGER NOT NULL,
    custo_unidade DECIMAL(10,2) NOT NULL,
    margem_lucro DECIMAL(10,2) NOT NULL,
    preco_venda DECIMAL(10,2) NOT NULL
);