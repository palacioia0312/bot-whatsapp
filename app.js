const express = require('express');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const bodyParser = require('body-parser');


const app = express();
const client = new Client();


client.on('qr', (qr) => {
	qrcode.toDataURL(qr, (err, url) => {
		console.log(qr);
	});
});

client.on('authenticated', (session) => {
	console.log('Cliente autenticado');
});

client.initialize();


app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
	const { to, body } = req.body;

	client.sendMessage(to, body);

	res.sendStatus(200);
});


const port = 3000;
app.listen(port, () => {
	console.log(`Servidor Express iniciado en el puerto ${port}`);
});