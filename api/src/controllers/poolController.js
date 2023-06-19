const PoolService = require("../services/poolService");

class PoolController {
  static async getAll(_, res) {
    
    const pools = await PoolService.getAll();

    res.status(200).json({ pools });
  }

  static async getById(req, res) {
    
    const pool = await PoolService.getById({
      poolId: req.params.poolId,
    });

    res.status(200).json({ pool });
  }

  static async createPool(req, res) {
    const { poolId, basePrice, gameId } = req.body;
    const pool = await PoolService.createPool({
      poolId,
      basePrice,
      gameId
    });

    res.status(200).json({ pool });
  }
}
module.exports = PoolController;
