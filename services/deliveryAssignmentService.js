const db = require('../config/db');

const DeliveryAssignmentService = {
  assignDeliveryToOrder: async (orderId) => {
    const client = await db.pool.connect();
    try {
      await client.query('BEGIN');

      // Step 1: Get the order's store_id to find where the pickup is.
      const orderQuery = 'SELECT store_id FROM orders WHERE order_id = $1';
      const orderResult = await client.query(orderQuery, [orderId]);
      if (orderResult.rows.length === 0) {
        throw new Error('Order not found.');
      }
      const { store_id } = orderResult.rows[0];

      // Step 2: Get the store's location coordinates.
      const storeQuery = 'SELECT location FROM stores WHERE store_id = $1';
      const storeResult = await client.query(storeQuery, [store_id]);
      if (storeResult.rows.length === 0) {
        throw new Error('Store not found.');
      }
      const storeLocation = storeResult.rows[0].location;

      // Step 3: Find the closest *available* delivery person to the store.
      // We'll search within a 10km radius for this example.
      const findDriverQuery = `
        SELECT person_id
        FROM delivery_personnel
        WHERE status = 'available'
        ORDER BY current_location <-> $1
        LIMIT 1;
      `;
      const driverResult = await client.query(findDriverQuery, [storeLocation]);
      if (driverResult.rows.length === 0) {
        throw new Error('No available delivery personnel found nearby.');
      }
      const assignedPersonId = driverResult.rows[0].person_id;

      // Step 4: Assign the driver to the order.
      const updateOrderQuery = `
        UPDATE orders SET person_id = $1, status = 'preparing' WHERE order_id = $2 RETURNING *;
      `;
      const updatedOrderResult = await client.query(updateOrderQuery, [assignedPersonId, orderId]);

      // Step 5: Update the driver's status to 'on_delivery'.
      const updateDriverQuery = `
        UPDATE delivery_personnel SET status = 'on_delivery' WHERE person_id = $1;
      `;
      await client.query(updateDriverQuery, [assignedPersonId]);

      // If all steps succeed, commit the transaction.
      await client.query('COMMIT');

      return updatedOrderResult.rows[0];

    } catch (error) {
      // If any step fails, roll back all changes.
      await client.query('ROLLBACK');
      console.error('Error in delivery assignment service:', error);
      throw error;
    } finally {
      // Always release the connection back to the pool.
      client.release();
    }
  }
};

module.exports = DeliveryAssignmentService;
