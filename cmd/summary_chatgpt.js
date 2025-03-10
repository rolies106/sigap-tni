const openai = require("openai");
const axios = require("axios");

async function processReport(msg) {
  console.log("Processing report...");
  const input = msg.body.slice(7)
  const chatgpt = new openai({
    apiKey: global.config.openai.token,
  });

  if (!input) return msg.reply(
    `${quote(global.tools.msg.generateInstruction(["send"], ["text"]))}\n` +
    quote(global.tools.msg.generateCommandExample('/lapor', "Cara laporan ke bot"))
  );


  try {
    const data = await chatgpt.chat.completions.create({
      messages: [
        {
          "role": "developer",
          "content": [
            {
              "type": "text",
              "text": `Tolong rangkum laporan yang diberikan dengan bentuk bullet point dan dengan singkat, agar dapat segera dipahami konteks dari laporan tersebut`
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
  processReport
}