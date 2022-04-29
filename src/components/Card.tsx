import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
} from '@chakra-ui/react';
import { Pokemon } from '../getUrl/getData';

interface CardProps {
  pokemon: Pokemon;
}

export default function Card({ pokemon }: CardProps) {
  return (
    <Center>
      <Box
        maxW="230px"
        w="full"
        bg="card.softPurple"
        boxShadow="2xl"
        rounded="md"
        p={6}
        overflow="hidden"
      >
        <Box
          alignItems="center"
          h="210px"
          bg="card.purple"
          mt={-6}
          mx={-6}
          mb={6}
          pos="relative"
        >
          <Image
            height={230}
            width={230}
            src={pokemon.sprites.front_default}
          />
        </Box>
        <Stack>
          <Text
            color="card.purple"
            fontWeight={800}
            fontSize="sm"
            letterSpacing={1.1}
          >
            Pokemon
          </Text>
          <Heading
            color="card.gray"
            fontSize="2xl"
            textTransform="uppercase"
            fontFamily="body"
          >
            {pokemon.name}
          </Heading>

        </Stack>
        <Stack mt={6} direction="row" spacing={4} align="center">
          <Avatar
            src={pokemon.sprites.front_default}
          />
          <Stack direction="column" spacing={0} fontSize="sm">
            <RouterLink to={`/${pokemon.name}`}>
              <Box
                px={2}
                py={1}
                _hover={{
                  textDecoration: 'none',
                }}
              >
                <Text
                  fontWeight={600}
                  color="card.deepPurple"
                  rounded="md"
                  px={2}
                  _hover={{
                    bg: 'card.deepPurple',
                    color: 'card.bege',
                    px: '2',
                  }}
                >
                  Ver detalhes
                </Text>
              </Box>
            </RouterLink>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
