import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Simple() {
  return (
    <Box bg={useColorModeValue('card.salmon', 'gray.900')} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <RouterLink to="/">
            <Box
              px={2}
              py={1}
              rounded="md"
              _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('card.softPurple', 'white'),
                color: 'card.bege',
                fontWeight: '800',
              }}
              color="card.deepPurple"
              fontWeight={800}
            >
              Home
            </Box>
          </RouterLink>
        </HStack>
        <Flex alignItems="center">
          <Avatar
            size="sm"
            src="https://www.freeiconspng.com/uploads/pokeball-icon-1.png"
          />
        </Flex>
      </Flex>
    </Box>
  );
}
