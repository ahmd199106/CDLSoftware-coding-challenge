import { Flex } from '@chakra-ui/react';
import React from 'react';

const Card = ({ children }) => {
  return (
    <Flex
      bgColor='surfaceVariant'
      direction='column'
      cursor='default'
      minH='82px'
      alignItems='center'
      justifyContent='center'
      w='full'
      rounded='lg'
      border='1px'
      borderColor='lightgrey'
      fontFamily='Euclid'
      fontSize={['sm', 'md']}
      pt='20px'
    >
      {children}
    </Flex>
  );
};
export default Card;
