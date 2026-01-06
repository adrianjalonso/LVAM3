import { Route, Routes } from "react-router-dom"
import { useEffect } from "react"
import Login from "./Login"
import PaginaPrincipal from "./PaginaPrincipal"
import Favoritos from "./Favoritos"
import Carrinho from "./Carrinho"
import Header from "./Header"
import { useState } from "react"
import Sucesso from "./Sucesso"
import { Perfume } from "./types/ComponetsInterface"
import Conta from "./conta"

export default function App () {

  const [favoritos, setFavoritos] = useState<Perfume[]>([]);
  const [busca, setBusca] = useState("")
  const [carrinho, setCarrinho] = useState<Perfume[]>([]);
  const [totalMasculino, setTotalMasculino] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalFeminino, setTotalFeminino] = useState(0);
  const [totalKids, setTotalKids] = useState(0);
  const [isLogin, setIsLogin] = useState(true)
  const [menu,setMenu] = useState(false)

  useEffect(() => {
  const carrinhoStorage = localStorage.getItem("carrinho");

  if (carrinhoStorage) {
    try {
      const carrinhoParseado: Perfume[] = JSON.parse(carrinhoStorage);
      setCarrinho(carrinhoParseado);
    } catch (e) {
      console.error("Erro ao ler carrinho do localStorage", e);
    }
  }
}, []);

 useEffect(() => {
  const favoritoStorage = localStorage.getItem("favoritos");

  if (favoritoStorage) {
    try {
      const favoritoParseado: Perfume[] = JSON.parse(favoritoStorage);
      setFavoritos(favoritoParseado);
    } catch (e) {
      console.error("Erro ao ler carrinho do localStorage", e);
    }
  }
}, []);  

  return (
    <div className="h-full w-full flex justify-center flex-col ">
      <Header isFavorited={favoritos.length} 
      onSearchChange={setBusca}
      isInCarrinho={carrinho.length}
      isLogin={isLogin}
      setIsLogin={setIsLogin}
      menu={menu}
      setMenu={setMenu}
      className={
          "fixed top-0 left-0 w-full h-14 min-h-14 bg-white border-b flex gap-1 items-center px-4 md:px-10 z-10"
        } />
    <Routes>
      <Route path="/" element={<PaginaPrincipal menu={menu} setMenu={setMenu} isLogin={isLogin} setIsLogin={setIsLogin} busca={busca} setBusca={setBusca} favoritos={favoritos}
      carrinho={carrinho} setCarrinho={setCarrinho} setFavoritos={setFavoritos} totalMasculino={totalMasculino} setTotalMasculino={setTotalMasculino} total={total} setTotal={setTotal} totalFeminino={totalFeminino} setTotalFeminino={setTotalFeminino} totalKids={totalKids} setTotalKids={setTotalKids}/>} />
      <Route path="/Login" element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />} />
      <Route path="/PaginaPrincipal" element={<PaginaPrincipal menu={menu} setMenu={setMenu} isLogin={isLogin} setIsLogin={setIsLogin} busca={busca} setBusca={setBusca} favoritos={favoritos} setFavoritos={setFavoritos} carrinho={carrinho} setCarrinho={setCarrinho} totalMasculino={totalMasculino} setTotalMasculino={setTotalMasculino} total={total} setTotal={setTotal} totalFeminino={totalFeminino} setTotalFeminino={setTotalFeminino} totalKids={totalKids} setTotalKids={setTotalKids}/>} />
      <Route path="/Favoritos" element={<Favoritos  favoritos={favoritos} setFavoritos={setFavoritos} carrinho={carrinho} setCarrinho={setCarrinho} totalMasculino={totalMasculino} setTotalMasculino={setTotalMasculino} total={total} setTotal={setTotal} totalFeminino={totalFeminino} setTotalFeminino={setTotalFeminino} totalKids={totalKids} setTotalKids={setTotalKids} />} />
      <Route path="/Carrinho" element={<Carrinho isLogin={isLogin} setIsLogin={setIsLogin} favoritos={favoritos} setFavoritos={setFavoritos} totalMasculino={totalMasculino} setTotalMasculino={setTotalMasculino} total={total} setTotal={setTotal} totalFeminino={totalFeminino} setTotalFeminino={setTotalFeminino} totalKids={totalKids} setTotalKids={setTotalKids} carrinho={carrinho} setCarrinho={setCarrinho}/>} />
      <Route path="/Conta" element={<Conta />}/>
      <Route path="/Sucesso" element={<Sucesso />} />
    </Routes>
    </div>
  )
}


