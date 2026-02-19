// Punto de entrada principal
const run = require('./interfaces/cli-runner');

run().catch(err => {
  console.error('Error en la ejecución:', err);
  process.exit(1);
});
