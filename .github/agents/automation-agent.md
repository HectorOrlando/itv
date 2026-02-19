
# Agent Experto en Puppeteer y Nodemailer

## Contexto
Este agente está diseñado para tareas avanzadas de automatización y notificación, alineado con la **arquitectura hexagonal** y los principios **SOLID** del proyecto. Utiliza Puppeteer (`^24.37.5`) y Nodemailer (`^8.0.1`).

> **Nota:** Este Agent es un recurso avanzado y complementario, no sustituye a los adaptadores hexagonales, sino que los potencia para pruebas, utilidades y flujos complejos.

---

## Propósito
- Facilitar pruebas, scraping avanzado y utilidades de automatización/notificación.
- Permitir experimentar o extender funcionalidades sin acoplarse al dominio ni a los adaptadores de infraestructura.
- Servir como base para pruebas E2E, prototipos o tareas de mantenimiento.

---

## Ejemplo de Clase Agent

```js
// agents/puppeteer-automation-agent.js
const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');

class AutomationAgent {
	constructor({ headless = true, emailConfig = {} } = {}) {
		this.headless = headless;
		this.emailConfig = emailConfig;
		this.browser = null;
		this.page = null;
	}

	async launchBrowser() {
		this.browser = await puppeteer.launch({ headless: this.headless });
		this.page = await this.browser.newPage();
		return this.page;
	}

	async goto(url) {
		if (!this.page) throw new Error('Browser not launched');
		await this.page.goto(url, { waitUntil: 'networkidle2' });
	}

	async click(selector, opts = {}) {
		await this.page.waitForSelector(selector, opts);
		await this.page.click(selector);
	}

	async type(selector, text, opts = {}) {
		await this.page.waitForSelector(selector, opts);
		await this.page.type(selector, text);
	}

	async getText(selector, opts = {}) {
		await this.page.waitForSelector(selector, opts);
		return this.page.$eval(selector, el => el.textContent);
	}

	async sendEmail({ to, subject, text }) {
		const transporter = nodemailer.createTransport(this.emailConfig);
		await transporter.sendMail({ from: this.emailConfig.auth.user, to, subject, text });
	}

	async close() {
		if (this.browser) await this.browser.close();
	}
}

module.exports = AutomationAgent;
```

---

## Ejemplo de Uso

```js
const AutomationAgent = require('./agents/puppeteer-automation-agent');

(async () => {
	const agent = new AutomationAgent({
		headless: false,
		emailConfig: {
			service: 'gmail',
			auth: { user: 'tu_email@gmail.com', pass: 'tu_app_password' }
		}
	});
	await agent.launchBrowser();
	await agent.goto('https://sitval.com/');
	await agent.click('.barracookies .ok');
	await agent.click('.b-citaprevia button');
	// ...otros pasos...
	// await agent.sendEmail({ to: 'destinatario@gmail.com', subject: 'Test', text: '¡Funciona!' });
	await agent.close();
})();
```

---

## Buenas Prácticas y Extensión
- Mantén el Agent desacoplado del dominio y los adaptadores hexagonales.
- Usa inyección de dependencias para facilitar pruebas y mocks.
- Extiende la clase para nuevos flujos o adaptadores (por ejemplo, notificación por Telegram).
- Úsalo para pruebas E2E, prototipos o tareas de mantenimiento sin romper la arquitectura principal.

---

## Verificación
- El Agent puede usarse sin modificar el dominio ni los adaptadores principales.
- Es fácil de extender y mantener.
- Está alineado con la arquitectura y principios del proyecto.
