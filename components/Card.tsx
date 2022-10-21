import { Flex } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface Props {
  // any props that come into the component
  children?: ReactNode;
}

const Card: React.FC<Props> = ({ children, ...props }) => {
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
      {...props}
    >
      {children}
    </Flex>
  );
};
export default Card;
