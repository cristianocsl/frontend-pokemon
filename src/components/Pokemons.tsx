import React, { useEffect, useState } from 'react';
import PromisePool from '@supercharge/promise-pool';
import {
  Wrap, Button, Center, Stack,
} from '@chakra-ui/react';
import {
  getPokemonList, Pokemon, getPokemon, PokemonList,
} from '../getUrl/getData';
import Card from './Card';
import renderLoading from '../pages/renderLoading';

const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10';

export default function Pokemons() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [pagination, setPagination] = useState<PokemonList>();
  const [newUrl, setNewUrl] = useState<string | undefined | null>(url);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const listOf = await getPokemonList(newUrl as string);
      setPagination(listOf);
      const data = await PromisePool.withConcurrency(10)
        .for(listOf.results)
        .process(async (pokData) => getPokemon(pokData.url));
      setPokemonList(data.results);
      setLoading(false);
    }
    getData();
  }, [newUrl]);

  if (loading) return renderLoading();
  return (
    <div>
      <Wrap
        py={[0, 3]}
        justify="center"
      >
        {pokemonList.map((pokemon) => <Card key={pokemon.id} pokemon={pokemon} />)}
      </Wrap>
      <Center py="12px">
        <Stack direction="row" spacing={5}>
          <Button
            color="card.bege"
            disabled={pagination?.previous === null}
            onClick={() => setNewUrl(pagination?.previous)}
            bg="card.deepPurple"
            _hover={{
              bg: 'card.softPurple',
              color: 'card.bege',
            }}
          >
            Previous
          </Button>
          <Button
            color="card.bege"
            onClick={() => setNewUrl(pagination?.next)}
            bg="card.deepPurple"
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
