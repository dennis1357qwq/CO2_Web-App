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
    `Select * FROM scenario, center_scenario WHERE scenario.scenario_id = ? AND center_scenario.scenario_id = ?`,
    [scenario_id, scenario_id]
  );
  console.log(`requested scenario: `,scenario_id,`bzw: `, result)
  return result;
}

export async function getScenarios(id) {
  const [rows] = await pool.query(
    `
    SELECT * FROM scenario WHERE user_id = ?
    `,
    [id]
  );
  return rows;
}

export async function createScenario(user_id, centers) {
  const [result] = await pool.query(`INSERT INTO scenario (user_id) VALUES (?)`, [
    user_id,
  ]);
  const id = result.insertId;
  
  for (let i = 0; i< centers.length; i++) {
    const [result1] = await pool.query(
      `INSERT INTO center_scenario (scenario_id, center_id) VALUES (?,?)`,
      [id, centers[i]]
    );
  }
  return getScenario(id);
}

export async function deleteScenario(id) {
  const [nada] = await pool.query(
    `
    DELETE FROM center_scenario WHERE scenario_id = ?;
    `,
    [Number(id)]
  );
  
  const [result] = await pool.query(
    `
    DELETE FROM scenario WHERE scenario_id = ?
    `,
    [Number(id)]
  );
  
  
  return nada;
}


export async function updateScenario(scenario_id, centers){

  if(centers.length ==0){
    return await deleteScenario(scenario_id);
  }

  const current= await getScenario(scenario_id);

  const cen = [];
  for (let i =0; i <current.length; i++){
    cen.push(current[i].center_id);
  } 
  console.log(`already included`);
  console.log(cen);

  console.log(`to be included`);
  console.log(centers);
  // neue centren hinzufügen
for (let i = 0; i < centers.length; i++){
  if(!cen.includes(centers[i])){
     const [result1] = await pool.query(
      `INSERT INTO center_scenario (scenario_id, center_id) VALUES (?,?)`,
      [scenario_id, centers[i]]
    );
  }
}

//ungebrauchte centren löschen
for (let i = 0; i < cen.length; i++){
  if(!centers.includes(cen[i])){
    const [nada] = await pool.query(
    `
    DELETE FROM center_scenario WHERE center_id = ? AND scenario_id = ?;
    `,
    [cen[i], scenario_id]
  );
  }
}

const output = await getScenario(scenario_id);
console.log(output);

return output;


}
//TODO: export async function updateScenario()
