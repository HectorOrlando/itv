// Módulo para envío de emails usando nodemailer
require('dotenv').config();
const nodemailer = require('nodemailer');

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;
const EMAIL_TO = process.env.EMAIL_TO;

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: GMAIL_USER,
		pass: GMAIL_PASS,
	},
});

async function sendEmail(subject, text) {
	if (!GMAIL_USER || !GMAIL_PASS || !EMAIL_TO) {
		console.error('Faltan variables de entorno para el email');
		return;
	}
	const mailOptions = {
		from: GMAIL_USER,
		to: EMAIL_TO,
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

module.exports = sendEmail;
