import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center p-6">
      {/* Titulo*/}
      <header className="mb-10 text-center">
        <h1 className="text-xl font-bold text-white">
          Sistema de Precificação
        </h1>
      </header>
      {/* Container dos botões*/}
      <nav className="flex flex-col w-full max-w-2xs gap-4">
        <Link to="/cadastro" className="flex items-center justify-center gap-3 bg-[#1a1d24] border border-gray-700 rounded-2xl p-5 w-full active:scale-95 transition-transform">
          <span className="text-emerald-500 font-bold text-xl">#</span>
          <span className="text-white font-semibold text-lg">Novo Produto</span>
        </Link>
        <button className="flex items-center justify-center gap-3 bg-[#1a1d24] border border-gray-700 rounded-2xl p-5 w-full active:scale-95 transition-transform">
          <span className="text-emerald-500 font-bold text-xl">#</span>
          <span className="text-white font-semibold text-lg">Ver Produtos</span>
        </button>
      </nav>
    </main>
  )
}