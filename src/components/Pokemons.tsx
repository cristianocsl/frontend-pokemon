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
  const [counter, setCounter] = useState<number>(10);
  const [newUrl, setNewUrl] = useState<string | undefined>(url);
  const [loading, setLoading] = useState(true);

  const getUrl = (limit: number): string => `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${limit}`;

  async function getData(optionalUrl: string | undefined) {
    const listOf = await getPokemonList(optionalUrl);
    setPagination(listOf);
    const data = await PromisePool.withConcurrency(10)
      .for(listOf.results)
      .process(async (pokData) => getPokemon(pokData.url));
    setPokemonList(data.results);
    setLoading(false);
  }

  useEffect(() => {
    getData(newUrl);
  }, [newUrl]);

  useEffect(() => {
    getData(getUrl(counter));
  }, [counter]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setCounter((prevState) => prevState + 10);
      }
    });

    const element = document.querySelector('#loadMore');
    if (element !== null) {
      intersectionObserver.observe(element);
    }

    return () => intersectionObserver.disconnect();
  }, []);

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
      <div id="loadMore" style={{ width: '100%', height: '4px' }} />
    </div>
  );
}
