const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	he = require('he'),
	port = process.env.PORT || 3123;
const URL = '';
app.use(bodyParser.json());

app.get('/ping', (req, res, next) => {
	console.log('Pinged server to keep it alive.');
	res.sendStatus(200);
});



function generateEmbed(embed) {

	let title = '',
		metaTitle = '',
		metaDescription = '',
		metaImage = '',
		metaUrl = '',
		metaColor = '';
	if (embed.title) {
		title = `<title>${embed.title}</title>`;
		metaTitle = `<meta content="${embed.title}" property="og:title"></meta>`;
	}

	if (embed.message)  metaDescription = `<meta content="${embed.message}" property="og:description">`;
	
	if (embed.url) metaUrl = `<meta content="${embed.url}" property="og:url">`;

	if (embed.image) metaImage = `<meta content="${he.encode(embed.image)}" property="og:image">;</meta>`;

	if (embed.hexColor) metaColor = `<meta content="${he.encode(embed.hexColor)}" data-react-helmet="true" name="theme-color"> `;
	
	return `<!DOCTYPE html>
				<html>
					<head>
						${title}
						${metaTitle}
						${metaDescription}
						${metaUrl}
						${metaImage}
						${metaColor} 
					</head>
					<body></body>
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