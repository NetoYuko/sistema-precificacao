import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function MeusProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState('');

  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null);

  //rodar o useEffect para buscar os produtos
  useEffect(() => {
    buscarProdutos();
  }, []);

  //Função para buscar produtos no servidor
  const buscarProdutos = async () => {
    try {
      //Faz o get na Api para trazer a lista de produtos
      const resposta = await axios.get("http://localhost:3000/produtos");
      setProdutos(resposta.data);
    } catch (erro) {
      console.error("Erro ao buscar produtos: ", erro);
    }
  };

  //Função para excluir produto
  const excluirProduto = async (id) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este produto?",
    );
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:3000/produtos/${id}`);

      setProdutos(produtos.filter((produto) => produto.id !== id));
    } catch (erro) {
      console.error("Erro ao excluir:", erro);
      alert("Erro ao excluir o produto. Verifique se o back-end está rodando.");
    }
  };

  //EDITAR PRODUTO
  const abrirModalEdicao = (produto) => {
    setProdutoEmEdicao({ ...produto });
  };

  const fecharModal = () => {
    setProdutoEmEdicao(null);
  };

  const salvarEdicao = async (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault(); 
    }

    const pacoteDeDados = {
      nome: produtoEmEdicao.nome,
      custo_caixa: Number(
        String(produtoEmEdicao.custo_caixa).replace(",", "."),
      ),
      quantidade: Number(produtoEmEdicao.quantidade),
      margem_lucro: Number(
        String(produtoEmEdicao.margem_lucro).replace(",", "."),
      ),
    };

    try {
      await axios.put(
        `http://localhost:3000/produtos/${produtoEmEdicao.id}`,
        pacoteDeDados,
      );
      buscarProdutos();
      fecharModal();
      alert("Produto atualizado com sucesso!");
    } catch (erro) {
      console.error("Erro ao editar:", erro);
      alert("Erro ao atualizar o produto.");
    }
  };

  //função auxiliar para formatar moeda
  const formatarMoeda = (valor) => {
    return Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  //Função para buscar produtos
  const produtosFiltrados = produtos.filter((produto) => {
    return produto.nome.toLowerCase().includes(busca.toLowerCase());
  });

  return (
    <main className="h-[100dvh] bg-[#0d1117] flex flex-col items-center p-6 font-sans">
      <header className="w-full max-x-xs mt-8 mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          Sistema de Precificação
        </h1>
        <h2 className="text-lg font-bold text-emerald-600">Meus produtos</h2>
      </header>
      {/* Barra de Busca */}
      <search className="w-full max-w-sm mb-6">
        <label htmlFor="busca" className="sr-only">
          Buscar produto
        </label>
        <input
          type="text"
          placeholder="Buscar produto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full bg-[#1a1d24] border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-600 transition-colors"
        />
      </search>
      {/* Lista de Produtos (Cards) */}
      <section className="w-full max-w-sm flex-1 overflow-y-auto pb-4">
        {produtosFiltrados.length === 0 ? (
          <p className="text-gray-400 text-center mt-4">
            Nenhum produto encontrado.
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {produtosFiltrados.map((produto) => (
              <li
                key={produto.id}
                className="bg-[#1a1d24] border border-gray-800 rounded-2xl p-4 shadow-lg"
              >
                <article className="flex flex-col h-full">
                  <header className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="text-white font-bold text-lg leading-tight flex-1 line-clamp-2">
                      {produto.nome}
                    </h3>
                    <div className="flex gap-5 shrink-0 mt-1">
                      <button 
                        onClick={() => abrirModalEdicao(produto)}
                        className="text-blue-400 text-sm font-semibold active:scale-95 transition-transform">
                        Editar
                      </button>
                      <button
                        onClick={() => excluirProduto(produto.id)}
                        className="text-red-500 text-sm font-semibold active:scale-95 transition-transform"
                      >
                        Excluir
                      </button>
                    </div>
                  </header>

                  <dl className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-gray-400 mb-3">
                    <div className="flex gap-1">
                      <dt className="font-medium">Caixa:</dt>
                      <dd className="text-gray-300 m-0">
                        {formatarMoeda(produto.custo_caixa)}
                      </dd>
                    </div>
                    <div className="flex gap-1">
                      <dt className="font-medium">Qtd:</dt>
                      <dd className="text-gray-300 m-0">
                        {produto.quantidade} un
                      </dd>
                    </div>
                    <div className="flex gap-1">
                      <dt className="font-medium">Custo Unid:</dt>
                      <dd className="text-gray-300 m-0">
                        {formatarMoeda(produto.custo_unidade)}
                      </dd>
                    </div>
                    <div className="flex gap-1">
                      <dt className="font-medium">Margem:</dt>
                      <dd className="text-gray-300 m-0">
                        {produto.margem_lucro}%
                      </dd>
                    </div>
                  </dl>

                  <footer className="mt-auto pt-3 border-t border-gray-800 flex justify-between items-center">
                    <span className="text-gray-400 text-sm font-medium">
                      Preço de Venda:
                    </span>
                    <strong className="text-2xl font-bold text-emerald-500">
                      {formatarMoeda(produto.preco_venda)}
                    </strong>
                  </footer>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>
      <nav className="w-full max-w-sm pt-4 mt-auto flex justify-center">
        <Link
          to="/"
          className="mt-4 mx-auto w-fit text-center bg-transparent border border-gray-800 text-gray-400 text-sm rounded-xl py-2 px-8 active:scale-95 transition-transform hover:bg-[#1a1d24]"
        >
          Voltar
        </Link>
      </nav>

      {/* Modal de edição */}
      {produtoEmEdicao && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0d1117] border border-gray-800 rounded-2xl p-6 w-full max-w-xs shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Editar Produto</h3>

            <form onSubmit={salvarEdicao} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-gray-400 text-xs">Nome:</label>
                <input
                  type="text"
                  value={produtoEmEdicao.nome}
                  onChange={(e) =>
                    setProdutoEmEdicao({
                      ...produtoEmEdicao,
                      nome: e.target.value,
                    })
                  }
                  className="bg-[#1a1d24] border border-gray-800 rounded-xl p-2 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-gray-400 text-xs">
                    Custo Caixa (R$):
                  </label>
                  <input
                    type="text"
                    value={produtoEmEdicao.custo_caixa}
                    onChange={(e) =>
                      setProdutoEmEdicao({
                        ...produtoEmEdicao,
                        custo_caixa: e.target.value,
                      })
                    }
                    className="bg-[#1a1d24] border border-gray-800 rounded-xl p-2 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-gray-400 text-xs">Quantidade:</label>
                  <input
                    type="number"
                    value={produtoEmEdicao.quantidade}
                    onChange={(e) =>
                      setProdutoEmEdicao({
                        ...produtoEmEdicao,
                        quantidade: e.target.value,
                      })
                    }
                    className="bg-[#1a1d24] border border-gray-800 rounded-xl p-2 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-gray-400 text-xs">Margem (%):</label>
                <input
                  type="text"
                  value={produtoEmEdicao.margem_lucro}
                  onChange={(e) =>
                    setProdutoEmEdicao({
                      ...produtoEmEdicao,
                      margem_lucro: e.target.value,
                    })
                  }
                  className="bg-[#1a1d24] border border-gray-800 rounded-xl p-2 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-800 hover:bg-green-900 text-white font-bold text-sm rounded-xl p-2 active:scale-95 transition-transform"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={fecharModal}
                  className="flex-1 bg-transparent border border-gray-800 text-gray-400 font-semibold text-sm rounded-xl p-2 active:scale-95 transition-transform hover:bg-[#1a1d24]"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}
