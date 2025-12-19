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
    getPerfumes();
    obterTotais();
  }, [favoritos]);

  async function getPerfumes() {
    const { data } = (await supabase.from("perfumes").select()) as {
      data: Perfume[] | null;
    };
    if (data) {
      const favoritosPerfumes = data.filter((producto) =>
        favoritos.includes(producto.id)
      );
      setProducts(favoritosPerfumes);
    }
  }

  async function obterTotais() {
    const { data } = (await supabase.from("perfumes").select("id,genero")) as {
      data: Perfume[] | null;
    };
    if (data) {
      setTotal(data.filter((perfume) => favoritos.includes(perfume.id)).length);
      setTotalMasculino(
        data.filter(
          (perfume) =>
            perfume.genero === "masculino" && favoritos.includes(perfume.id)
        ).length
      );
      setTotalFeminino(
        data.filter(
          (perfume) =>
            perfume.genero === "feminino" && favoritos.includes(perfume.id)
        ).length
      );
      setTotalKids(
        data.filter(
          (perfume) =>
            perfume.genero === "kids" && favoritos.includes(perfume.id)
        ).length
      );
    }
  }

  function toggleFavoritos(id: number) {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  }

  function toggleCarrinho(id: number) {
    setCarrinho((prev) =>
      prev.includes(id)
        ? prev.filter((carrinhoId) => carrinhoId !== id)
        : [...prev, id]
    );
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
            const isFavorited = favoritos.includes(perfume.id);
            const icon = isFavorited ? "favorite" : "notFavorite";
            const isInCarrinho = carrinho.includes(perfume.id);
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
                      onClick={() => toggleFavoritos(perfume.id)}
                      className="flex justify-center items-center  p-1 bg-light size-8 rounded-md hover:bg-primary/20 cursor-pointer transition-colors duration-300 mr-1"
                    >
                      <img src={`./src/imagens/${icon}.svg`} alt="" />
                    </div>
                  </div>
                  <button
                    onClick={() => toggleCarrinho(perfume.id)}
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
