var express = require('express');
var userController = require('./routes/usersController');
var swaggerUi = require('swagger-ui-express');
// var swaggerJsDoc = require('swagger-jsdoc');
var swaggerDocument = require('./swagger.json');
// Router
exports.router = ((req, res) => {
    var apiRouter = express.Router();

    //Users routes
    apiRouter.use('/api/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    apiRouter.route('/users/register').post(userController.register);
    apiRouter.route('/users/login').post(userController.login);
    return apiRouter;
})();