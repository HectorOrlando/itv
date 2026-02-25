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

    // --- Configuración dinámica de pasos por estación ---
    const estaciones = {
      GANDIA: {
        estacionSelector: 'label[for="store-17-0"] .appo-btn-station svg',
        servicioSelector: '#cat-81 .text-service',
        tipoSelector: '#ser-260',
        logs: {
          estacion: 'Gandia: botón pulsado',
          servicio: 'Gandia: botón Turismo pulsado',
          tipo: 'Gandia: Botón: opción Turismo gasolina/híbrido gasolina pulsada',
        },
        warn: {
          estacion: 'Gandia: No se encontró el botón de Gandia',
          servicio: 'Gandia: No se encontró el botón de Turismo',
          tipo: 'Gandia: No se encontró el botón: opción Turismo gasolina/híbrido gasolina',
        }
      },
      UTIEL: {
        estacionSelector: 'label[for="store-24-0"] .appo-btn-station svg',
        servicioSelector: '#cat-116 .text-service',
        tipoSelector: '#ser-372',
        logs: {
          estacion: 'Utiel: botón pulsado',
          servicio: 'Utiel: botón Turismo pulsado',
          tipo: 'Utiel: Botón: opción Turismo gasolina/híbrido gasolina pulsada',
        },
        warn: {
          estacion: 'Utiel: No se encontró el botón de Utiel',
          servicio: 'Utiel: No se encontró el botón de Turismo',
          tipo: 'Utiel: No se encontró el botón: opción Turismo gasolina/híbrido gasolina',
        }
      }
    };

    const estacion = estaciones[(config.STATION || 'GANDIA').toUpperCase()];
    if (!estacion) throw new Error('Estación no soportada: ' + config.STATION);

    // Primer clic: aceptar cookies
    try {
      await page.waitForSelector('.barracookies .ok', { timeout: 5000 });
      await page.click('.barracookies .ok');
      console.log('Cookies aceptadas');
      await new Promise(r => setTimeout(r, 1000));
    } catch (e) {
      console.warn('No se encontró el banner de cookies o ya fue aceptado');
    }

    // Segundo clic: botón PEDIR CITA PREVIA
    try {
      await page.waitForSelector('.b-citaprevia button', { timeout: 5000 });
      await page.click('.b-citaprevia button');
      console.log('Botón PEDIR CITA PREVIA pulsado');
      await new Promise(r => setTimeout(r, 2000));
    } catch (e) {
      console.warn('No se encontró el botón PEDIR CITA PREVIA');
    }

    // Tercer clic: Elige tu Provincia: seleccionar Valencia (span)
    try {
      await page.waitForSelector('.appo-zone__item.Valencia .text-group', { timeout: 5000 });
      await page.click('.appo-zone__item.Valencia .text-group');
      console.log('Valencia botón, pulsado');
      await new Promise(r => setTimeout(r, 3000));
    } catch (e) {
      console.warn('Valencia: No se encontró el botón de Valencia');
    }

    // Cuarto clic: Elige Estación (dinámico)
    try {
      await page.waitForSelector(estacion.estacionSelector, { timeout: 5000 });
      await page.click(estacion.estacionSelector);
      console.log(estacion.logs.estacion);
      await new Promise(r => setTimeout(r, 3000));
    } catch (e) {
      console.warn(estacion.warn.estacion);
    }

    // Quinto clic: Elige Servicio (dinámico)
    try {
      await page.waitForSelector(estacion.servicioSelector, { timeout: 5000 });
      await page.click(estacion.servicioSelector);
      console.log(estacion.logs.servicio);
      await new Promise(r => setTimeout(r, 3000));
    } catch (e) {
      console.warn(estacion.warn.servicio);
    }

    // Sexto clic: Seleccionar tipo (dinámico)
    try {
      await page.waitForSelector(estacion.tipoSelector, { timeout: 5000 });
      await page.click(estacion.tipoSelector);
      console.log(estacion.logs.tipo);
      await new Promise(r => setTimeout(r, 6000));
    } catch (e) {
      console.warn(estacion.warn.tipo);
    }

    // Simulación:
    const citas = [new Appointment('2026-02-19', false)];
    if (!config.HEADLESS) await new Promise(r => setTimeout(r, 3000));
    await browser.close();
    return citas;
  }
};

module.exports = scraper;
