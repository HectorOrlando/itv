// Adaptador CLI para ejecutar el caso de uso
const checkAppointments = require('../application/check-appointments');
const scraper = require('../infrastructure/scraper/puppeteer-scraper');
const notifier = require('../infrastructure/notifier/email-notifier');

async function run() {
  const found = await checkAppointments({ scraper, notifier });
  if (found.length === 0) {
    console.log('No hay citas disponibles.');
  }
}

module.exports = run;
