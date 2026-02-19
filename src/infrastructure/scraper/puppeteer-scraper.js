// Adaptador de scraping usando Puppeteer
const puppeteer = require('puppeteer');
const Appointment = require('../../domain/appointment');
const config = require('../config/env-config');

const scraper = {
  async getAppointments() {
    const browser = await puppeteer.launch({ headless: config.HEADLESS });
    const page = await browser.newPage();
    await page.goto(config.TARGET_URL, { waitUntil: 'networkidle2' });
    // TODO: lógica de scraping real
    // Simulación:
    const citas = [new Appointment('2026-02-19', false)];
    if (!config.HEADLESS) await new Promise(r => setTimeout(r, 10000));
    await browser.close();
    return citas;
  }
};

module.exports = scraper;
