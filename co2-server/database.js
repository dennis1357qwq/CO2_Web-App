import pool from "./dbPool.js";

export async function login(email, password) {
  const [rows] = await pool.query(
    `
      SELECT * from users WHERE email = ? AND password = ?
      `,
    [email, password]
  );
  return rows[0];
}

export async function checkUserExists(username, email) {
  const [rows] = await pool.query(
    `
      SELECT * from users WHERE username = ? OR email = ?
      `,
    [username, email]
  );
  return rows[0];
}

export async function getUser(id) {
  const [rows] = await pool.query(
    `
      SELECT * FROM users WHERE user_id = ?
      `,
    [id]
  );
  return rows[0];
}

export async function addUser(username, email, password) {
  const [result] = await pool.query(
    `
      INSERT INTO users (username, email, password)
      VALUES (?,?,?)
      `,
    [username, email, password]
  );

  const id = result.insertId;
  return getUser(id);
}

export async function deleteUser(id) {
  const [result] = await pool.query(
    `
      DELETE FROM users WHERE user_id = ?
      `,
    [id]
  );

  //return getCenters();
}
