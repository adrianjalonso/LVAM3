import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import type { Perfume } from "./types/ComponetsInterface";
import type { Favorites } from "./types/ComponetsInterface";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Favoritos({
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
}: Favorites) {
  const [products, setProducts] = useState<Perfume[]>([]);

  const centralizar =
    products.length === 0
      ? "flex justify-center"
      : "grid md:grid-cols-[repeat(3,minmax(200px,1fr))] lg:grid-cols-[repeat(4,minmax(200px,1fr))] grid-cols-[repeat(2,minmax(150px,1fr))]";

  useEffect(() => {
    setProducts(favoritos);
    obterTotais();
  }, [favoritos]);

  async function obterTotais() {
    const { data } = (await supabase.from("perfumes").select("id,genero")) as {
      data: Perfume[] | null;
    };
    if (data) {
      setTotal(favoritos.length);
      setTotalMasculino(
        data.filter(
          (perfume) =>
            perfume.genero === "masculino" &&
            favoritos.some((item) => item.id === perfume.id)
        ).length
      );
      setTotalFeminino(
        data.filter(
          (perfume) =>
            perfume.genero === "feminino" &&
            favoritos.some((item) => item.id === perfume.id)
        ).length
      );
      setTotalKids(
        data.filter(
          (perfume) =>
            perfume.genero === "kids" &&
            favoritos.some((item) => item.id === perfume.id)
        ).length
      );
    }
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

  return (
    <div className="flex justify-between gap-4  w-full md:w-5/6 lg:w-full pt-20 pb-4 ">
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
        className={`${centralizar} gap-4 w-full  md:w-5/6 lg:w-full pb-4 mx-4`}
      >
        {products.length === 0 ? (
          <p className="w-full flex justify-center items-center">
            Não foram adicionados productos aos favoritos.
          </p>
        ) : (
          products.map((perfume) => {
            const isFavorited = favoritos.some(
              (item) => item.id === perfume.id
            );
            const icon = isFavorited ? "favorite" : "notFavorite";
            const isInCarrinho = carrinho.some(
              (item) => item.id === perfume.id
            );
            const buttonText = isInCarrinho
              ? "Tirar do carrinho"
              : "Adicionar ao carrinho";
            return (
              <figure
                className={`flex flex-col gap-3 pb-3 rounded-lg overflow-hidden shadow-md bg-white transform hover:-translate-y-2 transition-transform duration-300 pt-2 `}
                key={perfume.id}
              >
                <div
                  className={`w-full bg-center bg-no-repeat bg-cover relative `}
                >
                  <img
                    className=" w-full h-full object-cover"
                    src={`./src/imagens/${perfume.name_perfume}.png`}
                    alt="foto"
                  />
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className={`text-lg font-bold leading-normal `}>
                        {perfume.name_perfume}
                      </h1>
                      <p
                        className={`text-base font-medium text-primary  `}
                      >{`R$ ${perfume.price.toFixed(2)}`}</p>
                    </div>
                    <div
                      onClick={() => toggleFavoritos(perfume)}
                      className="flex justify-center items-center  p-1 bg-light size-8 rounded-md hover:bg-primary/20 cursor-pointer transition-colors duration-300 mr-1"
                    >
                      <img src={`./src/imagens/${icon}.svg`} alt="" />
                    </div>
                  </div>
                  <button
                    onClick={() => toggleCarrinho(perfume)}
                    className={`w-full mt-2 text-sm font-bold text-white bg-primary rounded-lg py-2.5 hover:bg-primary/90 transition-colors `}
                    disabled={perfume.estoque === 0}
                  >
                    {buttonText}
                  </button>
                </div>
              </figure>
            );
          })
        )}
      </div>
    </div>
  );
}
