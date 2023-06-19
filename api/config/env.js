require("dotenv").config();

module.exports = {
  walletPvKey: process.env.WALLET_PV_KEY ?? "",
  mumbaiRpcUrl: process.env.MUMBAI_RPC_URL ?? "",
  nftContractAddress: process.env.NFT_CONTRACT ?? "",
  nftRentMarketplaceContract: process.env.NFT_RENT_MARKETPLACE_CONTRACT ?? "",
  vrfKeyHash: process.env.VRF_KEY_HASH ?? "",
  vrfCoordinatorContractAddress: process.env.VRF_COORDINATOR_CONTRACT ?? "",
  vrfSubId: Number(process.env.VRF_SUB_ID) ?? 0,
  cfSubId: Number(process.env.CF_SUB_ID) ?? 0,
  cfOracleAddress: process.env.CF_ORACLE_ADDRESS ?? "",
  pgUser: process.env.PG_USER ?? "",
  pgPwd: process.env.PG_PWD ?? "",
  pgUri: process.env.PG_URI ?? "",
  pgPort: process.env.PG_PORT ?? "",
  pgDb: process.env.PG_DATABASE ?? "",
};
