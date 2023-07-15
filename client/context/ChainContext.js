import { createContext } from "react";

const ChainContext = createContext({
  selectedChain: '',
  setSelectedChain: (chain) => {},
});

export default ChainContext;