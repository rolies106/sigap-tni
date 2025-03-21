require("../config.js");

const { fakerID_ID } = require('@faker-js/faker');

const faker = fakerID_ID;

async function generateMessages(num) {
  const pool = global.tools.mysql.connect();

  for (let i = 0; i < num; i++) {
    const phoneNumber = faker.phone.number();
    const cmd = '/lapor';
    const contentType = 'chat';
    const rawRequest = '/lapor ' + faker.lorem.sentence();
    const createdAt = faker.date.between({ from: '2025-02-01', to: '2025-02-28', format: 'YYYY-MM-DD' });
    const deviceType = faker.helpers.arrayElement(['android', 'ios']);
    const content = faker.lorem.sentence();
    const reportType = faker.helpers.arrayElement(['pemadam kebakaran', 'kepolisian', 'rumah sakit']);
    const reportLocation = faker.helpers.arrayElement(["Cempaka Putih",
      "Gambir",
      "Kemayoran",
      "Menteng",
      "Sawah Besar",
      "Senen",
      "Tanah Abang",
      "Tebet",
      "Cilincing",
      "Kelapa Gading",
      "Koja",
      "Murus",
      "Pademangan",
      "Penjaringan",
      "Tanjung Priok",
      "Cengkareng",
      "Grogol Petamburan",
      "Kebon Jeruk",
      "Kembangan",
      "Palmerah",
      "Taman Sari",
      "Tambora",
      "Sawah Lunto",
      "Cilandak",
      "Jagakarsa",
      "Kebayoran Baru",
      "Kebayoran Lama",
      "Mampang Prapatan",
      "Pasar Minggu",
      "Pondok Indah",
      "Tebet",
      "Cakung",
      "Duren Sawit",
      "Jatinegara",
      "Kramat Jati",
      "Makasar",
      "Matraman",
      "Pulo Gadung",
      "Pulogadung",
      "Setiabudi",
      "Sunter",
    ]);
    const category = faker.helpers.arrayElement(["Pemadam Kebakaran", "Kepolisian", "Rumah Sakit", "PUPR", "Dinas Perhubungan"]);
    const status = faker.helpers.arrayElement(["baru", "dikerahkan", "menunggu", "selesai"]);
    const severity = faker.helpers.arrayElement(["tinggi", "sedang", "rendah"]);

    await pool.query(`
      INSERT INTO report (
        phone_number, device_type, cmd, content_type, raw_request, response, report_type, report_location, category, status, severity, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
      phoneNumber,
      deviceType,
      cmd,
      contentType,
      rawRequest,
      content,
      reportType,
      reportLocation,
      category,
      status,
      severity,
      createdAt
    ]);
  }

  console.log('Selesai');
  process.exit();
};

module.exports = {
  generateMessages,
};