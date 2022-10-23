import { Flex } from '@chakra-ui/react';
import React, { ReactNode } from 'react';


const Card = ({ children }: { children: React.ReactNode }) => {
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
