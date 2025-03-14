require("../config.js");

const { fakerID_ID } = require('@faker-js/faker');

const faker = fakerID_ID;

async function generateMessages(num) {
  global.tools.mongodb.connect();

  const msg = [];
  const Message = global.schema.message.messageModel();

  for (let i = 0; i < num; i++) {
    const phoneNumber = faker.phone.number();
    const cmd = '/tni';
    const contentType = 'chat';
    const rawRequest = '/tni ' + faker.lorem.paragraphs({ min: 4, max: 6 });
    const createdAt = faker.date.past();
    const deviceType = faker.helpers.arrayElement(['android', 'ios']);
    const keyPoints = faker.lorem.paragraphs({ min: 4, max: 6 });
    const actionPlan = faker.lorem.paragraphs({ min: 4, max: 6 });


    msg.push({
      phoneNumber,
      cmd,
      contentType,
      rawRequest,
      deviceType,
      keyPoints,
      actionPlan,
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