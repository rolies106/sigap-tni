async function voiceToText(msg) {
  // Here we check if the message has media
  const messageId = quotedMsg.id._serialized

  if (msg.hasMedia) {
    // If is a voice message, we download it and send it to the api
    if (msg.type.includes("ptt") || msg.type.includes("audio")) {
      const attachmentData = await downloadQuotedMedia(msg, messageId, chat, maxRetries = 1000);
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

async function SpeechToTextTranscript(base64data, message) {
  // Decode the base64 data (The data is a base64 string because thats the way WhatsApp.js handles media)
  const decodedBuffer = Buffer.from(base64data, 'base64');

  // Send the decoded binary buffer to the Flask API
  return new Promise((resolve, reject) => {
    request.post({
      // This url is the url of the Flask API that handles the transcription using Whisper
      url: global.config.stt.api,
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