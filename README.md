# ApiGestArt 📰

API REST de gestion d'articles de blog, construite avec **Node.js**, **Express** et **Sequelize** (MySQL).

---

## Prérequis

- Node.js ≥ 14
- MySQL (local ou distant)
- npm

---

## Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/PradSonkeng/ApiGestArt.git
cd ApiGestArt

# 2. Installer les dépendances
npm install

# 3. Configurer la base de données
# Éditer config/config.json avec vos identifiants MySQL :
{
  "development": {
    "username": "root",
    "password": "VotreMotDePasse",
    "database": "api_gest_art_dev",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

# 4. Créer la base de données et exécuter les migrations
npx sequelize-cli db:create
npx sequelize-cli db:migrate

# 5. Lancer le serveur
node server.js
```

Le serveur démarre sur **http://localhost:8081**.

---

## Documentation Swagger

Une fois le serveur lancé, la documentation interactive Swagger est disponible à :

```
http://localhost:8081/api-docs
```

> Pour activer Swagger, installer les dépendances supplémentaires :
> ```bash
> npm install swagger-ui-express swagger-jsdoc
> ```
> et intégrer `swagger.js` (voir le fichier fourni dans ce dépôt).

---

## Endpoints

Base URL : `http://localhost:8081/api`

| Méthode | Endpoint              | Description                              |
|---------|-----------------------|------------------------------------------|
| POST    | `/articles`           | Créer un nouvel article                  |
| GET     | `/articles`           | Lister tous les articles (filtrable)     |
| GET     | `/articles/search`    | Rechercher des articles (titre/contenu)  |
| GET     | `/articles/:id`       | Récupérer un article par son ID          |
| PUT     | `/articles/:id`       | Mettre à jour un article                 |
| DELETE  | `/articles/:id`       | Supprimer un article                     |

---

## Exemples d'utilisation

### Créer un article

```bash
curl -X POST http://localhost:8081/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Mon premier article",
    "contenu": "Voici le contenu de mon article.",
    "auteur": "Prad Sonkeng",
    "date": "2026-03-23",
    "categorie": "Technologie",
    "tags": "node,api,rest"
  }'
```

**Réponse (201)** :
```json
{ "articleId": 1 }
```

---

### Lister tous les articles

```bash
curl http://localhost:8081/api/articles
```

**Avec filtres** :
```bash
curl "http://localhost:8081/api/articles?auteur=Prad%20Sonkeng&categorie=Technologie"
```

**Réponse (201)** :
```json
{
  "articles": [
    {
      "id": 1,
      "titre": "Mon premier article",
      "contenu": "Voici le contenu de mon article.",
      "auteur": "Prad Sonkeng",
      "date": "2026-03-23",
      "categorie": "Technologie",
      "tags": "node,api,rest"
    }
  ]
}
```

---

### Récupérer un article par ID

```bash
curl http://localhost:8081/api/articles/1
```

**Réponse (201)** :
```json
{
  "id": 1,
  "titre": "Mon premier article",
  "contenu": "Voici le contenu de mon article.",
  "auteur": "Prad Sonkeng",
  "date": "2026-03-23",
  "categorie": "Technologie",
  "tags": "node,api,rest"
}
```

---

### Rechercher des articles

```bash
curl "http://localhost:8081/api/articles/search?query=node"
```

**Réponse (201)** :
```json
{
  "articles": [
    { "id": 1, "titre": "Mon premier article", "..." : "..." }
  ]
}
```

---

### Mettre à jour un article

```bash
curl -X PUT http://localhost:8081/api/articles/1 \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Titre mis à jour",
    "categorie": "Dev"
  }'
```

**Réponse (201)** : L'article mis à jour.

---

### Supprimer un article

```bash
curl -X DELETE http://localhost:8081/api/articles/1
```

**Réponse (201)** :
```json
{ "message": "article deleted successfully", "articleId": undefined }
```

---

## Codes de réponse HTTP

| Code | Signification                                  |
|------|------------------------------------------------|
| 201  | Succès (création, lecture, mise à jour)        |
| 400  | Paramètres manquants ou invalides              |
| 404  | Ressource non trouvée                          |
| 409  | Conflit (article déjà publié par cet auteur)   |
| 500  | Erreur serveur interne                         |

---

## Structure du projet

```
ApiGestArt/
├── config/
│   └── config.json          # Configuration BDD (Sequelize)
├── migrations/
│   └── 20260321183738-create-article.js
├── models/
│   ├── index.js             # Chargement Sequelize
│   └── article.js           # Modèle Article
├── routes/
│   └── articlesCtrl.js      # Logique métier & contrôleurs
├── apiRouter.js             # Définition des routes
├── server.js                # Point d'entrée Express
└── package.json
```

---

## Auteur

**Prad Sonkeng** · [GitHub](https://github.com/PradSonkeng) · SKHP
