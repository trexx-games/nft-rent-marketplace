class PoolService {
  constructor(poolModel) {
    this.poolModel = poolModel;
  }

  async getAll() {
    return await this.poolModel.getAll();
  }

  async getById(categoryId) {
    return await this.poolModel.getById(categoryId);
  }

  async createPool({ categoryId, basePrice, gameId }) {
    return await this.poolModel.createPool({ categoryId, basePrice, gameId });
  }
}

module.exports = PoolService;
