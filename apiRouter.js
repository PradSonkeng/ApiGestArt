// Imports
var express = require('express');
var articlesCtrl = require('./routes/articlesCtrl');

// Router
exports.router = (function() {
    var apiRouter = express.Router();

    //articles routes
    apiRouter.route('/articles')
        .post(articlesCtrl.register)
        .get(articlesCtrl.getAll);

    apiRouter.route('/articles/:id')
        .get(articlesCtrl.getById);
    
    
    return apiRouter;
})();