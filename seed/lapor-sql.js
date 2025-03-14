require("../config.js");

const { fakerID_ID } = require('@faker-js/faker');

const faker = fakerID_ID;

async function generateMessages(num) {
  const pool = global.tools.mysql.connect();

  for (let i = 0; i < num; i++) {
    const phoneNumber = faker.phone.number();
    const cmd = '/lapor';
    const contentType = 'chat';
    const rawRequest = '/lapor ' + faker.lorem.sentence();
    const createdAt = faker.date.past();
    const deviceType = faker.helpers.arrayElement(['android', 'ios']);
    const content = faker.lorem.sentence();
    const reportType = faker.helpers.arrayElement(['pemadam kebakaran', 'kepolisian', 'rumah sakit']);
    const reportLocation = faker.helpers.arrayElement(["Margonda", "Pisangan", "Kebayoran Lama", "Kebayoran Baru", "Kebayoran Lama", "Kebayoran Lama", "Kebayoran Lama", "Kebayoran Lama", "Kebayoran Lama", "Kebayoran Lama"]);
    const category = faker.helpers.arrayElement(["Pemadam Kebakaran", "Kepolisian", "Rumah Sakit"]);
    const status = faker.helpers.arrayElement(["dikerahkan", "menunggu", "selesai"]);
    const severity = faker.helpers.arrayElement(["tinggi", "sedang", "rendah"]);

    await pool.query(`
      INSERT INTO report (
        phone_number, device_type, cmd, content_type, raw_request, response, report_type, report_location, category, status, severity, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
      phoneNumber,
      deviceType,
      cmd,
      contentType,
      rawRequest,
      content,
      reportType,
      reportLocation,
      category,
      status,
      severity,
      createdAt
    ]);
  }

  console.log('Selesai');
  process.exit();
};

module.exports = {
  generateMessages,
};