const axios = require("axios");
async function processReport(msg) {
  console.log("Processing report...");
  const input = msg.body.slice(7)

  if (!input) return msg.reply(
    `${quote(global.tools.msg.generateInstruction(["send"], ["text"]))}\n` +
    quote(global.tools.msg.generateCommandExample('/lapor', "Cara laporan ke bot"))
  );

  try {
    const apiUrl = global.tools.api.createUrl("ryzendesu", "/api/ai/chatgpt", {
      text: input,
      prompt: `Anda adalah chatbot yang menangani laporan masyarakat, anda dapat merespon dengan tindakan yang diperlukan dalam suatu kejadian, asumsikan anda juga sudah terhubung ke sistem lain yang dapat menangani kejadian yang dilaporkan (seperti yang membutuhkan pemadam kebakaran, kepolisian, atau rumah sakit)` // Dapat diubah sesuai keinginan Anda
    });
    const {
      data
    } = await axios.get(apiUrl);

    console.log(apiUrl);
    console.log(data);

    msg.reply(data.result);
  } catch (error) {
    console.log(`Terjadi kesalahan: ${error.message}`);
    console.log(error);
    if (error.status !== 200) return msg.reply(global.config.msg.error);
  }
}

module.exports = {
  processReport
}