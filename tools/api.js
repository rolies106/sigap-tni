// Daftar API gratis, gunakan dengan bijak!
const APIs = {
  agatz: {
    baseURL: "https://api.agatz.xyz"
  },
  aggelos_007: {
    baseURL: "https://api.aggelos-007.xyz"
  },
  chiwa: {
    baseURL: "https://api.chiwa.my.id"
  },
  firda: {
    baseURL: "https://api.firda.uz"
  },
  imphnen_ai: {
    baseURL: "https://imphnen-ai.vercel.app"
  },
  itzpire: {
    baseURL: "https://itzpire.com"
  },
  lenwy: {
    baseURL: "https://api-lenwy.vercel.app"
  },
  ryzendesu: {
    baseURL: "https://api.ryzendesu.vip"
  },
  whisper: {
    baseURL: "http://localhost:9000"
  },
  diktein: {
    baseURL: "https://api.dikte.in"
  },
  openrouter: {
    baseURL: "https://openrouter.ai"
  }
};

function createUrl(apiNameOrURL, endpoint, params = {}, apiKeyParamName) {
  try {
    const api = APIs[apiNameOrURL];

    if (!api) {
      const url = new URL(apiNameOrURL);
      apiNameOrURL = url;
    }

    const queryParams = new URLSearchParams(params);

    if (apiKeyParamName && api && "APIKey" in api) {
      queryParams.set(apiKeyParamName, api.APIKey);
    }

    const baseURL = api ? api.baseURL : apiNameOrURL.origin;
    const apiUrl = new URL(endpoint, baseURL);
    apiUrl.search = queryParams.toString();

    return apiUrl.toString();
  } catch (error) {
    console.error(`[${global.config.bot.name}] Error:`, error);
  }
}

function listUrl() {
  return APIs;
}

module.exports = {
  createUrl,
  listUrl
};