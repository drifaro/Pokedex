import React, { ReactNode, useState } from 'react';
import { PokemonDetail } from '../../pokemon/interface/pokemonDetail';

interface FavoriteContextProps {
  favorites: PokemonDetail[];
  setFavorites: React.Dispatch<React.SetStateAction<PokemonDetail[]>>;
}

interface FavoriteProviderProps{
  children: ReactNode;
}

const INITAL_FAVORITES_VALUE: PokemonDetail[] = [];

export const FavoriteContext = React.createContext<FavoriteContextProps>({
  favorites: INITAL_FAVORITES_VALUE,
  setFavorites: () => console.warn(`setFavorites is not ready.`)
});

export const FavoriteProvider: React.FC<FavoriteProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<PokemonDetail[]>(INITAL_FAVORITES_VALUE);

  return (    
    <FavoriteContext.Provider value={{
      favorites,
      setFavorites,
    }}>
      {children}
    </FavoriteContext.Provider>

  );
};
