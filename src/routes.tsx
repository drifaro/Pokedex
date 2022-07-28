import React from 'react';
import { Routes, Route } from "react-router-dom";
import Pokedex from './pokedex/Pokedex';
import PokemonDetails from './pokemon/PokemonDetails';

interface RoutesProps {

}

export const AppRoutes: React.FC<RoutesProps> = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Pokedex />} >
        </Route>
        <Route path="/pokemon" element={<PokemonDetails />} >
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;