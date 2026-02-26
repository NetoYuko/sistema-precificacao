import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CadastroProduto from './pages/CadastroProduto';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Quando a URL for "/", mostra a Home */}
        <Route path="/" element={<Home />} />
        
        {/* Quando a URL for "/cadastro", mostra a tela de Cadastro */}
        <Route path="/cadastro" element={<CadastroProduto />} />
      </Routes>
    </BrowserRouter>
  );
}