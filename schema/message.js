const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.set("strictQuery", true);

function messageModel() {
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

  return Message;
}

module.exports = {
  messageModel
};
