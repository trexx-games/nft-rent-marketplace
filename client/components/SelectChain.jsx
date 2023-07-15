import { Box, Flex, Select, Text } from '@chakra-ui/react';
import React, { useContext } from "react";
import useSWR from 'swr';
import { URLS, fetcher } from '../config/urls';
import { ChainContext } from '../context/ChainContext';

function SelectChain() {
  const { data, error, isLoading } = useSWR(`${URLS.BLOCKCHAINS}/get-all`, fetcher)
  const { selectedChain, setSelectedChain } = useContext(ChainContext);

  if (error) return <div>{error.message}</div>;

  return (
    <Box w="35%" marginBottom="1em" marginRight="1em">
      <Flex alignItems="center" spacing={3}>
        <Text minWidth={200} fontSize={22} fontFamily={'Manrope'}>
          {' '}
          Filter by blockchain{' '}
        </Text>
        <Select 
          value={String(selectedChain)} 
          placeholder="Select blockchain" 
          onChange={(e) => setSelectedChain(e.target.value)}
        >
          {isLoading ? null : data.map((chain) => (
            <option key={chain.id} value={chain.name}>
              {chain.name}
            </option>
          ))}
        </Select>
      </Flex>
    </Box>
  );
};

export default SelectChain