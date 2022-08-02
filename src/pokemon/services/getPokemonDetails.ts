import axios from "axios";
import { PokemonDetail } from "../interface/pokemonDetail";


export async function getPokemonDetails(name: string): Promise<PokemonDetail>{
  const endpoint = `${process.env.REACT_APP_POKEAPI}/pokemon/${name}`;

  const response = await axios.get<PokemonDetail>(endpoint);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  return response.data;
}