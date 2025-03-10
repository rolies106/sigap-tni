const openai = require("openai");
const axios = require("axios");
const { MessageTypes } = require('whatsapp-web.js');

async function processLocation(msg) {
  console.log("Processing report...");
  var input = msg.body
  const chatgpt = new openai({
    apiKey: global.config.openai.token,
  });

  if (!input) return msg.reply(
    `${quote(global.tools.msg.generateInstruction(["send"], ["text"]))}\n` +
    quote(global.tools.msg.generateCommandExample('/lapor', "Cara laporan ke bot"))
  );

  const quotedMsg = await msg.getQuotedMessage();

  // Check for quoted message
  if (!msg.hasQuotedMsg || quotedMsg.type != MessageTypes.TEXT) {
    return msg.reply("Terima kasih untuk informasi lokasi yang anda kirimkan");
  }

  // Alter input for adding location
  if (msg.location.name != undefined && msg.location.address != undefined) {
    input += `\nUpdate Lokasi kejadian: ${msg.location.name}, ${msg.location.address}`
  } else {
    input += `\nUpdate Lokasi kejadian: latitude ${msg.location.latitude}, longitude ${msg.location.longitude}`
  }

  try {
    const data = await chatgpt.chat.completions.create({
      messages: [
        {
          "role": "developer",
          "content": [
            {
              "type": "text",
              "text": `Anda adalah chatbot yang menangani laporan masyarakat, 
              anda dapat merespon dengan tindakan yang diperlukan dalam suatu kejadian, 
              asumsikan anda juga sudah terhubung ke sistem lain yang dapat menangani kejadian 
              yang dilaporkan (seperti yang membutuhkan pemadam kebakaran, kepolisian, atau rumah sakit)`
            }
          ]
        },
        {
          "role": "assistant",
          "content": [
            {
              "type": "text",
              "text": quotedMsg.body
            }
          ]
        },
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": input
            }
          ]
        }
      ],
      model: "gpt-4o-mini",
      store: true,
    });

    console.log(data.choices[0]);

    msg.reply(data.choices[0].message.content);
  } catch (error) {
    console.log(`Terjadi kesalahan: ${error.message}`);
    console.log(error);
    if (error.status !== 200) return msg.reply(global.config.msg.error);
  }
}

module.exports = {
  processLocation
}