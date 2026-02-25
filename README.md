## Automatización de búsqueda de citas con Puppeteer


### Código principal de scraping
El código de scraping se encuentra en: `src/infrastructure/scraper/puppeteer-scraper.js`

### Arquitectura
El proyecto está basado en **arquitectura hexagonal** (Ports & Adapters) y principios **SOLID** para máxima escalabilidad y mantenibilidad.

**Estructura de carpetas:**
```
src/
  application/         # Casos de uso (lógica de negocio)
  domain/              # Entidades y lógica pura
  infrastructure/      # Adaptadores externos (scraper, notificador, config)
	 scraper/
	 notifier/
	 config/
  interfaces/          # Adaptadores de entrada (CLI, HTTP, etc.)
  index.js             # Punto de entrada principal
```

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
	node src/index.js
	```
3. Ajusta los selectores y lógica en `src/infrastructure/scraper/puppeteer-scraper.js` según la web objetivo.

### Selección de estación (GANDIA o UTIEL)
Puedes elegir la estación sobre la que buscar cita configurando la variable `STATION` en tu archivo `.env`:

```
STATION=GANDIA
```
o
```
STATION=UTIEL
```

El scraper ejecutará automáticamente los pasos correspondientes a la estación seleccionada. No es necesario modificar el código fuente.

> **Recuerda:** Antes de ejecutar el scraper, revisa y ajusta la variable:
> 
> ```
> # Selección de estación (GANDIA o UTIEL)
> STATION=GANDIA
> ```
> Cambia `GANDIA` por `UTIEL` si quieres buscar en la otra estación.

### Uso en modo headless (producción)
1. Cambia `HEADLESS=true` en tu `.env`.
2. Ejecuta manualmente o configura un cron en tu servidor:
	```
	node src/index.js
	```

### Configuración de cron (ejemplo)
```
*/5 * * * * cd /ruta/al/proyecto && /usr/bin/node src/index.js >> logs/cron.log 2>&1
```

### Notas
- El sistema enviará un email si detecta citas disponibles.
- Asegúrate de usar una contraseña de aplicación de Gmail para mayor seguridad.
- Si usas Raspberry Pi, instala las dependencias de Chromium necesarias para Puppeteer.
- Puedes extender el sistema agregando nuevos adaptadores (por ejemplo, notificación por Telegram, otro scraper, etc.)

---
Para dudas o mejoras, abre un issue o contacta al autor.