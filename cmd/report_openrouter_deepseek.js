const axios = require("axios");
async function processReport(msg) {
  console.log("Processing report...");
  const input = msg.body.slice(7)

  if (!input) return msg.reply(
    `${quote(global.tools.msg.generateInstruction(["send"], ["text"]))}\n` +
    quote(global.tools.msg.generateCommandExample('/lapor', "Cara laporan ke bot"))
  );

  try {
    const apiUrl = global.tools.api.createUrl("openrouter", "/api/v1/chat/completions");
    const {
      data
    } = await axios.post(apiUrl, {
      model: 'deepseek/deepseek-r1-zero:free',
      prompt: `Anda adalah chatbot yang menangani laporan masyarakat, anda dapat merespon dengan tindakan yang diperlukan dalam suatu kejadian, anda juga sudah terhubung ke sistem lain yang dapat menangani kejadian yang dilaporkan (seperti yang membutuhkan pemadam kebakaran, kepolisian, atau rumah sakit), tolong respon laporan ini: ` + input, // Dapat diubah sesuai keinginan Anda
      // messages: [
      //   {
      //     "role": "user",
      //     "content": input
      //   }
      // ]
    }, {
      headers: {
        "Authorization": "Bearer " + global.config.openrouter.token,
        "Content-Type": "application/json",
        "X-Title": "https://cv-tech.id",
      }
    });


    msg.reply(data.choices[0].text);
  } catch (error) {
    console.log(`Terjadi kesalahan: ${error.message}`);
    console.log(error);
    console.log(error.response.data);
    if (error.status !== 200) return msg.reply(global.config.msg.error);
  }
}

module.exports = {
  processReport
}