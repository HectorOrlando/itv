## Automatización de búsqueda de citas con Puppeteer

### Requisitos
- Node.js >= 16
- npm

### Instalación
1. Clona el repositorio y entra en la carpeta del proyecto.
2. Instala las dependencias:
	```
	npm install
	```
3. Copia el archivo `.env.example` a `.env` y edítalo con tus datos:
	```
	cp .env.example .env
	# Edita .env con tu URL, email y credenciales
	```

### Uso en modo visual (desarrollo)
1. Asegúrate de que `HEADLESS=false` en tu `.env`.
2. Ejecuta:
	```
	node src/calendar-checker.js
	```
3. Ajusta los selectores y lógica en el script según la web objetivo.

### Uso en modo headless (producción)
1. Cambia `HEADLESS=true` en tu `.env`.
2. Ejecuta manualmente o configura un cron en tu servidor:
	```
	node src/calendar-checker.js
	```

### Configuración de cron (ejemplo)
```
*/5 * * * * cd /ruta/al/proyecto && /usr/bin/node src/calendar-checker.js >> logs/cron.log 2>&1
```

### Notas
- El script enviará un email si detecta citas disponibles.
- Asegúrate de usar una contraseña de aplicación de Gmail para mayor seguridad.
- Si usas Raspberry Pi, instala las dependencias de Chromium necesarias para Puppeteer.

---
Para dudas o mejoras, abre un issue o contacta al autor.