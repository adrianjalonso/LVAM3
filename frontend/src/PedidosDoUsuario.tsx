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
    <div className="flex flex-col pt-28 items-center w-screen h-screen ">
      {pedidos.map((pedido)=>(
       
        <div className="size-32 bg-red-600 flex m-3" key={pedido.id}>
          <p>${pedido.total_pedido}</p>
          {pedido.itens_pedidos?.map((item)=>{
            return(
              <div key={item.id}>
                <p>{item.quantidade}</p>
                <p>{item.perfumes?.name_perfume}</p>
                <p>{pedido.total_pedido}</p>
              </div>
            )
          })}
        </div>
       
      ))}
    </div>
  )
}