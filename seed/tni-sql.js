require("../config.js");

const { fakerID_ID } = require('@faker-js/faker');

const faker = fakerID_ID;

async function generateMessages(num) {
  const pool = global.tools.mysql.connect();

  for (let i = 0; i < num; i++) {
    const phoneNumber = faker.phone.number();
    const cmd = '/tni';
    const contentType = 'chat';
    const rawRequest = '/tni ' + faker.lorem.paragraphs({ min: 4, max: 6 });
    const createdAt = faker.date.between({ from: '2025-02-01', to: '2025-02-28', format: 'YYYY-MM-DD' });
    const deviceType = faker.helpers.arrayElement(['android', 'ios']);
    const status = faker.helpers.arrayElement(['new', 'need_confirm', 'confirmed', 'submitted']);
    const keyPoints = faker.lorem.paragraphs({ min: 4, max: 6 });
    const actionPlan = faker.lorem.paragraphs({ min: 4, max: 6 });

    await pool.query(`
      INSERT INTO summary (
        phone_number, device_type, cmd, content_type, raw_request, key_points, action_plan, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
      phoneNumber,
      deviceType,
      cmd,
      contentType,
      rawRequest,
      keyPoints,
      actionPlan,
      status,
      createdAt
    ]);

  }

  console.log('Selesai');
  process.exit();
};

module.exports = {
  generateMessages,
};