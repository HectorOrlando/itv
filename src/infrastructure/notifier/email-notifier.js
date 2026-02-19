// Adaptador de notificación por email
const nodemailer = require('nodemailer');
const config = require('../config/env-config');

const notifier = {
  async notify(subject, text) {
    if (!config.GMAIL_USER || !config.GMAIL_PASS || !config.EMAIL_TO) {
      console.error('Faltan variables de entorno para el email');
      return;
    }
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.GMAIL_USER,
        pass: config.GMAIL_PASS,
      },
    });
    const mailOptions = {
      from: config.GMAIL_USER,
      to: config.EMAIL_TO,
      subject,
      text,
    };
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email enviado correctamente');
    } catch (err) {
      console.error('Error enviando email:', err);
    }
  }
};

module.exports = notifier;
