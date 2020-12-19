var express = require('express');
var userController = require('./routes/usersController');

// Router
exports.router = ((req, res) => {
    var apiRouter = express.Router();

    //Users routes
    apiRouter.route('/users/register/').post(userController.register);
    apiRouter.route('/users/login/').post(userController.login);
    return apiRouter;
})();