const db = require('../config/db');

const Product = {
  // Function to add a new product to a specific store
  create: async (storeId, { name, price }) => {
    const query = `
      INSERT INTO products (store_id, name, price)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [storeId, name, price];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  // Function to find all products belonging to a specific store
  findByStoreId: async (storeId) => {
    const query = 'SELECT * FROM products WHERE store_id = $1';
    const { rows } = await db.query(query, [storeId]);
    return rows;
  }
};

module.exports = Product;