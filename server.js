// imports
var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router
var swaggerUi = require('swagger-ui-express');
var swaggerJsDoc = require('swagger-jsdoc');
var swaggerDocument = require('./swagger.json');

// Instantion de server
var server = express();

// Body Parser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// assigner le route
server.use(apiRouter);
//launcher server
server.listen(3000, () => {
    console.log('server running in port 3000');
})