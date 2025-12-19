import { Route, Routes } from "react-router-dom"
import Login from "./Login"
import PaginaPrincipal from "./PaginaPrincipal"
import Favoritos from "./Favoritos"
import Carrinho from "./Carrinho"
import Header from "./Header"
import Footer from "./Footer"
import { useState } from "react"
import Sucesso from "./Sucesso"

export default function App () {

  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [busca, setBusca] = useState("")
  const [carrinho, setCarrinho] = useState<number[]>([]);
  const [totalMasculino, setTotalMasculino] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalFeminino, setTotalFeminino] = useState(0);
  const [totalKids, setTotalKids] = useState(0);
  

  return (
    <div className="h-full w-full flex justify-center flex-col ">
      <Header isFavorited={favoritos.length} 
      onSearchChange={setBusca}
      isInCarrinho={carrinho.length}
      className={
          "w-full left-0 top-0 fixed h-14 bg-white border-b flex justify-between items-center px-4 md:px-10 py-4 z-10"
        } />
    <Routes>
      <Route path="/" element={<PaginaPrincipal busca={busca} setBusca={setBusca} favoritos={favoritos}
      carrinho={carrinho} setCarrinho={setCarrinho} setFavoritos={setFavoritos} totalMasculino={totalMasculino} setTotalMasculino={setTotalMasculino} total={total} setTotal={setTotal} totalFeminino={totalFeminino} setTotalFeminino={setTotalFeminino} totalKids={totalKids} setTotalKids={setTotalKids}/>} />
      <Route path="/Login" element={<Login />} />
      <Route path="/PaginaPrincipal" element={<PaginaPrincipal busca={busca} setBusca={setBusca} favoritos={favoritos} setFavoritos={setFavoritos} carrinho={carrinho} setCarrinho={setCarrinho} totalMasculino={totalMasculino} setTotalMasculino={setTotalMasculino} total={total} setTotal={setTotal} totalFeminino={totalFeminino} setTotalFeminino={setTotalFeminino} totalKids={totalKids} setTotalKids={setTotalKids}/>} />
      <Route path="/Favoritos" element={<Favoritos  favoritos={favoritos} setFavoritos={setFavoritos} carrinho={carrinho} setCarrinho={setCarrinho} totalMasculino={totalMasculino} setTotalMasculino={setTotalMasculino} total={total} setTotal={setTotal} totalFeminino={totalFeminino} setTotalFeminino={setTotalFeminino} totalKids={totalKids} setTotalKids={setTotalKids} />} />
      <Route path="/Carrinho" element={<Carrinho  favoritos={favoritos} setFavoritos={setFavoritos} totalMasculino={totalMasculino} setTotalMasculino={setTotalMasculino} total={total} setTotal={setTotal} totalFeminino={totalFeminino} setTotalFeminino={setTotalFeminino} totalKids={totalKids} setTotalKids={setTotalKids} carrinho={carrinho} setCarrinho={setCarrinho}/>} />
      <Route path="/Sucesso" element={<Sucesso />} />
    </Routes>
    <Footer className={
          "w-full justify-center flex left-0 bottom-0 fixed h-6 bg-primary"
        } />
    </div>
  )
}