
-- Criação da Tabela de Produtos
-- Focada exclusivamente em dados financeiros para cálculo de preço.
CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    -- Dados Financeiros
    preco_custo DECIMAL(10,2) NOT NULL, -- O valor que você pagou
    margem_lucro DECIMAL(5,2) NOT NULL, -- A porcentagem de lucro desejada (%)
    preco_venda DECIMAL(10,2) NOT NULL  -- O valor final calculado (Custo + Margem)
);

-- Dados de Exemplo
-- Insere um produto inicial para facilitar testes imediatos.
-- INSERT INTO produtos (nome, preco_custo, margem_lucro, preco_venda)
-- VALUES ('Produto Teste (Bolo de Rolo)', 20.00, 50.00, 30.00);