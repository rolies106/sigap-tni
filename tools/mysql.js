const mysql = require("mysql2");

function connect() {
  try {
    return mysql.createPool({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DB
    }).promise();
  } catch (error) {
    console.error(error);
  }
}

async function insertLapor(msg, response) {
  const responseDecode = JSON.parse(response.message.content);

  try {
    const pool = connect();
    // Connect to DB
    await pool.query(`
      INSERT INTO report (
        phone_number, device_type, cmd, content_type, raw_request, response, report_type, report_location, category, status, severity
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
      msg.from,
      msg.deviceType,
      '/lapor',
      msg.type,
      msg.body,
      responseDecode.response_user,
      responseDecode.tindakan.jenis,
      responseDecode.tindakan.lokasi,
      responseDecode.tindakan.unit_ditugaskan,
      responseDecode.tindakan.status,
      responseDecode.tingkat_keparahan
    ]);
  } catch (error) {
    console.error(`[${global.config.bot.name}] Error:`, error);
  }
}

async function insertStt(msg, textInput, response) {
  const responseDecode = JSON.parse(response.message.content);

  try {
    const pool = connect();
    await pool.query(`
      INSERT INTO report (
        phone_number, device_type, cmd, content_type, transcribe, raw_request, response, report_type, report_location, category, status, severity
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
      msg.from,
      msg.deviceType,
      'voice',
      msg.type,
      textInput,
      textInput,
      responseDecode.response_user,
      responseDecode.tindakan.jenis,
      responseDecode.tindakan.lokasi,
      responseDecode.tindakan.unit_ditugaskan,
      responseDecode.tindakan.status,
      responseDecode.tingkat_keparahan
    ]);
  } catch (error) {
    console.error(`[${global.config.bot.name}] Error:`, error);
  }
}

async function insertTni(msg, response) {
  try {
    const pool = connect();

    await pool.query(`
      INSERT INTO summary (
        phone_number, device_type, cmd, content_type, raw_request, key_points, action_plan, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
      msg.from,
      msg.deviceType,
      '/tni',
      msg.type,
      msg.body,
      response.data.key_points.join("\n"),
      response.data.action_plan.join("\n"),
      'new'
    ]);

  } catch (error) {
    console.error(`[${global.config.bot.name}] Error:`, error);
  }
}

module.exports = {
  insertLapor,
  insertStt,
  insertTni,
  connect,
};