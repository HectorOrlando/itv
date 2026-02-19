// Adaptador de scraping usando Puppeteer
const puppeteer = require('puppeteer');
const Appointment = require('../../domain/appointment');
const config = require('../config/env-config');

const scraper = {
  async getAppointments() {
    const browser = await puppeteer.launch({ headless: config.HEADLESS });
    const page = await browser.newPage();
    await page.goto(config.TARGET_URL, { waitUntil: 'networkidle2' });

    // Primer clic: aceptar cookies
    try {
      await page.waitForSelector('.barracookies .ok', { timeout: 5000 });
      await page.click('.barracookies .ok');
      console.log('Cookies aceptadas');
    } catch (e) {
      console.warn('No se encontró el banner de cookies o ya fue aceptado');
    }

    // TODO: aquí irán los siguientes clics y lógica de scraping

    // Simulación:
    const citas = [new Appointment('2026-02-19', false)];
    if (!config.HEADLESS) await new Promise(r => setTimeout(r, 10000));
    await browser.close();
    return citas;
  }
};

module.exports = scraper;
