// swagger.js — À placer à la racine du projet
// Installation : npm install swagger-ui-express swagger-jsdoc
// Puis dans server.js, ajouter :
//   const { swaggerUi, swaggerSpec } = require('./swagger');
//   server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ApiGestArt',
            version: '1.0.0',
            description: 'API REST de gestion des articles de blog — par Prad Sonkeng (SKHP)',
            contact: {
                name: 'Prad Sonkeng',
                url: 'https://github.com/PradSonkeng'
            },
            license: {
                name: 'MIT'
            }
        },
        servers: [
            { url: 'http://localhost:8081/api', description: 'Serveur local' }
        ],
        components: {
            schemas: {
                Article: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        titre: {
                            type: 'string',
                            example: 'Mon premier article'
                        },
                        contenu: {
                            type: 'string',
                            example: 'Voici le contenu détaillé de mon article.'
                        },
                        auteur: {
                            type: 'string',
                            example: 'Prad Sonkeng'
                        },
                        date: {
                            type: 'string',
                            format: 'date',
                            example: '2026-03-23'
                        },
                        categorie: {
                            type: 'string',
                            example: 'Technologie'
                        },
                        tags: {
                            type: 'string',
                            example: 'node,api,rest'
                        }
                    }
                },
                ArticleInput: {
                    type: 'object',
                    required: ['titre', 'contenu', 'auteur', 'date', 'categorie', 'tags'],
                    properties: {
                        titre: {
                            type: 'string',
                            example: 'Mon premier article'
                        },
                        contenu: {
                            type: 'string',
                            example: 'Voici le contenu détaillé de mon article.'
                        },
                        auteur: {
                            type: 'string',
                            example: 'Prad Sonkeng'
                        },
                        date: {
                            type: 'string',
                            format: 'date',
                            example: '2026-03-23'
                        },
                        categorie: {
                            type: 'string',
                            example: 'Technologie'
                        },
                        tags: {
                            type: 'string',
                            example: 'node,api,rest'
                        }
                    }
                },
                ArticleUpdateInput: {
                    type: 'object',
                    properties: {
                        titre: {
                            type: 'string',
                            example: 'Titre mis à jour'
                        },
                        contenu: {
                            type: 'string',
                            example: 'Contenu mis à jour.'
                        },
                        categorie: {
                            type: 'string',
                            example: 'Dev'
                        },
                        tags: {
                            type: 'string',
                            example: 'javascript,express'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'string',
                            example: 'message d\'erreur'
                        }
                    }
                }
            }
        },
        paths: {
            '/articles': {
                post: {
                    summary: 'Créer un nouvel article',
                    tags: ['Articles'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ArticleInput' }
                            }
                        }
                    },
                    responses: {
                        '201': {
                            description: 'Article créé avec succès',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            articleId: { type: 'integer', example: 1 }
                                        }
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Paramètres manquants',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Error' },
                                    example: { error: 'missing parameters' }
                                }
                            }
                        },
                        '409': {
                            description: 'Article déjà publié par cet auteur',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Error' },
                                    example: { error: 'this article already post by this author' }
                                }
                            }
                        },
                        '500': {
                            description: 'Erreur serveur',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Error' }
                                }
                            }
                        }
                    }
                },
                get: {
                    summary: 'Lister tous les articles',
                    description: 'Retourne tous les articles triés par date décroissante. Filtrable par auteur, catégorie et date.',
                    tags: ['Articles'],
                    parameters: [
                        {
                            in: 'query',
                            name: 'auteur',
                            schema: { type: 'string' },
                            description: 'Filtrer par auteur',
                            example: 'Prad Sonkeng'
                        },
                        {
                            in: 'query',
                            name: 'categorie',
                            schema: { type: 'string' },
                            description: 'Filtrer par catégorie',
                            example: 'Technologie'
                        },
                        {
                            in: 'query',
                            name: 'date',
                            schema: { type: 'string', format: 'date' },
                            description: 'Filtrer par date exacte',
                            example: '2026-03-23'
                        }
                    ],
                    responses: {
                        '201': {
                            description: 'Liste des articles',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            articles: {
                                                type: 'array',
                                                items: { $ref: '#/components/schemas/Article' }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '404': {
                            description: 'Aucun article trouvé',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Error' },
                                    example: { error: 'no articles found' }
                                }
                            }
                        },
                        '500': {
                            description: 'Erreur serveur',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Error' }
                                }
                            }
                        }
                    }
                }
            },
            '/articles/search': {
                get: {
                    summary: 'Rechercher des articles',
                    description: 'Recherche des articles dont le titre ou le contenu contient le terme fourni (recherche partielle, insensible à la casse selon le moteur MySQL).',
                    tags: ['Articles'],
                    parameters: [
                        {
                            in: 'query',
                            name: 'query',
                            required: true,
                            schema: { type: 'string' },
                            description: 'Terme de recherche',
                            example: 'node'
                        }
                    ],
                    responses: {
                        '201': {
                            description: 'Articles correspondant à la recherche',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            articles: {
                                                type: 'array',
                                                items: { $ref: '#/components/schemas/Article' }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Paramètre de recherche manquant ou vide',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Error' },
                                    example: { error: 'missing search query' }
                                }
                            }
                        },
                        '404': {
                            description: 'Aucun article trouvé',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Error' },
                                    example: { error: 'no articles found matching the query' }
                                }
                            }
                        },
                        '500': {
                            description: 'Erreur serveur',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Error' }
                                }
                            }
                        }
                    }
                }
            },
            '/articles/{id}': {
                get: {
                    summary: 'Récupérer un article par ID',
                    tags: ['Articles'],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'integer' },
                            description: 'ID de l\'article',
                            example: 1
                        }
                    ],
                    responses: {
                        '201': {
                            description: 'Article trouvé',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Article' }
                                }
                            }
                        },
                        '400': {
                            description: 'ID invalide (non numérique)',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Error' },
                                    example: { error: 'invalid article id' }
                                }
                            }
                        },
                        '404': {
                            description: 'Article non trouvé',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Error' },
                                    example: { error: 'article not found' }
                                }
                            }
                        },
                        '500': {
                            description: 'Erreur serveur',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Error' }
                                }
                            }
                        }
                    }
                },
                put: {
                    summary: 'Mettre à jour un article',
                    description: 'Met à jour les champs titre, contenu, categorie et/ou tags. L\'auteur et la date ne sont pas modifiables.',
                    tags: ['Articles'],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'integer' },
                            description: 'ID de l\'article à modifier',
                            example: 1
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ArticleUpdateInput' }
                            }
                        }
                    },
                    responses: {
                        '201': {
                            description: 'Article mis à jour',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Article' }
                                }
                            }
                        },
                        '400': {
                            description: 'ID invalide ou aucun champ à mettre à jour',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Error' },
                                    example: { error: 'no fields to update' }
                                }
                            }
                        },
                        '404': {
                            description: 'Article non trouvé',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Error' },
                                    example: { error: 'article not found' }
                                }
                            }
                        },
                        '500': {
                            description: 'Erreur serveur',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Error' }
                                }
                            }
                        }
                    }
                },
                delete: {
                    summary: 'Supprimer un article',
                    tags: ['Articles'],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'integer' },
                            description: 'ID de l\'article à supprimer',
                            example: 1
                        }
                    ],
                    responses: {
                        '201': {
                            description: 'Article supprimé avec succès',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: { type: 'string', example: 'article deleted successfully' },
                                            articleId: { type: 'integer', example: 1 }
                                        }
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'ID invalide',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Error' },
                                    example: { error: 'invalid article id' }
                                }
                            }
                        },
                        '404': {
                            description: 'Article non trouvé',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Error' },
                                    example: { error: 'article not found' }
                                }
                            }
                        },
                        '500': {
                            description: 'Erreur serveur',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Error' }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    apis: []
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
