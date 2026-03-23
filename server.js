//imports
var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router;
const {swaggerUi, swaggerSpec} = require('./swagger');

// instantiate server
var server = express();

//body-parser configure
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Swagger UI
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// configure routes
server.get('/', function(req, res) {
	res.setHeader('Content-Type', 'text/html');
	res.status(200).send('<h1>Lancement du serveur de gestion des articles</h1>' +
						 '<p><a href="/api-docs">📖 Documentation Swagger</a></p>'
	);
});

server.use('/api/' ,apiRouter);

//Launch server
server.listen(8080, function() {
	console.log('Server lancer sur le port 8080');
	console.log('Documentation Swagger : http://localhost:8080/api-docs');
});
