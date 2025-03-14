const pkg = require("./package.json");
const dotenv = require('dotenv');
dotenv.config();

// Bot
global.config = {
  bot: {
    name: "CVTECH",
    phoneNumber: "6285182143600",
    picture: {
      thumbnail: "https://e1.pxfuel.com/desktop-wallpaper/943/672/desktop-wallpaper-whatsapp-bot-what-is-it-and-how-to-use-messenger-chatbots-chatbot.jpg",
      profile: "https://i.ibb.co/3Fh9V6p/avatar-contact.png"
    }
  },

  stt: {
    model: "tiny",
    api: "http://localhost:9000"
  },

  diktein: {
    token: process.env.DIKTEIN_TOKEN,
    api: "http://api.dikte.in"
  },

  openai: {
    token: process.env.OPENAI_TOKEN,
    api: "https://"
  },

  // MSG (Pesan)
  msg: {
    // Proses perintah
    wait: "Tunggu sebentar...",
    notFound: "Tidak ada yang ditemukan!",
    error: "Gagal memproses perintah!",
    urlInvalid: "URL tidak valid!"
  },

  // Owner & CoOwner
  owner: {
    name: "CVTECH",
    number: "6285182143600",
    organization: "CVT"
  },

  // Sistem
  system: {
    autoRead: true,
    autoTypingOnCmd: true,
    cooldown: 5000,
    restrict: true, // Membatasi beberapa perintah yang akan mengakibatkan banned
    selfReply: true,
    timeZone: "Asia/Jakarta",
    useInteractiveMessage: true,
    usePairingCode: false
  }
};

global.tools = {
  api: require('./tools/api.js'),
  general: require('./tools/general.js'),
  msg: require('./tools/msg.js'),
  mongodb: require('./tools/mongodb.js'),
  mysql: require('./tools/mysql.js')
}

global.seed = {
  lapor: require('./seed/lapor.js'),
}

global.schema = {
  message: require('./schema/message.js'),
}