import {
  Heading,
  Flex,
  VStack,
  Link,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  useDisclosure,
  Image,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { useSigner } from '@thirdweb-dev/react';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { darken } from '@chakra-ui/theme-tools';
import React, { useState, useEffect } from 'react';
import {
  NFT_RENT_MARKETPLACE_ADDRESS,
  NFT_BBG_ADDRESS,
  NFT_CS_ADDRESS,
} from '../../const/addresses';
import NFTCard from '../NFT/NFTCard';
import { ethers } from 'ethers';
import NEXTLink from 'next/link';

export default function PoolOrder({ pool }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const signer = useSigner();
  const toast = useToast();
  let sdk;
  if (signer) {
    sdk = ThirdwebSDK.fromSigner(signer);
  }
  const [isLoading, setIsLoading] = useState(false);
  const [nft, setNft] = useState(null);
  const [poolUSDPrice, setPoolUSDPrice] = useState(0);
  const [poolMATICPrice, setPoolMATICPrice] = useState(0);
  const [poolMATICFormatedPrice, setPoolMATICFormatedPrice] = useState(0);
  const [rentDays, setRentDays] = useState(1);

  useEffect(() => {
    handleRentDaysChange(rentDays);
  }, []);

  const handleRentDaysChange = async (value) => {
    setRentDays(value);
    const contract = await sdk.getContract(NFT_RENT_MARKETPLACE_ADDRESS);
    const price = await contract.call('getRentQuote', [pool.categoryid, value]);
    if (price?.rentQuoteDollar._hex) {
      const poolUSDPriceBigNumber = ethers.BigNumber.from(
        price.rentQuoteDollar._hex,
      );
      const poolMATICPriceBigNumber = ethers.BigNumber.from(
        price.rentQuoteMatic._hex,
      );
      setPoolUSDPrice(ethers.utils.formatUnits(poolUSDPriceBigNumber));
      setPoolMATICFormatedPrice(
        ethers.utils.formatUnits(poolMATICPriceBigNumber),
      );
      setPoolMATICPrice(price.rentQuoteMatic);
    } else {
      console.error('No quote has returned');
    }
  };
  const rentItem = async () => {
    setIsLoading(true);
    try {
      const contract = await sdk.getContract(NFT_RENT_MARKETPLACE_ADDRESS);
      const result = await contract.call(
        'startRent',
        [pool.categoryid, Number(rentDays)],
        { value: poolMATICPrice },
      );
      console.log(result);
      const nftId = result.receipt.events[0].args.itemNftId.toNumber();
      console.log(pool)
      const nft = await getNft(nftId, pool.gameid);  
      setNft(nft);
      onOpen();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Unable to rent from pool',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getNft = async (nftId, gameId) => {
    const contractAddresses = {
      1: NFT_BBG_ADDRESS,
      2: NFT_CS_ADDRESS,
    };
  
    const contractAddress = contractAddresses[gameId];
    const contract = await sdk.getContract(contractAddress);
    const nft = await contract.erc721.get(nftId);
    return nft;
  };


  return (
    <VStack spacing={6} align="stretch" padding={'10px'}>
      <Box marginTop={'10%'}>
        <Heading fontFamily={'Bayon'} size="xl" mt={2}>
          {pool.categoyname} Pool
        </Heading>
        <Text
          fontSize={20}
          fontFamily={'Big Shoulders Text'}
          fontWeight={'bold'}
        >
          Rarity: {pool.rarityname}
        </Text>
      </Box>
      <Box>
        <Image src={pool.imageurl} alt={pool.categoryname} />
      </Box>
      <Box>
        <Text fontSize={20} fontFamily={'Bayon'} fontWeight={'bold'}>
          Description:
        </Text>
        <Text mb={2} fontFamily={'Big Shoulders Text'}>
          {pool.short_description}
        </Text>
        <Box>
          <Flex direction="row" gap={10} justify="flex-start" mb={3}>
            <Text fontSize={20} fontFamily={'Bayon'} fontWeight={'bold'} mt={2}>
              Rent for (days):
            </Text>
            <NumberInput
              size="lg"
              maxW={32}
              defaultValue={1}
              min={1}
              value={rentDays}
              onChange={handleRentDaysChange}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
          <Box>
            <Flex direction="row" gap={8} justify="flex-start">
              <Text
                fontSize={20}
                fontFamily={'Bayon'}
                fontWeight={'bold'}
                mt={2}
              >
                Price:
              </Text>
              <Text mt={2} fontSize={20} fontFamily={'Big Shoulders Text'}>
                USD {Number(poolUSDPrice).toFixed(2)}
              </Text>
              <Text mt={2} fontSize={20} fontFamily={'Big Shoulders Text'}>
                AVAX {poolMATICFormatedPrice}
              </Text>
            </Flex>
          </Box>
        </Box>
      </Box>
      <Button
        letterSpacing={0.5}
        _hover={{
          bg: darken('#FBAA0B', 15),
          transition: 'background-color 0.2s',
        }}
        _active={{
          transform: 'scale(0.98)',
        }}
        backgroundColor={'#FBAA0B'}
        fontFamily={'Bayon'}
        isLoading={isLoading}
        color={'white'}
        size="md"
        fontSize={20}
        mt={4}
        onClick={rentItem}
      >
        Rent Item
      </Button>
      {nft && (
        <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
          <ModalOverlay />
          <ModalContent alignItems={'center'} padding={10}>
            <ModalHeader
              fontSize="xl"
              fontWeight="bold"
              fontFamily={'Bayon'}
              mb={1}
            >
              Check your Rented Item, Play with it!
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Link as={NEXTLink} href="/inventory">
                <NFTCard nft={nft} />
              </Link>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </VStack>
  );
}
