//imports
var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router;

// instantiate server
var server = express();

//body-parser configure
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
// configure routes
server.get('/', function(req, res) {
	res.setHeader('Content-Type', 'text/html');
	res.status(200).send('<h1>Lancement du serveur de gestion des articles</h1>');
});

server.use('/api/' ,apiRouter);

//Launch server
server.listen(8080, function() {
	console.log('Server lancer sur le port 8080');
});
