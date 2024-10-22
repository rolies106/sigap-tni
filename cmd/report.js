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
            text: "Jadikan laporan bullet poin: " + input,
            prompt: `Bot ${global.config.bot.name} ini dapat menerima laporan anda.` // Dapat diubah sesuai keinginan Anda
        });
        const {
            data
        } = await axios.get(apiUrl);

        msg.reply(data.response);
    } catch (error) {
        if (error.status !== 200) return msg.reply(global.config.msg.error);
        console.log(`Terjadi kesalahan: ${error.message}`);
    }
}

module.exports = {
    processReport
}