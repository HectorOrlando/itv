// Adaptador de configuración desde .env
require('dotenv').config();

module.exports = {
  TARGET_URL: process.env.TARGET_URL,
  HEADLESS: process.env.HEADLESS === 'true',
  GMAIL_USER: process.env.GMAIL_USER,
  GMAIL_PASS: process.env.GMAIL_PASS,
  EMAIL_TO: process.env.EMAIL_TO,
};
