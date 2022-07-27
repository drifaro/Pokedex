import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface PokedexProps {
  
}

interface PokemonListInterface {
  name: string;
  url: string;
}


export const Pokedex: React.FC<PokedexProps> = () => {
  const [getPokemons, setPokemons] = useState<PokemonListInterface[]>([]);
  const [getSelectedPokemon, setSelectedPokemon] = useState<PokemonListInterface |undefined>(undefined);
  const [getSelectedPokemonDetails, setSelectedPokemonDetails] = useState<any |undefined>(undefined);
  
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon').then((response)=> setPokemons(response.data.results));
  }, []);
  
  useEffect(() => {

    if (!getSelectedPokemon) return;

    axios.get(`https://pokeapi.co/api/v2/pokemon/${getSelectedPokemon.name}`).then((response)=> setSelectedPokemonDetails(response.data));

  }, [getSelectedPokemon]);

  return (
    <div>
      <h1>Pokedex</h1>

      Pokemons:
      {getPokemons.map((pokemon) => <button onClick={() => setSelectedPokemon(pokemon)}>{pokemon.name}</button>)}

      <h2>Pokemon selecionado: {getSelectedPokemon?.name || 'Nenhum pokemon selecionado.'}</h2>
      {JSON.stringify(getSelectedPokemonDetails, undefined, 2)}
    </div>
  );
};

export default Pokedex;