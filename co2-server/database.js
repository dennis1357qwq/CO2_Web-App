import pool from "./dbPool.js";

export async function login(email, password) {
  const [rows] = await pool.query(
    `
      SELECT * from user WHERE email = ? AND password = ?
      `,
    [email, password]
  );
  return rows[0];
}

export async function checkUserExists(username, email) {
  const [rows] = await pool.query(
    `
      SELECT * from user WHERE username = ? OR email = ?
      `,
    [username, email]
  );
  return rows[0];
}

export async function getUser(id) {
  const [rows] = await pool.query(
    `
      SELECT * FROM user WHERE user_id = ?
      `,
    [id]
  );
  return rows[0];
}

export async function addUser(username, email, password) {
  const [result] = await pool.query(
    `
      INSERT INTO user (username, email, password)
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
      DELETE FROM user WHERE user_id = ?
      `,
    [id]
  );

  //return getCenters();
}

//maybe include getting center information instead of just their id´s
export async function getScenario(scenario_id) {
  const [result] = await pool.query(
    `Select * FROM scenario WHERE scenario_id = ?`,
    [scenario_id]
  );
  return result[0];
}

export async function getScenarios(user_id) {
  const [result] = await pool.query(
    `Select * FROM scenario WHERE scenario_id = ?`,
    [user_id]
  );
  return result;
}

export async function createScenario(user_id, centers) {
  const [result] = await pool.query(`INSERT INTO scenario (user_id) VALUES ?`, [
    user_id,
  ]);
  const id = result.insertId;

  for (let center in centers) {
    const [result1] = await pool.query(
      `INSERT INTO center_scenario (scenario_id, center_id) VALUES ?,?`,
      [id, center]
    );
  }
  return getScenarios();
}

export async function deleteScenario(id) {
  const [result] = await pool.query(
    `
    DELETE FROM center_scenario WHERE scenario_id = ?
    `,
    [id]
  );

  return getScenarios();
}

//TODO: export async function updateScenario()
