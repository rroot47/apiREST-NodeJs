// imports
var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router
var swaggerUi = require('swagger-ui-express');
var swaggerJsDoc = require('swagger-jsdoc');
const swaggerDocument = require('./swagger.json');
// Instantion de server
var server = express();

// Body Parser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

var swaggerDocs = swaggerJsDoc(swaggerDocument);
server.use('api', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// configuration desroutes
server.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour Toute le monde</h1>')
});

// assigner le route
server.use('/api/', apiRouter);
//launcher server
server.listen(3000, () => {
    console.log('server running in port 3000');
})