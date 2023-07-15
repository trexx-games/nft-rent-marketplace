import { Box, Flex, Select, Text } from '@chakra-ui/react';
import ChainContext from "../context/ChainContext";
import React, { useContext } from "react";

function SelectChain() {
  const { selectedChain, setSelectedChain } = useContext(ChainContext);

  const blockchains = [
    { id: 1,
      name: 'teste1'
    },
    { id: 2,
      name: 'teste2'
    },
  ] // fazer get para banco de dados
  return (
    <Box w="30%" marginBottom="1em">
      <Flex alignItems="center" spacing={3}>
        <Text minWidth={150} fontSize={22} fontFamily={'Manrope'}>
          {' '}
          Filter by blockchain{' '}
        </Text>
        <Select value={String(selectedChain)} placeholder="Select chain" onChange={(e) => setSelectedChain(e.target.value)}>
          {blockchains.map((chain) => (
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