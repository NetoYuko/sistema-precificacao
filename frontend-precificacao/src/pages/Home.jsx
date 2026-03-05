import { Link } from "react-router-dom";
import { PlusCircle, ListChecks } from 'lucide-react';

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
        <Link
          to="/cadastro"
          className="flex items-center justify-center gap-3 bg-[#1a1d24] border border-gray-700 rounded-2xl p-5 w-full active:scale-95 transition-transform"
        >
          <PlusCircle className="text-emerald-500 w-6 h-6" />
          <span className="text-white font-semibold text-lg">Novo Produto</span>
        </Link>
        <Link
          to="/produtos"
          className="flex items-center justify-center gap-3 bg-[#1a1d24] border border-gray-700 rounded-2xl p-5 w-full active:scale-95 transition-transform"
        >
          <ListChecks className="text-emerald-500 w-6 h-6" />
          <span className="text-white font-semibold text-lg">Ver Produtos</span>
        </Link>
      </nav>
    </main>
  );
}
