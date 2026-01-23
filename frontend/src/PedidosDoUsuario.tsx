import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Pedidos } from "./types/ComponetsInterface";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function PedidosDoUsuario() {

  const [pedidos,setPedidos] = useState<Pedidos[]>([])

  async function getPedidos(){
    const {data, error} = await supabase.from("pedidos").select()
    if (error) {
      console.log("Erro ao recuperar pedidos:", error )
      return
    } 
   setPedidos(data ?? [])
  }
  
  useEffect(()=>{
    const novosPedidos = [1,2,3]
    setPedidos(novosPedidos)
  }, [])


  return(
    <div className="flex flex-col pt-28 items-center w-screen h-screen ">
      {pedidos.map((pedido)=>{
       return(
        <figure>
          {pedido}
        </figure>
       )
      })}
    </div>
  )
}