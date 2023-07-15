import { createContext } from "react";

export const ChainContext = createContext({
    selectedChain: 'mumbai', 
    setSelectedChain: (chain) => {}
});
