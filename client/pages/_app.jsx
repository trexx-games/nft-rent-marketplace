import { ChakraProvider } from '@chakra-ui/react';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import React, { useState } from 'react';
import Head from 'next/head';
import { Navbar } from '../components/Navbar';
import ChainContext from '../context/ChainContext';
import '../styles/globals.css';


function MyApp({ Component, pageProps }) {
  const [selectedChain, setSelectedChain] = useState("mumbai");

  return (
    <ChainContext.Provider value={{ selectedChain, setSelectedChain }}>
      <ThirdwebProvider activeChain={'mumbai'}>
        <ChakraProvider>
          <Head>
            <title>NFT Rent</title>
            <meta property="og:title" content="NFT Rent" key="title" />
            <link rel="icon" href="/icons/favicon.ico" />
          </Head>
          <Navbar />
          <Component {...pageProps} />
        </ChakraProvider>
      </ThirdwebProvider>
    </ChainContext.Provider>
  );
}

export default MyApp;
