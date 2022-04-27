import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Simple() {

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <RouterLink to='/'>
              <Link
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.200', 'gray.700'),
                }}
              >
                Home
              </Link>
            </RouterLink>
          </HStack>
          <Flex alignItems={'center'}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://www.freeiconspng.com/uploads/pokeball-icon-1.png'
                  }
                />
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
