//imports
var express = require('express');

// instantiate server
var server = express();

server.get('/', function(req, res) {
	res.setHeader('Content-Type', 'text/html');
	res.status(200).send('<h1>Lancement du serveur de gestion des articles</h1>');
});

//Launch server
server.listen(8080, function() {
	console.log('Server lancer sur le port 8080');
});
