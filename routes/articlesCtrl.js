// Imports
const { where } = require('sequelize');
var models = require('../models');
var asyncLib = require('async');

//modules exports
module.exports = {
    //register articles
    register:function(req,res){

        //Params
        var titre = req.body.titre;
        var contenu = req.body.contenu;
        var auteur = req.body.auteur;
        var date = req.body.date;
        var categorie = req.body.categorie;
        var tags = req.body.tags;

        if(titre == null || contenu == null || auteur == null || date == null || categorie == null || tags == null) {
            return res.status(400).json({'error': 'missing  parameters'});
        }

        // TODO verify is article already post by author

        asyncLib.waterfall([
            function(done) {
                models.Article.findOne({
                    where:{
                        titre:titre,
                        auteur:auteur
                    }
                })
                .then(function(articleFound) {
                    done(null, articleFound);
                })
                .catch(function(err) {
                    return res.status(500).json({'error':'unable to verify article'});
                });
            },
            function(articleFound, done) {
                var newArticle = models.Article.create({
                    titre:titre,
                    contenu:contenu,
                    auteur:auteur,
                    date:date,
                    categorie:categorie,
                    tags:tags
                })
                .then(function(newArticle) {
                    done(newArticle);
                })
                .catch(function(err) {
                    return res.status(500).json({'error':'cannot add article'});
                });
            }
        ], function(newArticle) {
            if(newArticle) {
                return res.status(201).json({
                    'articleId':newArticle.id
                });
            } else {
                return res.status(409).json({'error':'this article already post by this author'});
            }
        });
    }, 
    //get all articles
    getAll:function(req,res){
        
        // params filter
        var auteur = req.query.auteur; 
        var categorie = req.query.categorie;
        var date = req.query.date;

        // construct dynamic query
        var whereCondition = {};
        if(auteur) {
            whereCondition.auteur = auteur;
        }
        if(categorie) {
            whereCondition.categorie = categorie;
        }
        if(date) {
            whereCondition.date = date;
        }
        models.Article.findAll({
            where: whereCondition,
            order: [['date', 'DESC']],
            attributes: ['id', 'titre', 'contenu', 'auteur', 'date', 'categorie', 'tags'] 
        })
        .then(function(articles) {
            if(articles && articles.length > 0) {
                res.status(201).json({'articles': articles});
            } else {
                res.status(404).json({'error':'no articles found'});
            }
        })
        .catch(function(err) {
            res.status(500).json({'error':'unable to fetch articles'});
        });
    },
    // get article by id
    getById: function(req, res) {
        // Params depuis url
        var articleId = parseInt(req.params.id); 

        if(isNaN(articleId)) {
            return res.status(400).json({'error':'invalid article id'});
        }

        models.Article.findOne({
            where: {
                id: articleId
            },
            attributes: ['id', 'titre', 'contenu', 'auteur', 'date', 'categorie', 'tags']
        })
        .then(function(articleFound) {
            if(articleFound) {
                return res.status(201).json(articleFound);
            } else {
                return res.status(404).json({'error':'article not found'});
            }
        })
        .catch(function(err) {
            return res.status(500).json({'error':'unable to fetch article'});
        });
    },
    // update article by id
    updateById: function(req, res) {
        // Params depuis url
        var articleId = parseInt(req.params.id);

        // Params depuis body
        var titre = req.body.titre;
        var contenu = req.body.contenu;
        var categorie = req.body.categorie;
        var tags = req.body.tags;

        if(isNaN(articleId)) {
            return res.status(400).json({'error':'invalid article id'});
        }

        // if update fields are empty
        if(!titre && !contenu && !categorie && !tags) {
            return res.status(400).json({'error':'no fields to update'});
        }

        asyncLib.waterfall([
            function(done) {
                models.Article.findOne({
                    where: {
                        id: articleId
                    },
                    attributes: ['id', 'titre', 'contenu', 'auteur', 'date', 'categorie', 'tags']
                })
                .then(function(articleFound) {
                    done(null, articleFound);
                })
                .catch(function(err) {
                    return res.status(500).json({'error':'unable to verify article'});
                });
            },
            function(articleFound, done) {
                if(articleFound) {
                    articleFound.update({
                        titre: titre ? titre : articleFound.titre,
                        contenu: contenu ? contenu : articleFound.contenu,
                        categorie: categorie ? categorie : articleFound.categorie,
                        tags: tags ? tags : articleFound.tags
                    })
                    .then(function() {
                        done(articleFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({'error':'unable to update article'});
                    });
                } else {
                    return res.status(404).json({'error':'article not found'});
                }
            },
        ], function(articleFound) {
            if(articleFound) {
                return res.status(201).json(articleFound);
            } else {
                return res.status(500).json({'error':'cannot update article'});
            }
        });
    },
    // delete article by id
    deleteById: function(req, res) {
        // Params depuis url
        var articleId = parseInt(req.params.id);

        if(isNaN(articleId)) {
            return res.status(400).json({'error':'invalid article id'});
        }

        asyncLib.waterfall([
            function(done) {
                models.Article.findOne({
                    where: {
                        id: articleId
                    }
                })
                .then(function(articleFound) {
                    done(null, articleFound);
                })
                .catch(function(err) {
                    return res.status(500).json({'error':'unable to verify article'});
                });
            },
            function(articleFound, done) {
                if(articleFound) {
                    articleFound.destroy()
                    .then(function() {
                        done(true);
                    })
                    .catch(function(err) {
                        return res.status(500).json({'error':'unable to delete article'});
                    });
                } else {
                    return res.status(404).json({'error':'article not found'});
                }
            },
        ], function(isDeleted) {
            if(isDeleted) {
                return res.status(201).json({'message':'article deleted successfully',
                    'articleId': isDeleted.id
                });
            } else {
                return res.status(500).json({'error':'cannot delete article'});
            }
        });
    }
    
};