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

    apiRouter.route('/articles/search')
        .get(articlesCtrl.search);

    apiRouter.route('/articles/:id')
        .get(articlesCtrl.getById)
        .put(articlesCtrl.updateById)
        .delete(articlesCtrl.deleteById);
    
    
    return apiRouter;
})();