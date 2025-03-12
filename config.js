const pkg = require("./package.json");

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
    token: "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJPUS0zSDdBWTB0NTRtNzNnSGVtM0dBdFBrdWRZRVZqOGo5Tk9mWjA1cDN3In0.eyJleHAiOjE3NDQwOTE4NzAsImlhdCI6MTc0MTQ5OTg3MCwianRpIjoiOWQ5NTE5ZWYtNmY0MC00MmJhLTk0ZWQtZjJjOTI0YjcxMTdkIiwiaXNzIjoiaHR0cHM6Ly9zc28uZGlrdGUuaW4vcmVhbG1zL0Rpa3RlaW5Db25zb2xlIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjhkY2NjMThmLWFkNTEtNGU0NS04MTY5LTllMmY1OTlhYzVjMyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImRpa3RlaW4tY3JlZGl0cyIsInNlc3Npb25fc3RhdGUiOiJlMWE4M2VjNS02ODM4LTRkNzEtYWViNy1hMmFjNjMzYWY0MDIiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLWJhaGFzYWtpdGFjb25zb2xlIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwic2lkIjoiZTFhODNlYzUtNjgzOC00ZDcxLWFlYjctYTJhYzYzM2FmNDAyIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJSb2xpZXMgRGVieSIsInByZWZlcnJlZF91c2VybmFtZSI6InJvbGllc0Bjdi10ZWNoLmlkIiwiZ2l2ZW5fbmFtZSI6IlJvbGllcyIsImZhbWlseV9uYW1lIjoiRGVieSIsImVtYWlsIjoicm9saWVzQGN2LXRlY2guaWQifQ.BeMHhlBFdgFLSdgjVviPfeDrjSsWuW8qhR-4uHqChxChVYKYPUFBMjBmFMpb2BzkJHfDgHCP_VFsTzCYWC2R8YwOMjXKO0CgQ_WlMt6dHM9iUSBjE6pZAr8pGZUjvHZagcVYIDg8a6U9XFakvOwBTE3y7izRNAe-w-mbmw33QFT2K3x3Sgb8sRXskVuYvX3_4AxdXBkqdevJUNTUskZiMyuMf9tEggqpEzKMWTFEeOLxrpQv-mOhy4xHD5fFG6g0dv6SAEsqA98pqP3pxFCZ4X-TlUBYUWmAcZ6oScsLuK7aZ9k8pGFpwzAAZUx7D8WyFkAB2xlycMp19aHI2QvBUQ",
    api: "http://api.dikte.in"
  },

  openrouter: {
    token: "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",
    api: "https://openrouter.ai"
  },

  openai: {
    token: "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",
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
  mongodb: require('./tools/mongodb.js')
}