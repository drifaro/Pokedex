import axios from "axios";

export interface PokemonListInterface {
  name: string;
  url: string;
}

interface ListPokemonInterface {
  count: number;
  next: null | string;
  previous: null | string;
  results: PokemonListInterface[];
}

export async function listPokemons(): Promise<ListPokemonInterface>{
  const endpoint = `${process.env.REACT_APP_POKEAPI}/pokemon`;

  const response = await axios.get<ListPokemonInterface>(endpoint);

  return response.data;
}