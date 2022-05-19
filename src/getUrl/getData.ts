import axios from 'axios';

export interface PokemonList {
  count: number;
  next: string;
  previous?: string | undefined;
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

export const getPokemonList = async (url: string | undefined): Promise<PokemonList> => {
  const { data } = await axios.get(url as string);
  return data;
};

export const getPokemon = async (url: string | undefined): Promise<Pokemon> => {
  const { data } = await axios.get<Pokemon>(url as string);
  return data;
};
