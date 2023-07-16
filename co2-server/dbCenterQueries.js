import pool from "./dbPool.js";

export async function createCenter(
  name,
  peakConsumption,
  lat,
  long,
  outPost,
  user_id,
  adress
) {
  const adressId = await createAdress(
    adress.nr,
    adress.line_1,
    adress.line_2,
    adress.city,
    adress.region,
    adress.postCode,
    adress.country
  );

  const [result] = await pool.query(
    `
        INSERT INTO centers (name, peak_consumption, lattitude, longitude, outer_postcode, adress_id, user_id)
        VALUES (?,?,?,?,?,?,?)
        `,
    [name, peakConsumption, lat, long, outPost, adressId.adress_id, user_id]
  );

  const id = result.insertId;
  return getCenter(id);
}

export async function createAdress(
  nr,
  line_1,
  line_2,
  city,
  region,
  postCode,
  country
) {
  const [result] = await pool.query(
    `
        INSERT INTO adresses (unit_number, adress_line_1, adress_line_2, city, region, postal_code, country)
        VALUES (?,?,?,?,?,?,?)
        `,
    [nr, line_1, line_2, city, region, postCode, country]
  );

  const id = result.insertId;
  return getAdress(id);
}

export async function getCenters(id) {
  const [rows] = await pool.query(
    `
    SELECT * FROM centers WHERE user_id = ?
    `,
    [id]
  );
  return rows;
}

export async function getCenter(id) {
  const [rows] = await pool.query(
    `
      SELECT *
      FROM centers
      WHERE center_id = ?
    `,
    [id]
  );
  return rows[0];
}

export async function getAdress(id) {
  const [rows] = await pool.query(
    `
        SELECT *
        FROM adresses
        WHERE adress_id = ?
        `,
    [id]
  );
  return rows[0];
}

export async function updateCenter(
  id,
  name,
  lat,
  long,
  outPost,
  peakConsumption
) {
  const [result] = await pool.query(
    `
        UPDATE centers
        SET name = ?, peak_consumption = ?, lattitude = ?, longitude = ?, outer_postcode = ?
        WHERE center_id = ?
        `,
    [name, peakConsumption, lat, long, outPost, id]
  );
  return getCenter(id);
}

export async function updateAdress(
  id,
  nr,
  line_1,
  line_2,
  city,
  region,
  postalCode,
  country
) {
  const [result] = await pool.query(
    `
          UPDATE adresses
          SET unit_number = ?, adress_line_1 = ?, adress_line_2 = ?, city = ?, region = ?, postal_code = ?, country = ?
          WHERE adress_id = ?
          `,
    [nr, line_1, line_2, city, region, postalCode, country, id]
  );
  return getAdress(id);
}

export async function deleteCenter(id) {
  const center = await getCenter(id);

  const [rows] = await pool.query(
    `DELETE FROM center_scenario WHERE center_id = ?`, [id]
  );

  const [result] = await pool.query(
    `
      DELETE FROM centers WHERE center_id = ?
      `,
    [id]
  );

  if (center.adress_id != null) {
    const address = await deleteAdress(center.adress_id);
  }

  return getCenters();
}

export async function deleteAdress(id) {
  const [result] = await pool.query(
    `
        DELETE FROM adresses WHERE adress_id = ?
        `,
    [id]
  );
}
