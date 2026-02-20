// Adaptador de scraping usando Puppeteer
const puppeteer = require('puppeteer');
const Appointment = require('../../domain/appointment');
const config = require('../config/env-config');

const scraper = {
  async getAppointments() {
    const browser = await puppeteer.launch({
      headless: config.HEADLESS,
      args: ['--start-maximized']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(config.TARGET_URL, { waitUntil: 'networkidle2' });

    // Primer clic: aceptar cookies
    try {
      await page.waitForSelector('.barracookies .ok', { timeout: 5000 });
      await page.click('.barracookies .ok');
      console.log('Cookies aceptadas');
    } catch (e) {
      console.warn('No se encontró el banner de cookies o ya fue aceptado');
    }


    // Segundo clic: botón PEDIR CITA PREVIA
    try {
      await page.waitForSelector('.b-citaprevia button', { timeout: 5000 });
      await page.click('.b-citaprevia button');
      console.log('Botón PEDIR CITA PREVIA pulsado');
    } catch (e) {
      console.warn('No se encontró el botón PEDIR CITA PREVIA');
    }


    // Tercer clic: seleccionar Valencia (span)
    try {
      await page.waitForSelector('.appo-zone__item.Valencia .text-group', { timeout: 5000 });
      await page.click('.appo-zone__item.Valencia .text-group');
      console.log('Span Valencia pulsado');
      await new Promise(r => setTimeout(r, 3000));
    } catch (e) {
      console.warn('No se encontró el span de Valencia');
    }


    // Cuarto clic: seleccionar Gandia (botón Siguiente)
    try {
      await page.waitForSelector('label[for="store-17-0"] .appo-btn-station svg', { timeout: 5000 });
      await page.click('label[for="store-17-0"] .appo-btn-station svg');
      console.log('SVG Siguiente Gandia pulsado');
      await new Promise(r => setTimeout(r, 3000));
    } catch (e) {
      console.warn('No se encontró el SVG del botón de Gandia');
    }

    // TODO: aquí irán los siguientes clics y lógica de scraping

    // Quinto clic: seleccionar Turismo
    try {
      await page.waitForSelector('#cat-81 .text-service', { timeout: 5000 });
      await page.click('#cat-81 .text-service');
      console.log('Span Turismo pulsado');
      await page.waitForTimeout(2000);
    } catch (e) {
      console.warn('No se encontró el span de Turismo');
    }

    // Simulación:
    const citas = [new Appointment('2026-02-19', false)];
    if (!config.HEADLESS) await new Promise(r => setTimeout(r, 3000));
    await browser.close();
    return citas;
  }
};

module.exports = scraper;
