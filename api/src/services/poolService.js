const pool = require("../../helpers/pgConnection");

class PoolService {
  static async getAll() {
    const query = `
      SELECT * 
      FROM pools 
      INNER JOIN categories 
      ON pools.categoryId = categories.id;
    `;

    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error getting all pools: ", error.stack);
    }
  }

  static async getById({ poolId }) {
    const query = `
    SELECT * 
    FROM pools 
    INNER JOIN categories 
    ON pools.categoryId = categories.id
    WHERE pools.categoryId = $1;
  `;

    try {
      const result = await pool.query(query, [poolId]);
      return result.rows[0];
    } catch (error) {
      console.error("Error getting pool by id: ", error.stack);
    }
  }

  static async createPool({ poolId, basePrice, gameId }) {
    const imageUrl = `https://nft-rent-marketplace.s3.us-east-2.amazonaws.com/categories/${poolId}.png`
    const query = `
    INSERT INTO pools (categoryId, isActive, basePrice, imageUrl, gameId) 
    VALUES ($1, true, $2, '${imageUrl}', $3)
    RETURNING *;
  `;
    console.log("query: ", query)
    try {
      const result = await pool.query(query, [poolId, basePrice, gameId]);
      return result.rows[0];
    } catch (error) {
      console.error("Error creating pool: ", error.stack);
    }
  }
}

module.exports = PoolService;
