const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	he = require('he'),
	port = process.env.PORT || 3123;
const URL = '';



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



function generateEmbed(embed) {

	let title = 'Basic Title',
		metaTitle = 'Basic Title',
		metaDescription = '',
		metaImage = '',
		metaUrl = 'https://discord-embed-generator.herokuapp.com/',
		metaColor = '#00FFFF';

	if (embed.message)  metaDescription = embed.message;
	if (embed.image) metaImage = embed.image;

		return `<!DOCTYPE html>
				<html>
					<head>
						<title>${title}</title>
						<meta content="${metaTitle}" property="og:title">
						<meta property="og:type" content="website">
						<meta content="${metaUrl}" property="og:url">
						<meta content="${metaColor}" data-react-helmet="true" name="theme-color"> 
						<meta content="${metaDescription}" property="og:description">
						<meta content="${metaImage}" property="og:image">
					</head>
				</html>`;
}

app.get("/embed", (req, res) => {
	const {title, message, image, hexColor} = req.query;

	res.send(generateEmbed({
	  title,
	  message,
	  image,
	  URL,
	  hexColor
	}));
});

app.listen(port, function () {
	console.log('Webhook handler listening on port %s', port);
});