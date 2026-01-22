 export interface Favorites {
  favoritos: Perfume[];
  setFavoritos: React.Dispatch<React.SetStateAction<Perfume[]>>;
  carrinho: Perfume[]
  setCarrinho: React.Dispatch<React.SetStateAction<Perfume[]>>;
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
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  carrinho: Perfume[]
  setCarrinho: React.Dispatch<React.SetStateAction<Perfume[]>>;
  favoritos: Perfume[];
  setFavoritos: React.Dispatch<React.SetStateAction<Perfume[]>>;
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
  menu: boolean,
  setMenu:React.Dispatch<React.SetStateAction<boolean>>,
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  carrinho: Perfume[];
  setCarrinho: React.Dispatch<React.SetStateAction<Perfume[]>>
  favoritos: Perfume[];
  setFavoritos: React.Dispatch<React.SetStateAction<Perfume[]>>;
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
  genero: string;
  estoque: number;
  presentacao: string;
}

export interface Usuario {
  id: number,
  name: string,
  email: string,
}
