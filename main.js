require("./config.js");

// Commands
const ai = require("./cmd/ai.js");
const reportLenwy = require("./cmd/report_lenwy.js");
const reportGPT = require("./cmd/report_chatgpt.js");
const stt = require("./cmd/stt.js");
const summaryGPT = require("./cmd/summary_chatgpt.js");
const summaryDiktein = require("./cmd/summary_diktein.js");
const location = require("./cmd/location.js");

const { Client, LocalAuth, MessageTypes } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  }
});

let pairingCodeRequested = false;

client.on('qr', async (qr) => {
  // Generate and scan this code with your phone
  qrcode.generate(qr, { small: true });

  if (global.config.system.pairingCode && !pairingCodeRequested) {
    const pairingCode = await client.requestPairingCode('6285182143600'); // enter the target phone number
    console.log('Pairing code enabled, code: ' + pairingCode);
    pairingCodeRequested = true;
  }
});

client.on('authenticated', () => {
  console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
  // Fired if session restore was unsuccessful
  console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', async msg => {
  // Set as typing
  const chat = await msg.getChat();
  chat.sendSeen();
  chat.sendStateTyping();

  console.log('MESSAGE RECEIVED');
  console.log(msg.type + ': ' + msg.from);
  console.log(msg.type);
  console.log('----------------');

  console.log(msg);

  // check if the message is "ping"
  if (msg.body == '/ping') {
    msg.reply('pong');
  } else if (msg.body.startsWith('/report ')) {
    reportLenwy.processReport(msg);
  } else if (msg.body.startsWith('/tni ')) {
    summaryDiktein.processReport(msg);
  } else if (msg.body.startsWith('/lapor ')) {
    reportGPT.processReport(msg); // Database added
  } else if (msg.type == MessageTypes.VOICE) {
    stt.voiceToText(msg);  // Database added
  } else if (msg.type == MessageTypes.LOCATION) {
    location.processLocation(msg);
  } else if (msg.body.startsWith('/summary ')) {
    summaryGPT.processReport(msg);
  }
});

client.initialize();
