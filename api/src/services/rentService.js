const ItemService = require("./itemService");
const pool = require("../../helpers/pgConnection");

class RentService {
  static async startRent({
    rentId,
    nftId,
    poolId,
    rentee,
    price,
    expirationDate,
    initDate,
    owner,
  }) {
    const query = `
      INSERT INTO rents 
      (id, initDate, expirationDate, finishDate, rentPrice, rentee, poolId, nftId, owner) 
      VALUES ($1, $2, $3, NULL, $4, $5, $6, $7, $8);
    `;

    try {
      await pool.query(query, [
        rentId,
        initDate,
        expirationDate,
        price,
        rentee,
        poolId,
        nftId,
        owner,
      ]);
      await ItemService.rentItem({ nftId, rentee });
    } catch (error) {
      console.error("Error starting rent: ", error.stack);
    }
  }

  static async getRentById({ rentId }) {
    const query = `
      SELECT * 
      FROM rents 
      WHERE id = $1;
    `;

    try {
      const result = await pool.query(query, [rentId]);
      return result.rows[0];
    } catch (error) {
      console.error("Error getting rent by id: ", error.stack);
    }
  }

  static async finishRent({ rentId, finishDate }) {
    const query = `
      UPDATE rents 
      SET finishDate = $1 
      WHERE id = $2;
    `;

    try {
      await pool.query(query, [finishDate, rentId]);
      const rent = await RentService.getRentById(rentId);
      const rentedNftId = rent.nftId;
      await ItemService.finishRent({ nftId: rentedNftId });
    } catch (error) {
      console.error("Error finishing rent: ", error.stack);
    }
  }

  static async getActiveByRentee({ rentee }) {
    const query = `
      SELECT rents.*, categories.gameid
      FROM rents
      INNER JOIN pools ON rents.poolid = pools.categoryid
      INNER JOIN categories ON pools.categoryid = categories.id
      WHERE rents.rentee = $1 AND rents.finishDate IS NULL;
    `;

    try {
      const result = await pool.query(query, [rentee]);
      return result.rows;
    } catch (error) {
      console.error("Error getting active rents by rentee: ", error.stack);
    }
  }

  static async getActiveByOwner({ owner }) {
    const query = `
      SELECT * 
      FROM rents 
      WHERE owner = $1 AND finishDate IS NULL;
    `;

    try {
      const result = await pool.query(query, [owner]);
      return result.rows;
    } catch (error) {
      console.error("Error getting active rents by owner: ", error.stack);
    }
  }

  static async getAllByRentee({ rentee }) {
    const query = `
      SELECT * 
      FROM rents 
      WHERE rentee = $1;
    `;

    try {
      const result = await pool.query(query, [rentee]);
      return result.rows;
    } catch (error) {
      console.error("Error getting all rents by rentee: ", error.stack);
    }
  }
}

module.exports = RentService;
