const axios = require("axios");
async function processReport(msg) {
  console.log("Processing report...");
  const input = msg.body.slice(5)

  if (!input || msg.body.length < 300) {
    return msg.reply("Minimal panjang laporan adalah 300 karakter");
  } else {
    TextSummerize(input)
      .then(async (body) => {
        console.log(body);

        await global.tools.mysql.insertTni(msg, body);

        msg.reply("Key Points:\n\n" + body.data.key_points.join("\n"));
        await new Promise(resolve => setTimeout(resolve, 5000));
        msg.reply("Saran Action Plan:\n\n" + body.data.action_plan.join("\n"));
        await new Promise(resolve => setTimeout(resolve, 5000));
        msg.reply("Laporan anda sudah diterima, mohon kirimkan lokasi anda untuk mengkonfirmasi laporan anda.\n\nTerimakasih");
      })
      .catch((err) => {
        console.error(err); // Handle the error here
        return msg.reply(global.config.msg.error);
      });
  }
}

async function TextSummerize(longText) {
  // Create the form data
  const form = new FormData();

  form.append(
    "text",
    longText
  );

  // Send the text to Dikte.in
  const apiUrl = global.tools.api.createUrl("diktein", "/v2/prod/text/async/resume", {});
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
        return result.bk;
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
  const apiUrl = global.tools.api.createUrl("diktein", "/v2/prod/text/async/resume/content/" + uuid, {

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
  processReport
}


