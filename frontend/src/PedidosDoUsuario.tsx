import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import {  Pedidos, ItensPedidos } from "./types/ComponetsInterface";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function PedidosDoUsuario ({userID}: {userID:number}){
  const [pedidos,setPedidos] = useState<Pedidos[]>([])
  const [itensPedidos, setItensPedidos] = useState<ItensPedidos[]>([])

  async function getPedidos(){
    const { data } = await supabase
  .from("pedidos")
  .select(`*,itens_pedidos(*,perfumes(*))`).eq("status", "aprovado").eq("user_id", userID) as {data: Pedidos[] | null;}
    
   setPedidos(data)
   console.log(data)
  }
  
  useEffect(()=>{
    getPedidos()
  }, [])


  return(
    <div className="flex flex-col pt-20 items-center w-screen h-screen ">
      {pedidos.map((pedido)=>(
       
        <div className=" bg-white flex m-3 rounded-lg shadow-md w-11/12 " key={pedido.id}>
          <div className="">
            <div>
              {pedido.itens_pedidos?.map((item)=>{
                return(
                  <div className="flex p-2 gap-3  ">
                    <div>
                      <img className="h-24" src={`./public/imagens/${item.perfumes.name_perfume}.png`} alt="" />
                    </div>
                    <div key={item.id}>
                      <p className="text-xl">{item.perfumes?.name_perfume}</p>
                      <p>{`R$ ${pedido.total_pedido}`}</p>
                      <p>{pedido.status}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
       
      ))}
    </div>
  )
}