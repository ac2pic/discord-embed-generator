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

function returnIfSet(prop, ifTrue) {
	return prop ? ifTrue : "";
}

function generateEmbed(embed) {
	let title = returnIfSet(embed.title, `<title>${he.encode(embed.title)}</title>`);
	let metaTitle = returnIfSet(embed.title, `<meta content="${he.encode(embed.title)}" property="og:title"></meta>`);
	let metaDescription = returnIfSet(embed.message, `<meta content="${he.encode(embed.message)}" property="og:description">`);
	let metaUrl = returnIfSet(embed.url, `<meta content="${he.encode(embed.url)}" property="og:url">`);
	let metaImage = returnIfSet(embed.image, `<meta content="${he.encode(embed.image)}" property="og:image">;</meta>`);
	let metaColor = returnIfSet(embed.hexColor, `<meta content="${he.encode(embed.hexColor)}" data-react-helmet="true" name="theme-color"> `);
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
	const {title, message, image, siteName, hexColor} = req.query;

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