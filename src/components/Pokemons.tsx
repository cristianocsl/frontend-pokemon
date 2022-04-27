import React, { useEffect, useState } from 'react';
import PromisePool from "@supercharge/promise-pool";
import { getPokemonList, Pokemon, getPokemon, PokemonList } from '../getUrl/getData';
import Card from './Card';
import { Wrap } from '@chakra-ui/react';

const Pokemons: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [pagination, setPagination] = useState<PokemonList>();
  useEffect(() => {
    async function getData() {
      const listOf = await getPokemonList();
      setPagination(listOf);
      const data = await PromisePool.withConcurrency(2)
        .for(listOf.results)
        .process(async (data) => {
          return await getPokemon(data.url);
        });
      setPokemonList(data.results);
    }
    getData();
  }, []);

  console.log(pagination);
  return (
    <div>
      <Wrap
        py={[0, 3]}
        justify='center'
      >
        {pokemonList.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
          ))}
      </Wrap>
      <a href={pagination?.next}>
        CLIQUE
      </a>
    </div>
  );
}

export default Pokemons;
