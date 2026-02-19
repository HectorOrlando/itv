// Caso de uso: orquesta scraping y notificación
async function checkAppointments({ scraper, notifier }) {
  const appointments = await scraper.getAppointments();
  const available = appointments.filter(a => a.available);
  if (available.length > 0) {
    await notifier.notify('¡Cita disponible!', `Fechas: ${available.map(a => a.date).join(', ')}`);
    return available;
  }
  return [];
}

module.exports = checkAppointments;
