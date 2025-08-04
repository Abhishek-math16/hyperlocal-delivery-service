const db = require('../config/db');

const Customer = {
  // Function to create a new customer
  create: async ({ name, phone }) => {
    const query = `
      INSERT INTO customers (name, phone)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [name, phone];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  // Function to find a customer by their ID
  findById: async (id) => {
    const query = 'SELECT * FROM customers WHERE cust_id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }
};

module.exports = Customer;