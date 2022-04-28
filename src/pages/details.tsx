import React, { useEffect, useState } from 'react';
import {
  Box,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Circle,
  Image,
  Center,
  CircularProgress
} from '@chakra-ui/react';
import { useParams, Params } from 'react-router-dom';
import { getPokemon, Pokemon } from '../getUrl/getData';

const urlDetail = (name: string | undefined) => `https://pokeapi.co/api/v2/pokemon/${name}`;

interface StatsCardProps {
  title: string;
  stat: string;
}

function StatsCard(props: StatsCardProps) {
  const { title, stat } = props;
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={'5'}
      shadow={'xl'}
      border={'2px solid'}
      borderColor='tomato'
      bg='card.deepPurple'
      rounded={'lg'}>
      <StatLabel fontWeight={'medium'} isTruncated color={'card.softPurple'}>
        {title}
      </StatLabel>
      <StatNumber fontSize={'2xl'} fontWeight={'medium'} color={'card.salmon'}>
        {stat}
      </StatNumber>
    </Stat>
  );
}

export default function Details() {
  const [details, setDetails] = useState<Pokemon>({} as Pokemon);
  const [loading, setLoading] = useState(true);
  const { name } = useParams<Params>();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const pokemon = await getPokemon(urlDetail(name));
      setDetails(pokemon);
      setLoading(false);
    }
    getData();
  }, [name]);

  const renderLoading = () => {
    return (
      <Center py='100px'>
        <CircularProgress isIndeterminate color='card.deepPurple' size='200px' />
      </Center>)};
  
  if (loading) return renderLoading();
  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={'center'}
        fontSize={'4xl'}
        py={10}
        fontWeight={'bold'}
        textTransform='uppercase'
        color={'red.600'}
      >
        {details.name}
      </chakra.h1>
      <Center>
        <Circle bg='tomato' size='300px'>
          <Image
            src={details.sprites.front_default} alt='imagem'
            height={300}
          />
        </Circle>
      </Center>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={'abilities'}
          stat={`1-${details.abilities[0].ability.name} 2-${details.abilities[1].ability.name}`}
        />
        <StatsCard title={'height'} stat={ details.height.toString() } />
        <StatsCard title={'base experience'} stat={ details.base_experience.toString() } />
        {
          details.stats.map((statInfo: any) => (
            <StatsCard
              title={'stat name / base stat / effort'}
              stat={`${statInfo.stat.name} / ${statInfo.base_stat} / ${statInfo.effort}`} />
            ))
        }
      </SimpleGrid>
    </Box>
  );
}
