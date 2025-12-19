 export interface Favorites {
  favoritos: number[];
  setFavoritos: React.Dispatch<React.SetStateAction<number[]>>;
  carrinho: number[]
  setCarrinho: React.Dispatch<React.SetStateAction<number[]>>;
  total: number,
  setTotal: React.Dispatch<React.SetStateAction<number>>,
  totalMasculino: number,
  setTotalMasculino: React.Dispatch<React.SetStateAction<number>>
  totalFeminino: number,
  setTotalFeminino: React.Dispatch<React.SetStateAction<number>>
  totalKids: number,
  setTotalKids: React.Dispatch<React.SetStateAction<number>>
}

 export interface Carrinho {
  carrinho: number[]
  setCarrinho: React.Dispatch<React.SetStateAction<number[]>>;
  favoritos: number[];
  setFavoritos: React.Dispatch<React.SetStateAction<number[]>>;
  total: number,
  setTotal: React.Dispatch<React.SetStateAction<number>>,
  totalMasculino: number,
  setTotalMasculino: React.Dispatch<React.SetStateAction<number>>
  totalFeminino: number,
  setTotalFeminino: React.Dispatch<React.SetStateAction<number>>
  totalKids: number,
  setTotalKids: React.Dispatch<React.SetStateAction<number>>
}

 export interface Pages {
  carrinho: number[];
  setCarrinho: React.Dispatch<React.SetStateAction<number[]>>
  favoritos: number[];
  setFavoritos: React.Dispatch<React.SetStateAction<number[]>>;
  busca: string;
  setBusca: React.Dispatch<React.SetStateAction<string>>;
  total: number,
  setTotal: React.Dispatch<React.SetStateAction<number>>,
  totalMasculino: number,
  setTotalMasculino: React.Dispatch<React.SetStateAction<number>>
  totalFeminino: number,
  setTotalFeminino: React.Dispatch<React.SetStateAction<number>>
  totalKids: number,
  setTotalKids: React.Dispatch<React.SetStateAction<number>>
}

export interface Perfume {
  id: number;
  name_perfume: string;
  price: number;
  foto: string;
  genero: string;
  estoque: number;
  presentacao: string;
}
