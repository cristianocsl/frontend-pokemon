import axios from 'axios';
import { urlWithLimit } from './urlApi';

export interface PokemonList {
  count: number;
  next: string;
  previous?: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  base_experience: number;
  abilities: {
    ability: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
}

const LIMIT = 10;

export const getPokemonList = async (): Promise<PokemonList> => {
  const { data } = await axios.get(urlWithLimit(LIMIT));
  return data;
};

export const getPokemon = async (url: string): Promise<Pokemon> => {
  const { data } = await axios.get<Pokemon>(url);
  return data;
};
