const mongoose = require("mongoose");
// const messageSchema = require('../schema/messages.js');
// import Message from './schema/messages.js';

mongoose.connect("mongodb://user:password@127.0.0.1/clarium?retryWrites=true&w=majority")

const { Schema } = mongoose;

const messageSchema = new Schema({
  phoneNumber: String,
  senderName: String,
  cmd: String, // tni, lapor, stt, ping, location
  contentType: String, // chat, audio, document, etc
  rawRequest: String,
  deviceType: String,
  response: {
    content: String,
    reportType: String,
    reportLocation: String,
    category: String,
    status: String,
    severity: String,
  },
  keyPoints: String,
  actionPlan: String,
  location: {
    long: String,
    lat: String,
    city: String,
    province: String,
  },
  transcribe: String,
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

async function insertLapor(msg, response) {
  console.log(response.message.content);
  const responseDecode = JSON.parse(response.message.content);

  try {
    const lapor = new Message({
      phoneNumber: msg.from,
      deviceType: msg.deviceType,
      cmd: '/lapor',
      contentType: msg.type,
      rawRequest: msg.body,
      response: {
        content: responseDecode.response_user,
        reportType: responseDecode.tindakan.jenis,
        reportLocation: responseDecode.tindakan.lokasi,
        category: responseDecode.tindakan.unit_ditugaskan,
        status: responseDecode.tindakan.status,
        severity: responseDecode.tingkat_keparahan,
      }
    });
    console.log(lapor);
    await lapor.save();

    const firstArticle = await Message.findOne({});
    console.log(firstArticle);
  } catch (error) {
    console.error(`[${global.config.pkg.name}] Error:`, error);
  }
}

module.exports = {
  insertLapor,
};