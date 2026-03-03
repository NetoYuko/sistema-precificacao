/**
 * API de Precificação
 * Autor: Aluizio Antônio
 * Data: Fevereiro/2026
 * Stack: Node.js, Express, PostgreSQL
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

// CONFIGURAÇÃO DE AMBIENTE
const app = express();
const PORT = process.env.SERVER_PORT || 3000;

// Configuração de Middlewares
app.use(express.json());
app.use(cors());

// CONEXÃO COM BANCO DE DADOS
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 5432,
});

// Teste de conexão ao iniciar
pool.connect()
    .then(() => console.log('✅ Banco de Dados conectado com sucesso!'))
    .catch((err) => console.error('❌ Erro de conexão com o Banco:', err.message));

// ROTAS DA APLICAÇÃO

/**
 * ROTA: GET /produtos
 * DESCRIÇÃO: Lista todos os produtos cadastrados.
 */
app.get('/produtos', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM produtos ORDER BY id DESC');
        res.status(200).json(resultado.rows);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ erro: "Erro interno do servidor ao buscar dados." });
    }
});

/**
 * ROTA: POST /produtos
 * DESCRIÇÃO: Cria um novo produto com cálculo automático de preço de venda.
 */
app.post('/produtos', async (req, res) => {
    try {
        const { nome, custo_caixa, quantidade, margem_lucro } = req.body;

        // VALIDAÇÃO
        if (!nome || custo_caixa === undefined || quantidade === undefined || margem_lucro === undefined) {
            return res.status(400).json({ erro: "Todos os campos (nome, custo da caixa, quantidade, margem) são obrigatórios." });
        }

        if (Number(custo_caixa) < 0 || Number(quantidade) <= 0 || Number(margem_lucro) < 0) {
            return res.status(422).json({ erro: "Valores inválidos. A quantidade deve ser maior que zero." });
        }

        // REGRA DE NEGÓCIO
        const custoTotal = Number(custo_caixa);
        const qtd = Number(quantidade);
        const margem = Number(margem_lucro);

        const custoUnidade = custoTotal / qtd;
        const valorLucro = custoUnidade * (margem / 100);
        const precoFinalCalculado = custoUnidade + valorLucro

        // PERSISTÊNCIA
        const query = `
            INSERT INTO produtos (nome, custo_caixa, quantidade, custo_unidade, margem_lucro, preco_venda)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        
        const values = [nome, custoTotal, qtd, custoUnidade, margem, precoFinalCalculado];
        const resultado = await pool.query(query, values);

        // Retorna
        res.status(201).json(resultado.rows[0]);

    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
        res.status(500).json({ erro: "Erro ao salvar no banco de dados." });
    }
});

// INICIALIZAÇÃO
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`🔗 Acesso: http://localhost:${PORT}/produtos`);
});