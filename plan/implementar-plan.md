Plan para instalar Puppeteer y automatizar búsqueda de citas

## Plan: Automatización de búsqueda de citas con Puppeteer

Este plan detalla cómo instalar y configurar Puppeteer en un proyecto Node.js para automatizar la búsqueda de citas en una web, primero en modo visual y luego en modo headless, con notificación por email y ejecución periódica en un Raspberry Pi 4 con Ubuntu Server.

**Pasos**
1. Crear un proyecto Node.js y estructura básica:
   - Inicializar con `npm init -y`
   - Estructura sugerida:  
     - src/calendar-checker.js (script principal)
     - src/emailer.js (envío de emails)
     - .env (variables de entorno)
     - README.md

2. Instalar dependencias:
   - `npm install puppeteer dotenv nodemailer`

3. Desarrollar el script principal:
   - Recibe la URL como argumento o desde `.env`
   - Lanza Puppeteer en modo visual (`headless: false`) para depuración
   - Permite cambiar a modo headless (`headless: true`) para producción
   - Interactúa con los selectores para navegar mes a mes en el calendario
   - Detecta si hay citas disponibles y, si es así, llama al módulo de email

4. Desarrollar el módulo de email:
   - Usa nodemailer y Gmail SMTP (credenciales en `.env`)
   - Envía aviso si hay citas disponibles

5. Configurar variables de entorno en `.env`:
   - URL objetivo, credenciales de Gmail, destinatario, modo visual/headless

6. Pruebas en modo visual:
   - Ejecutar manualmente y ajustar selectores/lógica

7. Pruebas en modo headless:
   - Verificar funcionamiento en Raspberry Pi 4 (instalar dependencias de Chromium si es necesario)
   - Probar ejecución manual y desde cron

8. Configurar cron en Raspberry Pi:
   - Ejecutar el script cada 5 minutos
   - Redirigir logs a un archivo para monitoreo

**Verificación**
- Ejecutar en modo visual y comprobar navegación y detección de citas
- Simular citas disponibles y verificar envío de email
- Probar en Raspberry Pi en modo headless y desde cron
- Revisar logs y recepción de emails

**Decisiones**
- Se usará `.env` para credenciales y configuración
- El flujo será primero visual para depuración y luego headless para producción
- Notificación por email usando Gmail SMTP

¿Quieres que detalle la estructura de los archivos o algún paso específico?