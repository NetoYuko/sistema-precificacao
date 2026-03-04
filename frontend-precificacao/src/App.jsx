import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CadastroProduto from "./pages/CadastroProduto";
import ProdutosCadastrados from "./pages/ProdutosCadastrados";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<CadastroProduto />} />
        <Route path="/produtos" element={<ProdutosCadastrados />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
