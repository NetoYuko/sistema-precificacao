import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CadastroProduto() {
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [custo, setCusto] = useState('');
    const [margem, setMargem] = useState('');

    const limparFormulario = () => {
        setNome('');
        setQuantidade('');
        setCusto('');
        setMargem('');
    };

    return(
        <main className="min-h-screen bg-[#0d1117] flex flex-col items-center p-6 font-sans">
            {/* Titulo*/}
            <header className="w-full max-x-xs mt-8 mb-8 text-center">
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                Sistema de Precificação
                </h1>
                <h2 className="text-lg font-bold text-emerald-600">Cadastrar Produto</h2>
            </header>

            {/* Formulário para cadastro de produtos */}
            <form className="w-full max-w-xs flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="nome" className="text-gray-400 text-sm">Nome do Produto:</label>
                    <input 
                        type="text" 
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)} 
                        className="bg-[#1a1d24] border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-600 transition-colors" 
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="quantidade" className="text-gray-400 text-sm">Quantidade da caixa:</label>
                    <input 
                        type="number" 
                        id="quantidade" 
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        className="bg-[#1a1d24] border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-600 transition-colors" 
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="custo" className="text-gray-400 text-sm">Custo total da caixa (R$):</label>
                    <input 
                        type="number" 
                        id="custo" 
                        step="0.01"
                        value={custo}
                        onChange={(e) => setCusto(e.target.value)} 
                        className="bg-[#1a1d24] border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-600 transition-colors" 
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="margem" className="text-gray-400 text-sm">Margem de lucro (%):</label>
                    <input 
                        type="number" 
                        id="margem"
                        value={margem}
                        onChange={(e) => setMargem(e.target.value)}
                        className="bg-[#1a1d24] border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-600 transition-colors" 
                    />
                </div>

                {/* Botões formulário */}
                <div className="flex gap-3 mt-2">
                    <button type="submit" className="flex-1 bg-green-700 hover:bg-green-600 text-white font-bold rounded-xl p-3 active:scale-95 transition-transform">
                        Adicionar Produto
                    </button>
                    <button type="button" onClick={limparFormulario} className="flex-1 bg-transparent border border-gray-800 text-gray-400 font-semibold rounded-xl p-3 active:scale-95 transition-transform hover:bg-[#1a1d24]">
                        Limpar
                    </button>
                </div>

                {/* Botão voltar */}
                <Link to="/" className="mt-4 mx-auto text-center block bg-transparent border border-gray-800 text-gray-400 text-sm rounded-xl py-2 px-8 active:scale-95 transition-transform hover:bg-[#1a1d24]">
                    Voltar
                </Link>
            </form>
        </main>
    );
}