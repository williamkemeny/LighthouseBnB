const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb",
});

const getUserWithEmail = function (email) {
  const queryString = `SELECT * FROM users WHERE email =$1;`;
  return pool
    .query(queryString, [email])
    .then((result) => {
      return result.rows[0] || null;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getUserWithId = function (id) {
  const queryString = `SELECT * FROM users WHERE id =$1;`;
  return pool
    .query(queryString, [id])
    .then((result) => {
      return result.rows[0] || null;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const addUser = function (user) {
  const { name, email, password } = user;
  const queryString = `INSERT INTO users (
    name, email, password) 
    VALUES ($1,$2,$3)
    RETURNING *;`;
  return pool
    .query(queryString, [name, email, password])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getAllReservations = function (guest_id, limit = 10) {
  const queryString = `SELECT properties.*, reservations.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON properties.id = reservations.property_id
  JOIN property_reviews ON property_reviews.property_id = properties.id
  WHERE reservations.guest_id = $1
  GROUP BY properties.id, reservations.id
  ORDER BY start_date
  LIMIT $2;`;

  return pool
    .query(queryString, [guest_id, limit])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getAllProperties = (options, limit = 10) => {
  const queryParams = [];

  let queryString = `
   SELECT properties.*, avg(property_reviews.rating) as average_rating
   FROM properties
   JOIN property_reviews ON properties.id = property_id
   `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    !queryParams.length ? (queryString += `WHERE `) : (queryString += `AND `);
    queryParams.push(options.owner_id);
    queryString += `owner_id = $${queryParams.length} `;
  }

  if (options.minimum_price_per_night) {
    !queryParams.length ? (queryString += `WHERE `) : (queryString += `AND `);
    queryParams.push(options.minimum_price_per_night * 100);
    queryString += `cost_per_night >= $${queryParams.length} `;
  }

  if (options.maximum_price_per_night) {
    !queryParams.length ? (queryString += `WHERE `) : (queryString += `AND `);
    queryParams.push(options.maximum_price_per_night * 100);

    queryString += `cost_per_night <= $${queryParams.length} `;
  }

  queryString += `GROUP BY properties.id
  `;
  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `ORDER BY cost_per_night
   LIMIT $${queryParams.length};
   `;

  return pool.query(queryString, queryParams).then((res) => res.rows);
};

const addProperty = function (property) {
  const queryParams = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.country,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms,
  ];
  const queryString = `INSERT INTO properties (owner_id,
  title,
  description,
  thumbnail_photo_url,
  cover_photo_url,
  cost_per_night,
  street,
  city,
  province,
  post_code,
  country,
  parking_spaces,
  number_of_bathrooms,
  number_of_bedrooms)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
    RETURNING *;`;
  return pool
    .query(queryString, queryParams)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
