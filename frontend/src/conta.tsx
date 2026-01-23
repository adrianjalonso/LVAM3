import { createClient } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import { Usuario } from "./types/ComponetsInterface"
import { Link } from "react-router-dom"

 
 const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
 )

 
 export default function Conta({userID}:{userID: number}) {

    const [user, setUser] = useState<Usuario|null>(null)


    useEffect(() => {
    if (!userID) return;

    async function getData() {
      const { data, error } = await supabase
        .from("usuarios")
        .select()
        .eq("id", userID)
        .single();

      if (error) {
        console.error("Erro ao buscar usuario:", error);
        return;
      }

      if (data) {
        setUser(data)
      }
    }
    
    getData();
   
  }, [userID])



  return(
    <div className="flex flex-col pt-20 items-center w-screen h-screen ">
    <h1 className="text-2xl font-bold">Minha conta</h1>
    <div className="flex justify-evenly items-center w-11/12 bg-white shadow-lg rounded-lg rounded-b-none">
      <div className="flex justify-center items-center  m-2">
        <figure className=" flex justify-center items-center font-bold size-20 border border-red-500 text-4xl text-primary rounded-full bg-primary/20 px-4 py-2"><p>{user?.name[0].toUpperCase()}</p></figure>
      </div>
      <div className=" p-4 w-5/6">
        <h2 className="text-2xl">{user?.name}</h2>
        <p className="text-xs">{user?.email}</p>
        <p className="text-xs">{user?.id}</p>
        <div className="flex justify-center">
          <button className="w-5/6 mt-2 text-sm  font-bold text-white bg-primary rounded-lg py-2 hover:bg-primary/90 transition-colors">Editar perfil</button>
          </div>
      </div>
    </div>
    <div className="w-11/12 bg-white">
      <Link to="/Pedidos" className="flex justify-between items-center">
      <div className="flex justify-center items-center"><span className="material-symbols-outlined text-2xl px-3 py-1 text-gray-500">fragrance</span><p className="text-xl text-gray-500">Pedidos</p></div>
      <div className="flex justify-center items-center mr-4"><span className="material-symbols-outlined text-base text-gray-500">arrow_forward_ios</span></div>
      </Link>
      <hr className="border border-gray-100" />
       <Link to="/Pedidos" className="flex justify-between items-center">
      <div className="flex justify-center items-center"><span className="material-symbols-outlined text-2xl px-3 py-1 text-gray-500">article_person</span><p className="text-xl text-gray-500">Dados pessoais</p></div>
      <div className="flex justify-center items-center mr-4"><span className="material-symbols-outlined text-base text-gray-500">arrow_forward_ios</span></div>
      </Link>
    </div>
    </div>
  )
 }