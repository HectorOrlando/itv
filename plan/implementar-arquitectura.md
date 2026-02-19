## Plan: Estructura Hexagonal y SOLID para Automatización de Citas

Este plan propone una estructura modular y escalable, basada en arquitectura hexagonal (Ports & Adapters) y principios SOLID, para tu proyecto de automatización con Puppeteer.

**TL;DR:**  
Separaremos la lógica de dominio (casos de uso) de las implementaciones técnicas (scraping, notificaciones, configuración). Así, podrás cambiar/adaptar cualquier parte sin afectar el núcleo del sistema, facilitando pruebas y escalabilidad.

---

**Estructura de carpetas propuesta**
```
/src
  /application         # Casos de uso (lógica de negocio)
    check-appointments.js
  /domain              # Entidades y lógica pura
    appointment.js
  /infrastructure      # Adaptadores externos (Puppeteer, email, config)
    /scraper
      puppeteer-scraper.js
    /notifier
      email-notifier.js
    /config
      env-config.js
  /interfaces          # Adaptadores de entrada (CLI, HTTP, etc.)
    cli-runner.js
  index.js             # Punto de entrada principal
```

---

**Pasos**

1. Crear `/domain/appointment.js`  
   - Define la entidad y reglas de negocio para una cita.

2. Crear `/application/check-appointments.js`  
   - Caso de uso: orquesta el scraping, verifica disponibilidad y notifica si hay citas.

3. Crear `/infrastructure/scraper/puppeteer-scraper.js`  
   - Implementa la interfaz de scraping usando Puppeteer.

4. Crear `/infrastructure/notifier/email-notifier.js`  
   - Implementa la interfaz de notificación usando nodemailer.

5. Crear `/infrastructure/config/env-config.js`  
   - Lee configuración desde .env y la expone al sistema.

6. Crear `/interfaces/cli-runner.js`  
   - Adaptador CLI: ejecuta el caso de uso desde la terminal.

7. Crear `index.js`  
   - Punto de entrada: inicializa dependencias y ejecuta el runner.

---

**Principios SOLID aplicados**
- S: Cada módulo tiene una única responsabilidad (scraping, notificación, dominio, etc.).
- O: Puedes agregar nuevos adaptadores (por ejemplo, SMS, otro scraper) sin modificar el núcleo.
- L: Los adaptadores cumplen contratos/interfaz esperada por el dominio.
- I: Interfaces claras entre dominio y adaptadores.
- D: El dominio depende de abstracciones, no de implementaciones concretas.

---

**Verificación**
- El sistema debe permitir cambiar el scraper, la notificación o la fuente de configuración sin modificar la lógica de negocio.
- Pruebas unitarias pueden hacerse sobre `/application` y `/domain` usando mocks de los adaptadores.
- El CLI debe funcionar igual si cambias la implementación de scraping o notificación.

---

