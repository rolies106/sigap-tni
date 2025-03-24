const axios = require("axios");
async function processReport(msg) {
  console.log("Processing report...");
  const input = msg.body.slice(7)

  if (!input) return msg.reply(
    `${quote(global.tools.msg.generateInstruction(["send"], ["text"]))}\n` +
    quote(global.tools.msg.generateCommandExample('/lapor', "Cara laporan ke bot"))
  );

  try {
    const apiUrl = global.tools.api.createUrl("lenwy", "/ai4chat", {
      text: `Anda adalah chatbot yang menangani laporan masyarakat, anda dapat merespon dengan tindakan yang diperlukan dalam suatu kejadian, asumsikan anda juga sudah terhubung ke sistem lain yang dapat menangani kejadian yang dilaporkan (seperti yang membutuhkan pemadam kebakaran, kepolisian, atau rumah sakit), jawab dengan cukup singkat:` + input,
    });
    const {
      data
    } = await axios.get(apiUrl);

    msg.reply(data.data);
  } catch (error) {
    if (error.status !== 200) return msg.reply(global.config.msg.error);
    console.log(`Terjadi kesalahan: ${error.message}`);
  }
}

module.exports = {
  processReport
}