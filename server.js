//imports
require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router;
const cors = require('cors');

// instantiate server
var server = express();

//body-parser configure
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// CORS configuration
server.use(cors({
	origin: '*', // Allow all origins
	methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
}));

// configure routes
server.get('/', (req, res) => {
	res.json({ status: 'ok', app: 'ApiGestArt', by: 'SKHP' });
});

server.use('/api/' ,apiRouter);

//Launch server
const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
	console.log(`Server lancer sur le port ${PORT}`);
});
