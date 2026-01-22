import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Perfume } from "./types/ComponetsInterface";

export default function Header ({className, onSearchChange, isFavorited, isInCarrinho, disable, isLogin,setIsLogin,menu, setMenu, setUserID, setCarrinho}: {className: string,isFavorited: number,isInCarrinho: number, disable?: boolean, onSearchChange?: (value: string) => void, isLogin: boolean,setIsLogin: React.Dispatch<React.SetStateAction<boolean>>,menu: boolean,setMenu: React.Dispatch<React.SetStateAction<boolean>>,setUserID: React.Dispatch<React.SetStateAction<number>>,setCarrinho: React.Dispatch<React.SetStateAction<Perfume[]>>}){

  

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange?.(e.target.value);}

  const divIconClass = "items-center  p-1 bg-light h-10  rounded-md hover:bg-primary/20 cursor-pointer transition-colors duration-300"

  const desactivar = disable ? "hidden" : ""
  
  function logout() {
  localStorage.removeItem("isLogin");
  localStorage.removeItem("userID");
  localStorage.removeItem("carrinho");
  setIsLogin(false);
  setUserID(0);
  setCarrinho([])
}


  return(
  <header className={className}>
  <Link to="/" ><img  className="sm:h-12 h-6" src="./src/imagens/logo.png" alt="logo Abdon Modas" /></Link>
  <div className={`flex-1 px-1`}>
    <label className="flex flex-col w-full !h-10">
    <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
    <div className={`text-gray-500 flex border-none bg-light items-center justify-center pl-4 rounded-l-lg border-r-0 ${desactivar}`}>
      <i className="material-symbols-outlined">search</i>
    </div>
      <input onChange={handleSearch} className={`duration-1000 flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg  focus:outline-0 focus:ring-2 focus:ring-inset
 focus:ring-primary/50 border-none bg-light  h-full placeholder:text-gray-500 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal ${desactivar}`} placeholder="Estou buscando..." />
      </div>
    </label>
  </div>
  <div className="flex flex-col">
    <div className={`${desactivar} flex gap-3 relative`}>
      <Link to={isLogin ? "/Conta": "/Login"} className={`${divIconClass} sm:flex hidden w-10 justify-center `}><i className="text-2xl material-symbols-outlined ">person</i></Link>
      <button onClick={()=>setMenu(!menu)} className={`${divIconClass} sm:hidden flex w-10 justify-center`}><i className="text-2xl material-symbols-outlined ">menu</i></button>
      <Link to="/Carrinho" className={` ${desactivar} sm:flex hidden w-10 justify-center ${divIconClass} relative`}>
         { isInCarrinho > 0 && (<span className={`flex justify-center items-center absolute text-white text-center text-xs font-semibold rounded-full top-1 left-6 bg-primary size-[14px] `}><p>{isInCarrinho}</p></span>)}
        <i className=" text-2xl material-symbols-outlined">shopping_cart</i>
        </Link>
      <Link to="/Favoritos" className={`${divIconClass} sm:flex hidden w-10 justify-center  ${desactivar} relative`}>
        {isFavorited > 0 && (<span className={`flex justify-center items-center absolute text-white text-center text-xs font-semibold rounded-full top-1 left-6 bg-primary size-[14px] `}><p>{isFavorited}</p></span>)}
        <i className="text-2xl material-symbols-outlined">favorite</i></Link>
        {isLogin && <Link to="/PaginaPrincipal" onClick={logout} className={`${divIconClass} sm:flex hidden w-10 justify-center  ${desactivar} relative`}><i className="text-2xl material-symbols-outlined ">logout</i></Link>}
    </div>
    {menu && (
      <nav onClick={()=>setMenu(!menu)} className="absolute top-full left-0 bg-white w-full shadow-md">
        <ul>
           <li><Link to="/" className={`${divIconClass} w-full flex gap-3 justify-start`}><i className="text-2xl material-symbols-outlined ">home</i>Início</Link></li>
          <li><Link to={isLogin ? "/Conta": "/Login"} className={`${divIconClass} w-full flex gap-3 justify-start`}><i className="text-2xl material-symbols-outlined ">person</i>Minha conta</Link></li>
          <li><Link to="/Carrinho" className={`${divIconClass} w-full flex gap-3 justify-start relative`}>{ isInCarrinho > 0 && (<span className={`flex justify-center items-center absolute text-white text-center text-xs font-semibold rounded-full top-1 left-6 bg-primary size-[14px] `}><p>{isInCarrinho}</p></span>)}<i className="text-2xl material-symbols-outlined ">shopping_cart</i>Carrinho</Link></li>
          <li><Link to="/Favoritos" className={`${divIconClass} relative w-full flex gap-3 justify-start`}>{isFavorited > 0 && (<span className={`flex justify-center items-center absolute text-white text-center text-xs font-semibold rounded-full top-1 left-6 bg-primary size-[14px] `}><p>{isFavorited}</p></span>)}<i className="text-2xl material-symbols-outlined ">favorite</i>Favoritos</Link></li>
          {isLogin && <Link to="/PaginaPrincipal" onClick={logout} className={`${divIconClass} relative w-full flex gap-3 justify-start`}><i className="text-2xl material-symbols-outlined ">logout</i>Sair</Link>}
        </ul>
      </nav>
    )}
  </div>
  </header>)
}