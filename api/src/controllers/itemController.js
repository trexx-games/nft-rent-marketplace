const ItemService = require("../services/itemService");

class ItemController {
  static async createItem(req, res) {
    const { nftId, categoryId, owner } = req.body;
    
    await ItemService.createItem({ nftId, categoryId, owner });

    res.status(201).json({ message: "Item created successfully" });
  }

  static async addToPool(req, res) {
    const nftId = req.params.nftId;
    
    await ItemService.addToPool({ nftId });

    res.status(201).json({ message: "Item added to pool successfully" });
  }

  static async getItemsInPoolByUser(req, res) {
    const owner = req.params.owner;
    
    const itemsInPool = await ItemService.getItemsInPoolByUser({
      owner,
    });

    res.status(200).json({ itemsInPool });
  }

  static async getItemsRentedByUser(req, res) {
    const owner = req.params.owner;
    
    const itemsRented = await ItemService.getItemsRentedByUser({
      owner,
    });

    res.status(200).json({ itemsRented });
  }

  static async getItemsOwnedByUser(req, res) {
    const owner = req.params.owner;
    
    const itemsOwned = await ItemService.getByOwner({ owner });

    res.status(200).json({ itemsOwned });
  }
}

module.exports = ItemController;
