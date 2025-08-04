const db = require('../config/db');

const Store = {
  // --- UPDATED create function ---
  create: async ({ name, category, location }) => {
    // The location object should look like: { "latitude": 12.9716, "longitude": 77.5946 }
    const point = `POINT(${location.longitude} ${location.latitude})`;
    const query = `
      INSERT INTO stores (name, category, location)
      VALUES ($1, $2, ST_GeogFromText($3))
      RETURNING *;
    `;
    const values = [name, category, point];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  findById: async (id) => {
    const query = 'SELECT store_id, name, category, ST_AsText(location) as location FROM stores WHERE store_id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  },

  // --- NEW findNearby function ---
  findNearby: async (latitude, longitude, radiusInMeters) => {
    const point = `POINT(${longitude} ${latitude})`;
    const query = `
      SELECT
        store_id,
        name,
        category,
        ST_Distance(location, ST_GeogFromText($1)) AS distance_in_meters
      FROM stores
      WHERE ST_DWithin(location, ST_GeogFromText($1), $2)
      ORDER BY distance_in_meters;
    `;
    const values = [point, radiusInMeters];
    const { rows } = await db.query(query, values);
    return rows;
  }
};

module.exports = Store;
