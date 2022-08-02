import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import FavoritesScreen from './favorites/FavoritesScreen';
import Pokedex from './pokedex/Pokedex';
import PokemonDetails from './pokemon/PokemonDetails';

interface RoutesProps {

}

export const AppRoutes: React.FC<RoutesProps> = () => {
  const location = useLocation();
  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Pokedex />} >
        </Route>
        <Route path="/pokemon/:name" element={<PokemonDetails />} >
        </Route>
        <Route path="/favoritos" element={<FavoritesScreen />} >
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;