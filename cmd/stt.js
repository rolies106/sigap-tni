const axios = require("axios");
const openai = require("openai");

let textInput = '';//body[0].text

async function voiceToText(msg) {
  // Here we check if the message has media
  const messageId = msg.id.id
  const chatgpt = new openai({
    apiKey: global.config.openai.token,
  });

  if (msg.hasMedia) {
    // If is a voice message, we download it and send it to the api
    if (msg.type.includes("ptt") || msg.type.includes("audio", "ptt")) {
      const attachmentData = await downloadMessageMedia(msg, maxRetries = 1000);
      if (attachmentData) {
        SpeechToTextTranscript(attachmentData.data, msg)
          .then(async (body) => {
            // Update header text
            body.forEach(myFunction);

            console.log(body);
            console.log(textInput);
            try {
              const data = await chatgpt.chat.completions.create({
                messages: [
                  {
                    "role": "developer",
                    "content": [
                      {
                        "type": "text",
                        "text": `Anda adalah chatbot yang menangani laporan masyarakat, 
              anda dapat merespon dengan tindakan yang diperlukan dalam suatu kejadian, 
              asumsikan anda juga sudah terhubung ke sistem lain yang dapat menangani kejadian 
              yang dilaporkan (seperti yang membutuhkan pemadam kebakaran, kepolisian, atau rumah sakit)`
                      }
                    ]
                  },
                  {
                    "role": "user",
                    "content": [
                      {
                        "type": "text",
                        "text": textInput
                      }
                    ]
                  }
                ],
                model: "gpt-4o-mini",
                store: true,
              });

              msg.reply(data.choices[0].message.content);
              msg.reply("Hasil transcribe:\n\n" + textInput);
            } catch (error) {
              if (error.status !== 200) return msg.reply(global.config.msg.error);
              console.log(`Terjadi kesalahan: ${error.message}`);
            }
          })
          .catch((err) => {
            console.error(err); // Handle the error here
            console.log(err.response.data)
            return msg.reply(global.config.msg.error);
          });
      } else {
        return msg.reply(global.config.msg.error);
      }
    }
  }
}

function myFunction(item) {
  textInput += item.text + " ";
}

// This function handles the missing media in the chat by retrieving messages from the chat until the media is available
async function downloadMessageMedia(msg, maxRetries = 5) {
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

  // Create the form data
  const form = new FormData();
  const fileBuffer = new File([decodedBuffer], message.id.id + "-stt.ptt;type=audio/x-wav");

  form.append(
    "file", // audio_file
    fileBuffer
  );

  form.append(
    "source_language", 'id'
  );
  form.append(
    "target_language", 'id'
  );
  form.append(
    "resume", true
  );

  // Send the audio to Dikte.in
  const apiUrl = global.tools.api.createUrl("diktein", "/v2/prod/stt/async/upload", {});
  const {
    data
  } = await axios.postForm(apiUrl, form, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": "Bearer " + global.config.diktein.token
    }
  }).then((body) => {
    return body
  });

  if (data.bk.data.uuid != null) {
    while (true) {
      const result = await getDikteinResult(data.bk.data.uuid);

      if (result.bk.message_status === "success") {
        return result.bk.data.transcripts;
        break;
      }

      await new Promise(resolve => setTimeout(resolve, 5000));
      // await setTimeout(5000);
    }
  }

  return null;
}

async function getDikteinResult(uuid) {
  // Send the audio to Dikte.in
  const apiUrl = global.tools.api.createUrl("diktein", "/v2/prod/stt/async/content/" + uuid, {

  });
  const {
    data
  } = await axios.get(apiUrl, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + global.config.diktein.token
    }
  }).then((body) => {
    return body
  });

  return data;
}

module.exports = {
  voiceToText
}