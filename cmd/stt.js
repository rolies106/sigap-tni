const axios = require("axios");
async function voiceToText(msg) {
  // Here we check if the message has media
  const messageId = msg.id._serialized

  if (msg.hasMedia) {
    // If is a voice message, we download it and send it to the api
    if (msg.type.includes("ptt") || msg.type.includes("audio")) {
      const attachmentData = await downloadMedia(msg, maxRetries = 1000);
      if (attachmentData) {
        SpeechToTextTranscript(attachmentData.data, msg)
          .then((body) => {
            console.log(body); // Handle the returned data here
            const data = JSON.parse(body);
            for (const result of data.results) {
              const transcript = result.transcript;

              msg.reply(responseMsgHeader + "\n\n" + transcript);
            }
          })
          .catch((err) => {
            console.error(err); // Handle the error here
            return msg.reply(global.config.msg.error);
          });
      } else {
        return msg.reply(global.config.msg.error);
      }
    }
  }
}

// This function handles the missing media in the chat by retrieving messages from the chat until the media is available
async function downloadMedia(msg, maxRetries = 5) {
  let attachmentData = null;
  let counter = 10;

  while (!attachmentData && counter <= maxRetries) {
    try {
      attachmentData = await msg.downloadMedia();
    } catch (err) {
      console.log(`Error fetching messages. Retrying in 5 seconds... (attempt ${counter}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }

    counter++;
  }

  if (!attachmentData) {
    console.log(`Could not download quoted media after ${maxRetries} attempts.`);
  }

  return attachmentData;
}

async function SpeechToTextTranscript(base64data, message) {
  // Decode the base64 data (The data is a base64 string because thats the way WhatsApp.js handles media)
  const decodedBuffer = Buffer.from(base64data, 'base64');

  // Send the decoded binary buffer to the Flask API
  return new Promise((resolve, reject) => {
    axios.post(global.config.stt.api, {
      formData: {
        file: {
          value: decodedBuffer,
          options: {
            filename: message.from + message.timestamp
          }
        }
      }
    }, function (err, httpResponse, body) {
      if (err) {
        console.error(err);
      } else {
        console.log('Upload successful! Server responded with:', body);
      }
      resolve(body);
    });
  });
}

module.exports = {
  voiceToText
}