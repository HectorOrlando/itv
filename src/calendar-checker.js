// Script principal para automatización de calendario con Puppeteer
require('dotenv').config();
const puppeteer = require('puppeteer');
const sendEmail = require('./emailer');

const TARGET_URL = process.env.TARGET_URL;
const HEADLESS = process.env.HEADLESS === 'true';

async function main() {
	if (!TARGET_URL) {
		console.error('Falta TARGET_URL en .env');
		process.exit(1);
	}
	const browser = await puppeteer.launch({ headless: HEADLESS });
	const page = await browser.newPage();
	await page.goto(TARGET_URL, { waitUntil: 'networkidle2' });

	// Aquí va la lógica para interactuar con los selectores y navegar el calendario
	// Ejemplo:
	// await page.click('selector_del_select');
	// await page.waitForSelector('selector_del_calendario');
	// ...

	// Simulación: ¿Hay citas disponibles?
	const citasDisponibles = false; // Cambiar por lógica real

	if (citasDisponibles) {
		await sendEmail('¡Cita disponible!', 'Se ha encontrado una cita disponible.');
	} else {
		console.log('No hay citas disponibles.');
	}

	if (!HEADLESS) {
		// Esperar para ver el navegador en modo visual
		await new Promise(r => setTimeout(r, 10000));
	}
	await browser.close();
}

main().catch(err => {
	console.error('Error en el script:', err);
	process.exit(1);
});
