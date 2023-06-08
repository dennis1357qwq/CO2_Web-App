import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getCenters() {
  const [rows] = await pool.query("SELECT * FROM centers");
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

export async function createCenter(name, location, peakConsumption) {
  const [result] = await pool.query(
    `
    INSERT INTO centers (name, location, peak_consumption)
    VALUES (?,?,?)
    `,
    [name, location, peakConsumption]
  );

  const id = result.insertId;
  return getCenter(id);
}

export async function checkUserExists(email, password) {
  const [rows] = await pool.query(
    `
    SELECT * from user WHERE email = ? AND password = ?
    `,
    [email, password]
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
