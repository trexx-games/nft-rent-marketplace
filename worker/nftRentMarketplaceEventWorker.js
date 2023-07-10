const { ThirdwebSDK } = require('@thirdweb-dev/sdk');
const axios = require('axios');
const env = require('./config/env');


class NFTRentMarketplaceEventWorker {
  constructor() {
    this.contractAddress = env.nftRentMarketplaceContract;
    this.privateKey = env.walletPvKey;
    this.nftRentMarketplaceApi = env.nftRentMarketplaceApi;
    this.provider = env.blockchainRpcUrl;
    this.init();
  }

  async init() {
    this.sdk = await ThirdwebSDK.fromPrivateKey(this.privateKey, 'mumbai');
    this.contract = await this.sdk.getContract(this.contractAddress);
    this.contract.events.addEventListener('RentStarted', this.onRentStarted.bind(this));
    this.contract.events.addEventListener('PoolCreated', this.onPoolCreated.bind(this));
    this.contract.events.addEventListener('RentFinished', this.onRentFinished.bind(this));
    this.contract.events.addEventListener('ItemCreated', this.onItemCreated.bind(this));
    this.contract.events.addEventListener('ItemAddedToPool', this.onItemAddedToPool.bind(this));
  }

  async onRentStarted(event) {
    const item = await axios.get(`${this.nftRentMarketplaceApi}/items/get-by-nft-id/${Number(event.data.itemNftId._hex)}`)
    try {
      const payload = {
        id: Number(`${event.data.rentId._hex}`),
        itemId: item.id,
        categoryId: Number(`${event.data.poolId._hex}`),
        renteeAddress: event.data.rentee,
        ownerAddress: event.data.owner,
        priceBlockchain: Number(`${event.data.price._hex}`),
        expirationDate: new Date(Number(`${event.data.expirationDate._hex}`) * 1000),
        initDate: new Date(Number(`${event.data.initDate._hex}`) * 1000),
      }
      await axios.post(`${this.nftRentMarketplaceApi}/rents/start-rent`, payload);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  async onRentFinished(event) {
    const payload = {
      id: Number(`${event.data.rentId._hex}`),
      finishDate: new Date(Number(`${event.data.finishDate._hex}`) * 1000),
    }
    try {
      await axios.patch(`${this.nftRentMarketplaceApi}/rents/finish-rent`, payload);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  async onPoolCreated(event) {
    try {
      const payload = {
        categoryId: Number(`${event.data.poolId._hex}`),
        basePrice: Number(`${event.data.basePrice._hex}`),
        gameId: Number(`${event.data.gameId._hex}`),
      }
      await axios.post(`${this.nftRentMarketplaceApi}/pools/create-pool`, payload);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  async onItemCreated(event) {
    try {
      const payload = {
        id: Number(`${event.data.itemId._hex}`),
        nftId: Number(`${event.data.nftId._hex}`),
        categoryId: Number(`${event.data.categoryId._hex}`),
        ownerAddress: event.data.owner,
        gameId: Number(`${event.data.gameId._hex}`),
        nftContractAddress: '',
        rarityId: Number(`${event.data.rariryId._hex}`),
        blockchainId: Number(`${event.data.blockchainId._hex}`),
      }
      await axios.post(`${this.nftRentMarketplaceApi}/items/create-item`, payload);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  async onItemAddedToPool(event) {
    try {
      console.log(event);
      const nftId = Number(`${event.data.nftId._hex}`)
      await axios.put(`${this.nftRentMarketplaceApi}/items/add-to-pool/${nftId}`);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
}


module.exports = { NFTRentMarketplaceEventWorker };
