const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	he = require('he'),
	port = process.env.PORT || 3123;

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
	next();
});

app.get('/ping', (req, res, next) => {
	console.log('Pinged server to keep it alive.');
	res.sendStatus(200);
});


app.get("/embed", (req, res) => {
	const {title, message, image, hexColor} = req.query;

	res.redirect('https://twitter.com/search?q='+ req.query.message);
});

app.listen(port, function () {
	console.log('Webhook handler listening on port %s', port);
});