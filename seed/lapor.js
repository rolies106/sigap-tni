require("../config.js");

const { fakerID_ID } = require('@faker-js/faker');

const faker = fakerID_ID;

async function generateMessages(num) {
  global.tools.mongodb.connect();

  const msg = [];
  const Message = global.schema.message.messageModel();

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
    const response = {
      content,
      reportType,
      reportLocation,
      category,
      status,
      severity,
    };

    msg.push({
      phoneNumber,
      cmd,
      contentType,
      rawRequest,
      deviceType,
      response,
      createdAt
    });

    const lapor = new Message(msg[i]);

    await lapor.save();
  }

  console.log('Selesai');
  process.exit();
};

module.exports = {
  generateMessages,
};