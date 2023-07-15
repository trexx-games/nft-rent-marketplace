import { Container, Flex, Spacer } from '@chakra-ui/react';
import React, { useState } from 'react';
import useSWR from 'swr';
import FilterBar from '../components/FilterBar';
import PoolGrid from '../components/Pool/PoolGrid';
import SelectChain from '../components/SelectChain';
import { URLS, fetcher } from '../config/urls';

export default function Pools() {
  const { data, error, isLoading } = useSWR(`${URLS.POOLS}/get-all`, fetcher);
  const [selectedGameId, setSelectedGameId] = useState('');

  const handleFilterChange = (gameId) => {
    setSelectedGameId(gameId);
  };

  if (error) return <div>{error.message}</div>;
  const filteredPools = selectedGameId
    ? data?.pools.filter((pool) => pool.gameId === Number(selectedGameId))
    : data?.pools;

  const gameIds = [...new Set(data?.pools.map((pool) => pool.gameId))];

  return (
    <Container maxW={'90%'} p={5}>
      <Flex>
        <Spacer />
        <SelectChain/>
        <FilterBar gameIds={gameIds} onFilterChange={handleFilterChange} />
      </Flex>
      <PoolGrid isLoading={isLoading} data={filteredPools} />
    </Container>
  );
}
