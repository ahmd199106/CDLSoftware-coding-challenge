import {
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
  Image,
  Input,
  Box,
  HStack,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import Card from '../components/Card';
import Header from '../components/Header';

const Home: NextPage = () => {
  // state set up for the number of iems of each type tht user can add to the cart,
  // here apple,orango,mangoand banana are the 4 items
  const [apples, setApples] = useState<number>(0);
  const [oranges, setOranges] = useState(0);
  const [mango, setMango] = useState(0);
  const [banana, setBanana] = useState(0);

  // set up the intial state for the form where the user can add todays Price and Offer for an item
  const [applePrice, setApplePrice] = useState(50);
  const [appleOffer, setAppleOffer] = useState(130);
  const [appleOfferQuantity, setAppleOfferQuantity] = useState(3);
  const [orangePrice, setOrangePrice] = useState(30);
  const [orangeOffer, setOrangeOffer] = useState(45);
  const [orangeOfferQuantity, setOrangeOfferQuantity] = useState(2);
  const [mangoPrice, setMangoPrice] = useState(20);
  const [bananaPrice, setBananaPrice] = useState(15);

  // create a checkoutCartfunction that takes the number of items as the first 4 arguments and
  //  a priceSchema object as 5th argument and returns the total value of all the items(of the cart)
  //  before discount based on the above priceSchema derived from the user Inputs
  const checkoutCart = (
    A: number,
    B: number,
    C: number,
    D: number,
    priceSchema: {
      priceProductA: number;
      priceProductB: number;
      priceProductC: number;
      priceProductD: number;
    },
  ) => {
    let sum =
      A * priceSchema.priceProductA +
      B * priceSchema.priceProductB +
      C * priceSchema.priceProductC +
      D * priceSchema.priceProductD;
    return sum;
  };

  // create a priceSchema object for todays Price of the 4 items(apples, oranges, mango, banana in this project)
  let priceschematoday = {
    priceProductA: applePrice,
    priceProductB: orangePrice,
    priceProductC: mangoPrice,
    priceProductD: bananaPrice,
  };

  let totalPriceBeforeDiscount = checkoutCart(
    apples,
    oranges,
    mango,
    banana,
    priceschematoday,
  );
  // function to calculate discount in apple enclosed in useCallback to avoid re render of component when state changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const discountApple = useCallback(() => {
    let discuente = 0;
    if (apples % appleOfferQuantity === 0) {
      return (discuente +=
        (appleOfferQuantity * applePrice - appleOffer) *
        (apples / appleOfferQuantity));
    }
    if (
      apples / appleOfferQuantity > 1 ||
      apples / appleOfferQuantity > 2 ||
      apples / appleOfferQuantity > 3 ||
      apples / appleOfferQuantity > 4
    ) {
      if (apples % appleOfferQuantity === 0) {
        return discuente;
      }
      discuente +=
        Math.floor(apples / appleOfferQuantity) *
        (appleOfferQuantity * applePrice - appleOffer);
    }

    return discuente;
  }, [appleOffer, applePrice, apples, appleOfferQuantity]);

  // useEffect with a clean up function returned to mitigate memory leaks

  useEffect(() => {
    let isMounted = true;

    discountApple();

    return () => {
      isMounted = false;
    };
  }, [apples, discountApple]);

  // function to calculate discount in oranges
  const discountOrange = () => {
    let discount = 0;
    if (oranges % orangeOfferQuantity === 0) {
      return (discount =
        (orangeOfferQuantity * orangePrice - orangeOffer) *
        (oranges / orangeOfferQuantity));
    }
    if (
      oranges / orangeOfferQuantity > 1 ||
      oranges / orangeOfferQuantity > 2 ||
      oranges / orangeOfferQuantity > 3 ||
      oranges / orangeOfferQuantity > 4
    ) {
      if (oranges % orangeOfferQuantity === 0) {
        return discount;
      }
      discount +=
        Math.floor(oranges / orangeOfferQuantity) *
        (orangeOfferQuantity * orangePrice - orangeOffer);
    }

    return discount;
  };

  const discountApples = discountApple();
  const discountOranges = discountOrange();

  return (
    <div>
      <Head>
        <title>
          CDL software coding challenge in nextjs,typescript and chakra UI
        </title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Flex rounded={['none', 'md']} p='6' bgColor='white' direction='column'>
        <Flex alignItems='center'>
          <Heading fontSize='lg' ml='3'>
            Shopping Cart{' '}
          </Heading>

          <Spacer />

          <Text
            display={['none', 'flex']}
            fontFamily='Open sans'
            marginLeft='auto'
          >
            Add Items to Shopping Cart
          </Text>
        </Flex>

        <Divider w='full' borderColor='lightgrey' my='4' />
        <SimpleGrid spacing='2' minChildWidth='250px' px='200px'>
          <Card>
            <Flex>
              <Image
                borderRadius='10px'
                src='/apples.jpeg'
                alt='image of apples'
                height='200px'
                width='200px'
              />
            </Flex>
            <Flex my='20px'>
              <Button
                variant='outline'
                onClick={() => setApples((prev) => prev - 1)}
              >
                -{' '}
              </Button>
              <Button mx='10pt'>APPLE{apples !== 0 && `(${apples})`}</Button>
              <Button
                variant='outline'
                onClick={() => setApples((prev) => prev + 1)}
              >
                +{' '}
              </Button>
            </Flex>
          </Card>
          <Card>
            <Flex>
              <Image
                src='/oranges.jpeg'
                alt='image of apples'
                height='200px'
                width='200px'
                borderRadius='10px'
              />
            </Flex>
            <Flex my='20px'>
              <Button
                variant='outline'
                onClick={() => setOranges((prev) => prev - 1)}
              >
                -{' '}
              </Button>
              <Button mx='10pt'>ORANGE{oranges !== 0 && `(${oranges})`}</Button>
              <Button
                variant='outline'
                onClick={() => setOranges((prev) => prev + 1)}
              >
                +{' '}
              </Button>
            </Flex>
          </Card>
          <Card>
            <Flex>
              <Image
                src='/mangoes.jpeg'
                alt='image of apples'
                height='200px'
                width='200px'
                borderRadius='10px'
              />
            </Flex>
            <Flex my='20px'>
              <Button
                variant='outline'
                onClick={() => setMango((prev) => prev - 1)}
              >
                -{' '}
              </Button>
              <Button mx='10pt'>MANGO{mango !== 0 && `(${mango})`}</Button>
              <Button
                variant='outline'
                onClick={() => setMango((prev) => prev + 1)}
              >
                +{' '}
              </Button>
            </Flex>
          </Card>
          <Card>
            <Flex>
              <Image
                src='/bananas.jpeg'
                alt='image of apples'
                height='200px'
                width='200px'
                borderRadius='10px'
              />
            </Flex>
            <Flex my='20px'>
              <Button
                variant='outline'
                onClick={() => setBanana((prev) => prev - 1)}
              >
                -{' '}
              </Button>
              <Button mx='10pt'>BANANA{banana !== 0 && `(${banana})`}</Button>
              <Button
                variant='outline'
                onClick={() => setBanana((prev) => prev + 1)}
              >
                +{' '}
              </Button>
            </Flex>
          </Card>
        </SimpleGrid>
        <Flex mt='100px' direction='row'>
          <Flex flexGrow={1} direction='column'>
            <Heading
              color='black'
              mt='-39'
              mb='5'
              cursor='pointer'
              fontSize='3xl'
              fontWeight='500'
              _hover={{ color: 'grey' }}
            >
              Enter Todays Prices for Fruits and Offers
            </Heading>
            <Flex direction='column'>
              <HStack pr='150px' justify='space-between'>
                <Text width='200px' justifyContent='left'>
                  Price for Apple
                </Text>
                <Input
                  width='100px'
                  w='100px'
                  alignSelf='stretch'
                  bgColor='surface'
                  value={applePrice}
                  onChange={(event) =>
                    setApplePrice(Number(event.target.value))
                  }
                  variant='outline'
                  placeholder='Enter Price for Apple'
                  size='lg'
                  isRequired
                  _focus={{
                    borderColor: 'secondary',
                  }}
                />
              </HStack>
              <HStack pr='150px' justify='space-between'>
                <Text>Todays Offer for Apple</Text>
                <Flex align='center'>
                  <Input
                    width='50px'
                    alignSelf='stretch'
                    bgColor='surface'
                    value={appleOfferQuantity}
                    onChange={(event) =>
                      setAppleOfferQuantity(Number(event.target.value))
                    }
                    placeholder='2'
                    variant='outline'
                    isRequired
                    _focus={{
                      borderColor: 'secondary',
                    }}
                  />
                  <Text>For</Text>
                  <Input
                    width='100px'
                    alignSelf='stretch'
                    bgColor='surface'
                    value={appleOffer}
                    onChange={(event) =>
                      setAppleOffer(Number(event.target.value))
                    }
                    variant='outline'
                    placeholder='3 apples for'
                    size='lg'
                    isRequired
                    _focus={{
                      borderColor: 'secondary',
                    }}
                  />
                </Flex>
              </HStack>
            </Flex>
            <Flex direction='column' textAlign='start'>
              <HStack pr='150px' justify='space-between'>
                <Text>Price for Oranges</Text>
                <Input
                  width='100px'
                  alignSelf='stretch'
                  bgColor='surface'
                  value={orangePrice}
                  onChange={(event) =>
                    setOrangePrice(Number(event.target.value))
                  }
                  variant='outline'
                  placeholder='Enter Price for Oranges'
                  size='lg'
                  isRequired
                  _focus={{
                    borderColor: 'secondary',
                  }}
                />
              </HStack>
              <HStack pr='150px' justify='space-between'>
                <Text>Todays Offer for Oranges</Text>
                <Flex align='center'>
                  <Input
                    width='50px'
                    alignSelf='stretch'
                    bgColor='surface'
                    value={orangeOfferQuantity}
                    onChange={(event) =>
                      setOrangeOfferQuantity(Number(event.target.value))
                    }
                    placeholder='2'
                    variant='outline'
                    isRequired
                    _focus={{
                      borderColor: 'secondary',
                    }}
                  />
                  <Text>For</Text>
                  <Input
                    width='100px'
                    alignSelf='stretch'
                    bgColor='surface'
                    value={orangeOffer}
                    onChange={(event) =>
                      setOrangeOffer(Number(event.target.value))
                    }
                    variant='outline'
                    placeholder='3 Oranges for'
                    size='lg'
                    isRequired
                    _focus={{
                      borderColor: 'secondary',
                    }}
                  />
                </Flex>
              </HStack>
            </Flex>
            <HStack pr='150px' justify='space-between'>
              <Text textAlign='start'>Price for Mangoes</Text>
              <Input
                width='100px'
                alignSelf='stretch'
                bgColor='surface'
                value={mangoPrice}
                onChange={(event) => setMangoPrice(Number(event.target.value))}
                variant='outline'
                placeholder='Enter Price for Mangoes'
                size='lg'
                isRequired
                _focus={{
                  borderColor: 'secondary',
                }}
              />
            </HStack>
            <HStack pr='150px' justify='space-between'>
              <Text>Price for Bananas</Text>
              <Input
                width='100px'
                alignSelf='stretch'
                bgColor='surface'
                value={bananaPrice}
                onChange={(event) => setBananaPrice(Number(event.target.value))}
                variant='outline'
                placeholder='Enter Price for Bananas'
                size='lg'
                isRequired
                _focus={{
                  borderColor: 'secondary',
                }}
              />
            </HStack>
          </Flex>
          <Flex direction='column' flexGrow={1}>
            <Flex>
              <Box>
                <Text fontSize='2xl'>Cost of all products </Text>
              </Box>
              <Spacer />
              <Text fontWeight={700}>{totalPriceBeforeDiscount}</Text>
            </Flex>
            <Flex>
              <Box>
                <Text fontSize='xl'>Promotional discount apple</Text>
              </Box>
              <Spacer />
              <Text>{discountApples}</Text>
            </Flex>
            <Flex>
              <Box>
                <Text fontSize='xl'>Promotional discount Orange</Text>
              </Box>
              <Spacer />
              <Text>{discountOranges}</Text>
            </Flex>
            <Flex>
              <Box>
                <Text fontSize='2xl'>Total Cost of all products </Text>
              </Box>
              <Spacer />
              <Text fontWeight={700}>
                {totalPriceBeforeDiscount - (discountApples + discountOranges)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default Home;
