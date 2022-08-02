import axios from "axios";
import { PokemonDetail } from "../interface/pokemonDetail";
import { getPokemonDetails } from "./getPokemonDetails";

export interface PokemonListInterface {
  name: string;
  url: string;
}

interface ListPokemonInterface {
  count: number;
  next: null | string;
  previous: null | string;
  results: PokemonDetail[];
}

export async function listPokemons(): Promise<ListPokemonInterface>{
  const endpoint = `${process.env.REACT_APP_POKEAPI}/pokemon`;

  const response = await axios.get<ListPokemonInterface>(endpoint);

  const promiseArr = response.data.results.map(({name})=> getPokemonDetails(name));
  const resultsPromise = await Promise.all(promiseArr);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  return {
    ...response.data,
    results: resultsPromise
  };
}