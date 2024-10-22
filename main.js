require("./config.js");

// Commands
const ai = require("./cmd/ai.js");
const report = require("./cmd/report.js");

const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client();

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
    console.log('MESSAGE RECEIVED');

    // check if the message is "ping"
    if (msg.body == '/ping') {
        msg.reply('pong');

    } else if (msg.body.startsWith('/lapor ')) {
        report.processReport(msg);
    } else if (msg.body.startsWith('/ai ')) {
        ai.chatgpt(msg);
    }
});

client.initialize();
