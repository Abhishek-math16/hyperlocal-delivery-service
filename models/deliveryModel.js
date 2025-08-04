const db = require('../config/db');

const DeliveryPersonnel = {
  // Function to create a new delivery person
  create: async ({ name, phone, vehicle_id }) => {
    const query = `
      INSERT INTO delivery_personnel (name, phone, vehicle_id, status)
      VALUES ($1, $2, $3, 'offline')
      RETURNING person_id, name, phone, vehicle_id, status;
    `;
    const values = [name, phone, vehicle_id];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  // Function to update a driver's location and status
  updateLocationAndStatus: async (personId, { latitude, longitude, status }) => {
    const point = `POINT(${longitude} ${latitude})`;
    const query = `
      UPDATE delivery_personnel
      SET current_location = ST_GeogFromText($1), status = $2
      WHERE person_id = $3
      RETURNING person_id, status, ST_AsText(current_location) as location;
    `;
    const values = [point, status, personId];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  // Function to find a delivery person by their ID
  findById: async (id) => {
    const query = 'SELECT person_id, name, phone, vehicle_id, status, ST_AsText(current_location) as location FROM delivery_personnel WHERE person_id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }
};

module.exports = DeliveryPersonnel;
