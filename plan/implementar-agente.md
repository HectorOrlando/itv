## Plan: Crear un Agent Experto en Puppeteer y Nodemailer

Este plan describe cómo crear un Agent reutilizable y especializado para tareas avanzadas de automatización y notificación, alineado con la arquitectura hexagonal y principios SOLID del proyecto.

**TL;DR:**  
El Agent será un módulo independiente (por ejemplo, agents/automation-agent.md) que documenta y/o implementa una clase o conjunto de utilidades para facilitar pruebas, scraping avanzado y notificaciones, desacoplado del dominio y los adaptadores actuales. Permitirá extender o probar flujos complejos sin romper la estructura principal.

---

**Pasos**

1. **Definir el propósito del Agent**
   - Servirá como herramienta avanzada para pruebas, scraping, utilidades de automatización y notificación.
   - Permitirá experimentar o extender funcionalidades sin acoplarse al dominio ni a los adaptadores de infraestructura.

2. **Ubicación y formato**
   - El Agent se ubicará en la carpeta raíz agents/ como archivo Markdown (agents/automation-agent.md).
   - Incluirá: propósito, ejemplos de uso, convenciones, y (opcional) fragmentos de código reutilizables.

3. **Estructura recomendada del archivo**
   - Introducción y contexto (hexagonal, SOLID, versiones de Puppeteer y Nodemailer).
   - Ejemplo de clase Agent (con métodos para lanzar navegador, hacer clic, extraer datos, enviar emails).
   - Ejemplo de integración con los adaptadores existentes.
   - Buenas prácticas para mantener la separación de responsabilidades.

4. **Ejemplo de clase Agent**
   - Métodos: launchBrowser, goto, click, type, getText, sendEmail, close.
   - Uso de Puppeteer ^24.37.5 y Nodemailer ^8.0.1.
   - Inyección de dependencias para facilitar pruebas y mocks.

5. **Documentar cómo usar el Agent**
   - Cómo importar y utilizar el Agent en scripts de prueba o utilidades.
   - Ejemplo de flujo: abrir página, aceptar cookies, navegar, enviar email si se cumple una condición.

6. **Extensión y pruebas**
   - Cómo extender el Agent para nuevos flujos o adaptadores.
   - Cómo usar el Agent para pruebas de integración o E2E.

---

**Verificación**
- El Agent debe poder usarse sin modificar el dominio ni los adaptadores principales.
- Debe ser fácil de extender y mantener.
- Debe estar bien documentado y alineado con la arquitectura y principios del proyecto.

**Decisiones**
- El Agent será un recurso avanzado, no sustituye a los adaptadores hexagonales, sino que los complementa para pruebas y utilidades.
- Se prioriza la claridad, la separación de responsabilidades y la facilidad de pruebas.

