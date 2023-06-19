require("@nomiclabs/hardhat-waffle")

const env = {
  AVALANCHE_PRIVATE_KEY: "9bcdcecec956d01178a1320ff0cbe362eb59f8fe711642703b7419966320df52",
  FUJI_RPC_URL:
    "https://avalanche-fuji.rpc.thirdweb.com/ed043a51ae23b0db3873f5a38b77ab28175fa496f15d3c53cf70401be89b622a",
}

module.exports = {
  defaultNetwork: "fuji",
  networks: {
    hardhat: {},
    fuji: {
      url: env.FUJI_RPC_URL || "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: [`0x${env.AVALANCHE_PRIVATE_KEY}`],
      gasPrice: 225000000000,
      chainId: 43113,
    },
  },
  solidity: "0.8.18",
}
