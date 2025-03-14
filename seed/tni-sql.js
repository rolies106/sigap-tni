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
    const createdAt = faker.date.past();
    const deviceType = faker.helpers.arrayElement(['android', 'ios']);
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
      'new',
      createdAt
    ]);

  }

  console.log('Selesai');
  process.exit();
};

module.exports = {
  generateMessages,
};