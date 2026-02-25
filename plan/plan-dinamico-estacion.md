## Plan: Selector dinámico de estación (Gandia/Utiel) vía variable de entorno

Actualmente, el scraping está "hardcodeado" para Gandia y, si se quiere cambiar a Utiel, hay que comentar/descomentar manualmente bloques de código. El objetivo es parametrizar la estación (Gandia o Utiel) usando una variable de entorno, de modo que el scraper ejecute solo los pasos correspondientes a la estación seleccionada, sin necesidad de modificar el código fuente.

**Steps**
1. Añadir una nueva variable de entorno en el archivo .env (por ejemplo, STATION=GANDIA o STATION=UTIEL).
2. Modificar el archivo de configuración env-config.js para exponer la nueva variable STATION.
3. Refactorizar el método `getAppointments` en [src/infrastructure/scraper/puppeteer-scraper.js](src/infrastructure/scraper/puppeteer-scraper.js) para:
   - Definir un objeto de configuración por estación (Gandia/Utiel) con los selectores y pasos específicos.
   - Seleccionar dinámicamente el bloque de acciones según el valor de la variable de entorno STATION.
   - Eliminar los bloques comentados y el código duplicado, usando una estructura tipo "switch" o "mapa" para los pasos.
4. Documentar en el README.md el uso de la nueva variable de entorno y cómo cambiar de estación.

**Verification**
- Cambiar el valor de STATION en el archivo .env y ejecutar el scraper.
- Verificar que solo se ejecutan los pasos correspondientes a la estación seleccionada (Gandia o Utiel).
- Comprobar que no es necesario modificar el código fuente para cambiar de estación.
- Realizar pruebas manuales y/o unitarias para ambas estaciones.

**Decisions**
- Se usará una variable de entorno STATION para seleccionar la estación.
- Los selectores y pasos específicos de cada estación estarán centralizados en una estructura de configuración.
- El código será más mantenible y escalable para añadir nuevas estaciones en el futuro.