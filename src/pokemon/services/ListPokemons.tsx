import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { PokemonDetail } from "../interface/pokemonDetail";
import { getPokemonDetails } from "./getPokemonDetails";

export interface PokemonListInterface {
  name: string;
  url: string;
}

interface ListPokemonInterface {
  count: number;
  next: null | string | undefined ;
  previous: null | string | undefined;
  results: PokemonDetail[];
}

export async function listPokemons(page = 1): Promise<ListPokemonInterface>{

  const offset = (page - 1) * 12;

  let endpoint = `${process.env.REACT_APP_POKEAPI}/pokemon?limit=12&offset=${offset}`;

  const response = await axios.get<ListPokemonInterface>(endpoint);

  const promiseArr = response.data.results.map(({name})=> getPokemonDetails(name));

  const resultsPromise = await Promise.all(promiseArr);

  return {
    ...response.data,
    results: resultsPromise
  };
}