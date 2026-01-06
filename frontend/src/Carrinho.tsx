import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import type { Perfume } from "./types/ComponetsInterface";
import type { Carrinho } from "./types/ComponetsInterface";
import CheckoutPage from "./Checkout";
import { Modal } from "./Modal";
import { loadStripe } from "@stripe/stripe-js";
import { Stripe } from "@stripe/stripe-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function Carrinho({
  isLogin,
  setIsLogin,
  favoritos,
  setFavoritos,
  carrinho,
  setCarrinho,
  total,
  setTotal,
  totalMasculino,
  setTotalMasculino,
  totalFeminino,
  setTotalFeminino,
  totalKids,
  setTotalKids,
}: Carrinho) {
  const [products, setProducts] = useState<Perfume[]>([]);
  const [open, setOpen] = useState(false);
  const [valor, setValor] = useState(0);
  const [contador, setContador] = useState<Record<number,number>>({});

  const login = true;

  const centralizar =
    products.length === 0
      ? "flex justify-center"
      : "grid grid-rows-1 md:grid-cols-[repeat(3,minmax(200px,1fr))] lg:grid-cols-[repeat(4,minmax(200px,1fr))] grid-cols-[repeat(2,minmax(150px,1fr))]";

  useEffect(() => {
    setProducts(carrinho);
    obterTotais();
  }, [carrinho]);

  useEffect(() => {
    getPrice();
  }, [products,contador]);

  async function getPrice() {
    const productosEmCarrinho = products.reduce((acumulador, productoa)=>{
      const quantidade = contador[productoa.id]||1;
      return acumulador+productoa.price*quantidade
    },0)

    setValor(productosEmCarrinho);
  }

  async function atualizarEstoque(id: number, novoEstoque: number) {
    const { data, error } = await supabase
      .from("perfumes")
      .update({ estoque: novoEstoque })
      .eq("id", id);
    if (error) {
      console.error("Erro ao atualizar estoque:", error);
    } else {
      console.log("Estoque atualizado: ", data);
    }
  }

  async function obterTotais() {
    const { data } = (await supabase.from("perfumes").select("id,genero")) as {
      data: Perfume[] | null;
    };
    if (data) {
      setTotal(carrinho.length);
      setTotalMasculino(
        data.filter(
          (perfume) =>
            perfume.genero === "masculino" && carrinho.some((item)=> item.id === perfume.id)
        ).length
      );
      setTotalFeminino(
        data.filter(
          (perfume) =>
            perfume.genero === "feminino" && carrinho.some((item)=> item.id === perfume.id)
        ).length
      );
      setTotalKids(
        data.filter(
          (perfume) =>
            perfume.genero === "kids" && carrinho.some((item)=> item.id === perfume.id)
        ).length
      );
    }
  }

  function toggleCarrinho(perfume: Perfume) {
    setCarrinho((prev)=>{
      const existe = prev.find((p)=>p.id=== perfume.id)

      let novoCarrinho;
      if(existe){
        novoCarrinho=prev.filter((p)=> p.id !== perfume.id)
      } else {
        novoCarrinho = [...prev,perfume];
      }
      localStorage.setItem("carrinho",JSON.stringify(novoCarrinho))
      return novoCarrinho
    })
  }

  function toggleFavoritos(perfume: Perfume) {
    setFavoritos((prev) =>{
      const existe = prev.find((p)=> p.id===perfume.id)
      let novosFavoritos;
      if(existe){
        novosFavoritos = prev.filter((p)=> p.id !== perfume.id)
      } else {
        novosFavoritos = [...prev,perfume]
      }
      localStorage.setItem("favoritos",JSON.stringify(novosFavoritos))
      return novosFavoritos

  });
  }

  function botaoPagar() {
    setOpen(true);
  }
  function somar(id:number){
    setContador((prev)=>({
      ...prev,
      [id]:Math.min(5,(prev[id]||1)+1)
    }));
  }
  function restar(id:number){
    setContador((prev)=>({
      ...prev,
      [id]:Math.max(1,(prev[id]||1)-1)
    }));
  }
  

  return (
    <div className="flex flex-col  justify-between gap-4  w-full  lg:w-full pt-20 pb-4 ">
      <div className="flex h-max ">
        <aside className="bg-light pt-1 pb-4  w-52 h-full overflow-y-auto border-dashed border-red-400 justify-center items-start p-5 rounded-lg lg:flex md:flex hidden">
          <section className="bg-white w-full rounded-lg shadow-md h-max">
            <h1 className="font-semibold p-2">{`TODOS (${total})`}</h1>
            <p className="p-2">
              Masculino <span className="text-xs">{`(${totalMasculino})`}</span>
              <span> </span>
            </p>
            <p className="p-2">
              Feminino <span className="text-xs">{`(${totalFeminino})`}</span>
            </p>
            <p className="p-2">
              Kids <span className="text-xs">{`(${totalKids})`}</span>
            </p>
          </section>
        </aside>

        <div
          className={`${centralizar}  gap-4 w-full md:w-5/6 lg:w-full pb-4 mx-4`}
        >
          {products.length === 0 ? (
            <p className="w-full flex justify-center h-screen items-center">
              Não existem produtos no carrinho ainda.
            </p>
          ) : (
            products.map((perfume) => {
              const isFavorited = favoritos.some((item)=> item.id===perfume.id);
              const icon = isFavorited ? "favorite" : "notFavorite";
              const isInCarrinho = carrinho.length;
              return (
                <figure
                  className={`col-span-4 row-span-1 flex flex-col justify-between items-center gap-3 pb-3 rounded-lg overflow-hidden shadow-md bg-white p-6 pt-2 sm:flex-row `}
                  key={perfume.id}
                >
                  <section className="flex px-2 items-center w-44 mt-3">
                    <div
                      className={`size-32 bg-center bg-no-repeat sm:justify-center flex justify-center items-center bg-cover relative `}
                    >
                      <img
                        className="w-full h-full object-cover"
                        src={`./src/imagens/${perfume.name_perfume}.png`}
                        alt="foto"
                      />
                    </div>
                    <div>
                      <h1 className={`text-lg font-bold leading-normal `}>
                        {perfume.name_perfume}
                      </h1>
                      <p>{perfume.presentacao}</p>
                    </div>
                  </section>
                  <div className="flex p-3">
                    <div>
                      <section className=" h-10 flex justify-between gap-4 items-center m-3 sm:w-44 w-auto">
                        <button onClick={()=>restar(perfume.id)} className="w-12 shadow-md text-sm font-bold text-white bg-primary rounded-lg  hover:bg-primary/90 transition-colors "><i className=" text-2xl material-symbols-outlined">remove</i></button>
                        {contador[perfume.id]||1}
                        <button onClick={()=>somar(perfume.id)} className="w-12 shadow-md text-sm font-bold text-white bg-primary rounded-lg  hover:bg-primary/90 transition-colors"><i className=" text-2xl material-symbols-outlined">add</i></button>
                        </section>
                      <section className="flex justify-center">
                        <button
                        onClick={() => toggleCarrinho(perfume)}
                        className={`w-32 shadow-md mt-2 text-sm font-bold text-white bg-primary rounded-lg py-1 hover:bg-primary/90 transition-colors `}
                        disabled={perfume.estoque === 0}
                      >
                        <i className=" text-2xl material-symbols-outlined">delete</i>
                      </button>
                      </section>
                    </div>
                  <div className="p-3 w-44 flex justify-center items-center">
                    <div className="flex justify-center items-center">
                      <p
                        className={`text-base font-medium text-primary  `}
                      >{`R$ ${(perfume.price*(contador[perfume.id]||1)).toFixed(2)}`}</p>
                      <div
                        onClick={() => toggleFavoritos(perfume)}
                        className="flex  justify-center items-center  p-1 bg-light size-8 rounded-md hover:bg-primary/20 cursor-pointer transition-colors duration-300 mr-1"
                      >
                        <img src={`./src/imagens/${icon}.svg`} alt="" />
                      </div>
                    </div>
                    </div>
                  </div>
                </figure>
              );
            })
          )}
        </div>
      </div>
      {products.length !== 0 && (
        <div className="p-2 w-full flex justify-center">
          <button
            className="w-40 shadow-md mt-2 text-sm font-bold text-white bg-primary rounded-lg py-2.5 hover:bg-primary/90 transition-colors"
            onClick={botaoPagar}
          >{`Pagar R$${valor.toFixed(2)}`}</button>
          {login ? (
            <Modal isOpen={open} onClose={() => setOpen(false)}>
              <CheckoutPage stripePromise={stripePromise} valor={valor} />
            </Modal>
          ) : (
            <Modal isOpen={open} onClose={() => setOpen(false)}>
              <div>
                <h1>Aqui adiciona los datos</h1>
                <p>nombre,direction,email</p>
                <button>Cadastrar</button>
              </div>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
}
