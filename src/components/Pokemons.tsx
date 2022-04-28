import React, { useEffect, useState } from 'react';
import PromisePool from "@supercharge/promise-pool";
import { getPokemonList, Pokemon, getPokemon, PokemonList } from '../getUrl/getData';
import Card from './Card';
import { Wrap, Button, Center, Box, Stack } from '@chakra-ui/react';

const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10';

const Pokemons: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [pagination, setPagination] = useState<PokemonList>();
  const [newUrl, setNewUrl] = useState<string | undefined | null>(url);
  
  useEffect(() => {
    async function getData() {
      const listOf = await getPokemonList(newUrl as any);
      setPagination(listOf);
      const data = await PromisePool.withConcurrency(2)
        .for(listOf.results)
        .process(async (data) => {
          return await getPokemon(data.url);
        });
      setPokemonList(data.results);
    }
    getData();
  }, [newUrl]);

  return (
    <div>
      <Wrap
        py={[0, 3]}
        justify='center'
      >
        {pokemonList.map((pokemon) => <Card key={pokemon.id} pokemon={pokemon} />)}
      </Wrap>
      <Center py='12px'>
        <Stack direction={'row'} spacing={5}>
          <Button
            color={'card.bege'}
            onClick={() => setNewUrl(pagination?.previous)}
            bg={'card.deepPurple'}
            _hover={{
              bg: 'card.softPurple',
              color: 'card.bege',
            }}
          >
            Previous
          </Button>
          <Button
            color={'card.bege'}
            onClick={() => setNewUrl(pagination?.next)}
            bg={'card.deepPurple'}
            _hover={{
              bg: 'card.softPurple',
              color: 'card.bege',
            }}
          >
            Next
          </Button>
        </Stack>
      </Center>
    </div>
  );
}

export default Pokemons;
