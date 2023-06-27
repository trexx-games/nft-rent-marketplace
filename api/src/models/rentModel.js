const pool = require('../../helpers/pgConnection');
const { RENT_STATUS_ENUM } = require('../../enums/rentStatus');
class RentModel {
  constructor() {
    this.pool = pool;
  }

  async createRent({ id, initDate, expirationDate, priceBlockchain, ownerAddress, renteeAddress, poolId, itemId }) {
    const query = `
      INSERT INTO rents (id, init_date, expiration_date, price_blockchain, owner_address, rentee_address, pool_id, item_id, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, ${RENT_STATUS_ENUM.ACTIVE})
      RETURNING *;
    `;

    try {
      const result = await this.pool.query(query, [id, initDate, expirationDate, priceUSD, priceBlockchain, ownerAddress, renteeAddress, poolId, itemId, rentStatusId]);
      return result.rows[0];
    } catch (error) {
      console.error('Error creating rent: ', error.stack);
    }
  }

  async getRentById(id) {
    const query = `
      SELECT *
      FROM rents
      WHERE id = $1;
    `;

    try {
      const result = await this.pool.query(query, [id]);
      return result.rows;
    } catch (error) {
      console.error('Error getting rent by ID: ', error.stack);
    }
  }

  async getActiveByOwner(ownerAddress) {
    const query = `
      SELECT *
      FROM rents
      WHERE owner_address = $1 AND status = ${RENT_STATUS_ENUM.ACTIVE};
    `;

    try {
      const result = await this.pool.query(query, [ownerAddress]);
      return result.rows;
    } catch (error) {
      console.error('Error getting active rents by owner: ', error.stack);
    }
  }

  async getActiveByRentee(renteeAddress) {
    const query = `
      SELECT *
      FROM rents
      WHERE rentee_address = $1 AND status = ${RENT_STATUS_ENUM.ACTIVE};
    `;

    try {
      const result = await this.pool.query(query, [renteeAddress]);
      return result.rows;
    } catch (error) {
      console.error('Error getting active rents by rentee: ', error.stack);
    }
  }

  async finishRent(id) {
    const query = `
      UPDATE rents
      SET status = ${RENT_STATUS_ENUM.FINISHED}
      WHERE id = $1
      RETURNING *;
    `;

    try {
      const result = await this.pool.query(query, [id]);
      return result.rows;
    } catch (error) {
      console.error('Error finishing rent: ', error.stack);
    }
  }

  async getAllByRentee(renteeAddress) {
    const query = `
      SELECT *
      FROM rents
      WHERE rentee_address = $1;
    `;

    try {
      const result = await this.pool.query(query, [renteeAddress]);
      return result.rows;
    } catch (error) {
      console.error('Error getting all rents by rentee: ', error.stack);
    }
  }
}

module.exports = RentModel;