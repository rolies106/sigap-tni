const axios = require("axios");
async function chatgpt(msg) {
    console.log("Processing request ai...");
    const input = msg.body.slice(4)
    console.log(input);
    if (!input) return msg.reply(
        `${quote(global.tools.msg.generateInstruction(["send"], ["text"]))}\n` +
        quote(global.tools.msg.generateCommandExample(msg._used.prefix + msg._used.command, "apa itu whatsapp"))
    );

    try {
        const apiUrl = global.tools.api.createUrl("sandipbaruwal", "/gemini", {
            text: input,
            prompt: input, // Dapat diubah sesuai keinginan Anda
        });
        // const apiUrl = global.tools.api.createUrl("ryzendesu", "/api/ai/chatgpt", {
        //     text: input,
        //     prompt: `Anda adalah bot WhatsApp bernama ${global.config.bot.name} yang dimiliki oleh ${global.config.owner.name}. Jika nama Anda mirip dengan tokoh di media, sesuaikan kepribadian Anda dengan nama tersebut. Jika tidak, tetaplah ramah, informatif, dan responsif.` // Dapat diubah sesuai keinginan Anda
        // });
        const {
            data
        } = await axios.get(apiUrl);

        console.log(apiUrl);
        console.log(data);

        return msg.reply(data.answer);
    } catch (error) {
        console.error(`[${global.config.bot.name}] Error:`, error);
        if (error.status !== 200) return msg.reply(global.config.msg.notFound);
        return msg.reply(quote(`❎ Terjadi kesalahan: ${error.message}`));
    }
}

module.exports = {
    chatgpt
}