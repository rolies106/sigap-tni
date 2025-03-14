const mongoose = require("mongoose");

const { Schema } = mongoose;

async function connect() {
  try {
    mongoose.connect("mongodb://user:password@127.0.0.1/clarium?retryWrites=true&w=majority");
    console.log("connected to db");
  } catch (error) {
    console.error(error);
  }
}

async function insertLapor(msg, response) {
  const responseDecode = JSON.parse(response.message.content);
  const Message = global.schema.message.messageModel();

  try {
    // Connect to DB
    await connect();

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

    await lapor.save();
  } catch (error) {
    console.error(`[${global.config.bot.name}] Error:`, error);
  }
}

async function insertStt(msg, textInput, response) {
  const responseDecode = JSON.parse(response.message.content);
  const Message = global.schema.message.messageModel();

  try {
    // Connect to DB
    await connect();

    const lapor = new Message({
      phoneNumber: msg.from,
      deviceType: msg.deviceType,
      cmd: 'voice',
      contentType: msg.type,
      transcribe: textInput,
      rawRequest: textInput,
      response: {
        content: responseDecode.response_user,
        reportType: responseDecode.tindakan.jenis,
        reportLocation: responseDecode.tindakan.lokasi,
        category: responseDecode.tindakan.unit_ditugaskan,
        status: responseDecode.tindakan.status,
        severity: responseDecode.tingkat_keparahan,
      }
    });

    await lapor.save();
  } catch (error) {
    console.error(`[${global.config.bot.name}] Error:`, error);
  }
}

async function insertTni(msg, response) {
  const responseDecode = JSON.parse(response.message.content);
  const Message = global.schema.message.messageModel();

  try {
    // Connect to DB
    await connect();

    const lapor = new Message({
      phoneNumber: msg.from,
      deviceType: msg.deviceType,
      cmd: '/tni',
      contentType: msg.type,
      rawRequest: msg.body,
      keyPoints: response.data.key_points.join("\n"),
      actionPlan: response.data.action_plan.join("\n"),
    });

    await lapor.save();
  } catch (error) {
    console.error(`[${global.config.bot.name}] Error:`, error);
  }
}

module.exports = {
  insertLapor,
  insertStt,
  insertTni,
  connect,
};