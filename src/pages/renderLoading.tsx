import React from 'react';
import { Center, CircularProgress } from '@chakra-ui/react';

export default function renderLoading() {
  return (
    <Center py="100px">
      <CircularProgress isIndeterminate color="card.deepPurple" size="200px" />
    </Center>
  );
}
