const pool = require("../../helpers/pgConnection");

class ItemService {
  static async getByOwner({ owner }) {
    const query = `
      SELECT * 
      FROM items 
      WHERE items.owner = $1;
    `;

    try {
      const result = await pool.query(query, [owner]);
      return result.rows;
    } catch (error) {
      console.error("Error getting items by owner: ", error.stack);
    }
  }

  static async getIdleByOwner({ owner }) {
    const query = `
    SELECT * 
    FROM items 
    WHERE items.owner = $1 AND items.isInPool = false;
  `;

    try {
      const result = await pool.query(query, [owner]);
      return result.rows;
    } catch (error) {
      console.error("Error getting idle items by owner: ", error.stack);
    }
  }

  static async createItem({ nftId, categoryId, owner }) {
    const query = `
    INSERT INTO items (nftId, categoryId, owner, rentee, isInPool) 
    VALUES ($1, $2, $3, NULL, false)
    RETURNING *;
  `;

    try {
      const result = await pool.query(query, [nftId, categoryId, owner]);
      return result.rows[0];
    } catch (error) {
      console.error("Error creating item: ", error.stack);
    }
  }

  static async getItemByNftId({ nftId }) {
    const query = `
    SELECT * 
    FROM items 
    WHERE nftId = $1;
  `;

    try {
      const result = await pool.query(query, [nftId]);
      return result.rows;
    } catch (error) {
      console.error("Error getting item by NFT ID: ", error.stack);
    }
  }

  static async rentItem({ nftId, rentee }) {
    const query = `
    UPDATE items 
    SET rentee = $1 
    WHERE nftId = $2
    RETURNING *;
  `;

    try {
      const result = await pool.query(query, [rentee, nftId]);
      return result.rows[0];
    } catch (error) {
      console.error("Error renting item: ", error.stack);
    }
  }

  static async finishRent({ nftId }) {
    const query = `
    UPDATE items 
    SET rentee = NULL 
    WHERE nftId = $1
    RETURNING *;
  `;

    try {
      const result = await pool.query(query, [nftId]);
      return result.rows[0];
    } catch (error) {
      console.error("Error finishing rent: ", error.stack);
    }
  }

  static async addToPool({ nftId }) {
    const query = `
    UPDATE items 
    SET isInPool = true 
    WHERE nftId = $1
    RETURNING *;
  `;

    try {
      const result = await pool.query(query, [nftId]);
      return result.rows[0];
    } catch (error) {
      console.error("Error adding item to pool: ", error.stack);
    }
  }

  static async getItemsInPoolByUser({ owner }) {
    const query = `
    SELECT * 
    FROM items 
    WHERE owner = $1 AND isInPool = true AND rentee IS NULL;
  `;

    try {
      const result = await pool.query(query, [owner]);
      return result.rows;
    } catch (error) {
      console.error("Error getting items in pool by user: ", error.stack);
    }
  }

  static async getItemsRentedByUser({ owner }) {
    const query = `
    SELECT * 
    FROM items 
    WHERE owner = $1 AND isInPool = true AND rentee IS NOT NULL;
  `;

    try {
      const result = await pool.query(query, [owner]);
      return result.rows;
    } catch (error) {
      console.error("Error getting items rented by user: ", error.stack);
    }
  }
}

module.exports = ItemService;
