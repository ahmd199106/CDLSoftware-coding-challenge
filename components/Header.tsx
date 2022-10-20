import { Flex, Heading } from '@chakra-ui/react';

const Header = () => (
  <Flex
    position='sticky'
    zIndex={999}
    width='100%'
    height='72px'
    bgColor='white'
    borderWidth='1px'
    align='center'
    direction='row'
    p={['2', '3']}
  >
    <Heading>CDL Software Shopping Cart Challenge </Heading>
  </Flex>
);

export default Header;
