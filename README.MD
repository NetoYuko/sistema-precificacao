# 🍞 Sistema de Precificação Full-Stack (React + Node.js)

Uma aplicação Full-Stack desenvolvida para resolver um problema real de gestão comercial: a automatização e padronização do cálculo de preços de venda. 

O sistema elimina a inconsistência de cálculos manuais e garante que a margem de lucro seja aplicada de forma precisa sobre o custo unitário de produtos comprados em atacado (caixas/lotes), protegendo a saúde financeira do negócio.

## 🚀 Tecnologias Utilizadas

**Front-end (Apresentação & UI/UX):**
* React (com Vite)
* Tailwind CSS (Estilização responsiva e componentizada)
* Axios (Consumo da API REST)
* Lucide React (Ícones)

**Back-end (Regras de Negócio & API):**
* Node.js com Express (Criação de rotas RESTful)
* PostgreSQL (Banco de dados relacional)
* `pg` (Driver de conexão com o banco)

## ✨ Funcionalidades (CRUD Completo)

* **Cadastro Inteligente:** Inserção de produtos com cálculo automático de custo unitário e preço final de venda direto no Back-end.
* **Listagem em Tempo Real:** Visualização de todos os itens cadastrados com layout otimizado para mobile.
* **Busca Dinâmica:** Filtro instantâneo de produtos pelo nome diretamente no Front-end, sem recarregar a página.
* **Edição Rápida (Modal):** Atualização de custos, margens e quantidades através de um Modal sobreposto.
* **Exclusão Segura:** Remoção de itens do banco de dados com confirmação de segurança.

## 🛠️ Como Rodar o Projeto Localmente

Este projeto está dividido em duas partes (Monorepo estrutural). Você precisará de dois terminais rodando simultaneamente.

### 1. Configurando o Back-end
1. Navegue até a pasta do servidor: `cd backend-precificacao`
2. Instale as dependências: `npm install`
3. Crie um arquivo `.env` na raiz da pasta e configure suas credenciais do PostgreSQL.
4. Execute o script SQL fornecido (ex: `database.sql`) no seu gerenciador de banco de dados (como DBeaver ou pgAdmin) para criar as tabelas.
5. Inicie o servidor: `npm run dev` (A API rodará na porta 3000).

### 2. Configurando o Front-end
1. Em um novo terminal, navegue até a pasta da interface: `cd frontend-precificacao`
2. Instale as dependências: `npm install`
3. Inicie o servidor de desenvolvimento: `npm run dev`
4. Acesse o link gerado no terminal (geralmente `http://localhost:5173`) no seu navegador.

## 🧠 Arquitetura e Aprendizados

Este projeto consolida conhecimentos avançados no desenvolvimento de software.
* **Separação de Responsabilidades (SoC):** O Front-end é responsável apenas pela coleta de dados e exibição (UI). Toda a matemática crítica e regras de precificação estão blindadas no Back-end.
* **Comunicação Assíncrona:** Gerenciamento de Promises e tratamento de erros utilizando Axios para chamadas HTTP.
* **Gerenciamento de Estado:** Uso intensivo de Hooks do React (`useState`, `useEffect`) para tornar a interface reativa às ações do usuário e aos retornos do banco de dados.
* **Programação Defensiva:** Implementação de validações em ambas as pontas (Front e Back) para evitar falhas com dados nulos ou tipagens incorretas.