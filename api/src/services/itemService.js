class ItemService {
  constructor(itemModel) {
    this.itemModel = itemModel;
  }

  async getItemByNftId(nftId) {
    nftId = Number(nftId)
    return await this.itemModel.getItemByNftId(nftId);
  }

  async createItem(itemData) {
    return await this.itemModel.createItem(itemData);
  }

  async getByOwner(ownerAddress) {
    return await this.itemModel.getByOwner(ownerAddress);
  }

  async getIdleByOwner(ownerAddress) {
    return await this.itemModel.getIdleByOwner(ownerAddress);
  }

  async rentItem(rentItemData) {
    return await this.itemModel.rentItem(rentItemData);
  }

  async finishRent(itemId) {
    return await this.itemModel.finishRent(itemId);
  }

  async addToPool(itemId) {
    itemId = Number(itemId)
    return await this.itemModel.addToPool(itemId);
  }

  async getItemsInPoolByUser(owner) {
    return await this.itemModel.getItemsInPoolByUser(owner);
  }

  async getItemsRentedByUser(owner) {
    return await this.itemModel.getItemsRentedByUser(owner);
  }
}

module.exports = ItemService;
