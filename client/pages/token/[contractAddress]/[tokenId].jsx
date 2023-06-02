import { Avatar, Box, Container, Flex, Input, SimpleGrid, Skeleton, Stack, Text } from "@chakra-ui/react";
import { ThirdwebNftMedia, useContract } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import React from "react";
import {
  NFT_ADDRESS
} from "../../../const/addresses";
import Link from "next/link";


export default function TokenPage({ nft }) {
  return (
    <Container maxW={"1200px"} p={5} my={5}>
      <SimpleGrid columns={2} spacing={6}>
        <Stack spacing={"20px"}>
          <Box borderRadius={"6px"} overflow={"hidden"}>
            {/* <Skeleton isLoaded={!loadingMarketplace && !loadingDirectListing}> */}
            <ThirdwebNftMedia
              metadata={nft.metadata}
              width="100%"
              height="100%"
            />
            {/* </Skeleton> */}
          </Box>
          <Box>
            <Text fontWeight={"bold"}>Description:</Text>
            <Text>{nft.metadata.description}</Text>
          </Box>
          <Box>
            <Text fontWeight={"bold"}>Traits:</Text>
            <SimpleGrid columns={2} spacing={4}>
              {Object.entries(nft?.metadata?.attributes || {}).map(
                ([key, value]) => (
                  <Flex key={key} direction={"column"} alignItems={"center"} justifyContent={"center"} borderWidth={1} p={"8px"} borderRadius={"4px"}>
                    <Text fontSize={"small"}>{value.trait_type}</Text>
                    <Text fontSize={"small"} fontWeight={"bold"}>{value.value}</Text>
                  </Flex>
                )
              )}
            </SimpleGrid>
          </Box>
        </Stack>

        <Stack spacing={"20px"}>
          <Box mx={2.5}>
            <Text fontSize={"4xl"} fontWeight={"bold"}>{nft.metadata.name}</Text>
            <Link
              href={`/profile/${nft.owner}`}
            >
              <Flex direction={"row"} alignItems={"center"}>
                <Avatar src='https://bit.ly/broken-link' h={"24px"} w={"24px"} mr={"10px"} />
                <Text fontSize={"small"}>{nft.owner.slice(0, 6)}...{nft.owner.slice(-4)}</Text>
              </Flex>
            </Link>
          </Box>
        </Stack>
      </SimpleGrid>

    </Container >
  )
};

export const getStaticProps = async (context) => {
  const tokenId = context.params?.tokenId;
  const sdk = new ThirdwebSDK("mumbai");
  const contract = await sdk.getContract(NFT_ADDRESS);
  const nft = await contract.erc721.get(tokenId);
  return {
    props: {
      nft,
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  const sdk = new ThirdwebSDK("mumbai");
  const contract = await sdk.getContract(NFT_ADDRESS, "nft-collection");
  const nfts = await contract.getAll();
  const paths = nfts.map((nft) => {
    return {
      params: {
        contractAddress: NFT_ADDRESS,
        tokenId: nft.metadata.id,
      },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
};