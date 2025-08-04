const db = require('../config/db');

const Order = {
  // create function remains the same
  create: async ({ cust_id, store_id, delivery_address, items }) => {
    const client = await db.pool.connect();
    try {
      await client.query('BEGIN');
      const orderQuery = `
        INSERT INTO orders (cust_id, store_id, delivery_address, status)
        VALUES ($1, $2, $3, 'pending')
        RETURNING order_id;
      `;
      const orderResult = await client.query(orderQuery, [cust_id, store_id, delivery_address]);
      const orderId = orderResult.rows[0].order_id;
      let totalAmount = 0;
      for (const item of items) {
        const productQuery = 'SELECT price FROM products WHERE product_id = $1';
        const productResult = await client.query(productQuery, [item.product_id]);
        if (productResult.rows.length === 0) {
          throw new Error(`Product with ID ${item.product_id} not found.`);
        }
        const pricePerItem = productResult.rows[0].price;
        totalAmount += item.quantity * pricePerItem;
        const orderItemQuery = `
          INSERT INTO order_items (order_id, product_id, quantity, price_per_item)
          VALUES ($1, $2, $3, $4);
        `;
        await client.query(orderItemQuery, [orderId, item.product_id, item.quantity, pricePerItem]);
      }
      const updateTotalQuery = 'UPDATE orders SET total_amount = $1 WHERE order_id = $2';
      await client.query(updateTotalQuery, [totalAmount, orderId]);
      await client.query('COMMIT');
      return { order_id: orderId, total_amount: totalAmount };
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error in create order transaction:', error);
      throw error;
    } finally {
      client.release();
    }
  },

  // getOrderById remains the same
  getOrderById: async (id) => {
    const query = 'SELECT * FROM orders WHERE order_id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  },

  // updateStatus remains the same
  updateStatus: async (orderId, status) => {
    const query = `
      UPDATE orders
      SET status = $1
      WHERE order_id = $2
      RETURNING order_id, status;
    `;
    const { rows } = await db.query(query, [status, orderId]);
    if (rows.length === 0) {
      throw new Error('Order not found or status could not be updated.');
    }
    return rows[0];
  },

  // --- NEW function to find all orders ---
  findAll: async () => {
    const query = `
      SELECT
        o.order_id,
        o.status,
        o.delivery_address,
        o.total_amount,
        c.name AS customer_name,
        s.name AS store_name
      FROM orders o
      LEFT JOIN customers c ON o.cust_id = c.cust_id
      LEFT JOIN stores s ON o.store_id = s.store_id
      ORDER BY o.created_at DESC;
    `;
    const { rows } = await db.query(query);
    return rows;
  }
};

module.exports = Order;
