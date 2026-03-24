# Guide de déploiement — ApiGestArt + Interface Web
**SKHP · PradSonkeng · Tout gratuit, zéro carte bancaire requise**

---

## Vue d'ensemble

| Composant | Plateforme | Plan | Coût |
|-----------|------------|------|------|
| Backend Node.js (API) | Render.com | Free | 0 € |
| Base de données MySQL | Railway.app | Hobby (5 $) OU Freesqldatabase.com | 0 € |
| Interface Web (frontend) | GitHub Pages | Free | 0 € |

> **Stratégie recommandée** : Backend sur Render + MySQL sur Freesqldatabase.com + Frontend sur GitHub Pages = **100% gratuit, aucune CB**.

---

## PARTIE 1 — Backend sur Render.com (gratuit)

### 1.1 Préparer le projet

Ajouter CORS à votre API (indispensable pour que le frontend puisse appeler le backend).

**Installer cors :**
```bash
npm install cors
```

**Modifier `server.js` :**
```js
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var apiRouter = require('./apiRouter').router;

var server = express();

// CORS — autoriser toutes origines (ou restreindre à votre GitHub Pages)
server.use(cors({
  origin: '*',  // ou : 'https://pradsonkeng.github.io'
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type']
}));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.get('/', function(req, res) {
  res.status(200).json({ status: 'ok', app: 'ApiGestArt', author: 'SKHP' });
});

server.use('/api/', apiRouter);

var PORT = process.env.PORT || 8081;
server.listen(PORT, function() {
  console.log('Server lancé sur le port ' + PORT);
});
```

**Vérifier `package.json` — ajouter le script start :**
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

**Vérifier `.gitignore` :**
```
node_modules/
config/config.json
.env
```

**Créer `.env` à la racine (ne pas committer) :**
```
DB_HOST=votre_host
DB_USER=votre_user
DB_PASS=votre_password
DB_NAME=votre_db
DB_PORT=3306
```

**Modifier `config/config.json` pour utiliser les variables d'environnement :**
```json
{
  "production": {
    "username": "process.env.DB_USER",
    "password": "process.env.DB_PASS",
    "database": "process.env.DB_NAME",
    "host": "process.env.DB_HOST",
    "port": "process.env.DB_PORT",
    "dialect": "mysql"
  }
}
```

Ou mieux, modifier `models/index.js` pour lire directement les variables d'env :
```js
// En haut de models/index.js, remplacer la config par :
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false
  }
);
```

### 1.2 Obtenir une base MySQL gratuite — Freesqldatabase.com

1. Aller sur **https://www.freesqldatabase.com**
2. Cliquer "Free MySQL Hosting"
3. Créer un compte (email)
4. Récupérer les identifiants :
   - Host : `sql12.freesqldatabase.com`
   - Port : `3306`
   - Database : `sql12XXXXXX`
   - User : `sql12XXXXXX`
   - Password : (fourni par email)
5. Noter ces valeurs — elles seront vos variables d'env sur Render

> **Alternative gratuite** : Aiven.io (plan Hobbyist, 1 instance MySQL gratuite)

### 1.3 Déployer sur Render.com

1. **Créer un compte** sur https://render.com (GitHub login recommandé)

2. **Pousser votre code sur GitHub** :
```bash
git add .
git commit -m "feat: add cors, env config"
git push origin main
```

3. Sur Render : **New → Web Service**

4. **Connecter votre repo GitHub** ApiGestArt

5. **Configurer le service :**
   - Name : `apigestart`
   - Environment : `Node`
   - Build Command : `npm install`
   - Start Command : `node server.js`
   - Plan : **Free**

6. **Variables d'environnement** (onglet "Environment") :
   ```
   DB_HOST     = sql12.freesqldatabase.com
   DB_USER     = sql12XXXXXX
   DB_PASS     = votre_password
   DB_NAME     = sql12XXXXXX
   DB_PORT     = 3306
   NODE_ENV    = production
   ```

7. Cliquer **Create Web Service**

8. Render build et déploie → URL fournie :
   `https://apigestart-xxxx.onrender.com`

9. **Créer les tables** (run migrations une fois) :
   - Dans Render → votre service → "Shell" (onglet)
   - Ou localement avec les variables d'env pointant vers la DB distante :
   ```bash
   npx sequelize-cli db:migrate
   ```

> ⚠️ Plan gratuit Render : le service "dort" après 15 min d'inactivité. Premier appel peut prendre 30-50 secondes (cold start). C'est normal.

---

## PARTIE 2 — Frontend sur GitHub Pages (gratuit)

### 2.1 Créer le repo frontend

```bash
mkdir apigestart-frontend
cd apigestart-frontend
git init
# Copier index.html dans ce dossier
git add index.html
git commit -m "init: frontend ApiGestArt"
git branch -M main
git remote add origin https://github.com/PradSonkeng/apigestart-frontend.git
git push -u origin main
```

### 2.2 Activer GitHub Pages

1. Aller dans votre repo GitHub
2. **Settings → Pages**
3. Source : **Deploy from a branch**
4. Branch : **main** / **/ (root)**
5. Cliquer **Save**

Votre site est accessible en quelques minutes sur :
`https://pradsonkeng.github.io/apigestart-frontend/`

### 2.3 Configurer l'URL de l'API dans l'interface

Une fois sur l'interface :
1. Dans la sidebar, champ **Base URL**, entrer :
   `https://apigestart-xxxx.onrender.com/api`
2. Cliquer **Tester la connexion**
3. Le point vert confirme que tout fonctionne ✓

---

## PARTIE 3 — Alternative Railway (MySQL)

Si Freesqldatabase.com pose problème, Railway offre un plan avec 5$ de crédit gratuit/mois, suffisant pour une petite DB MySQL.

1. Créer un compte sur **https://railway.app** (GitHub login)
2. **New Project → Database → MySQL**
3. Dans l'onglet **Variables**, récupérer :
   - `MYSQL_HOST`
   - `MYSQL_USER`
   - `MYSQL_PASSWORD`
   - `MYSQL_DATABASE`
   - `MYSQL_PORT`
4. Utiliser ces valeurs comme variables d'env sur Render

---

## Résumé URLs finales

```
API (Render)     :  https://apigestart-xxxx.onrender.com/api
Frontend (Pages) :  https://pradsonkeng.github.io/apigestart-frontend/
Swagger docs     :  https://apigestart-xxxx.onrender.com/api-docs
```

---

## Checklist déploiement

- [ ] CORS ajouté à `server.js`
- [ ] Script `start` dans `package.json`
- [ ] `config.json` utilise les variables d'env
- [ ] `.gitignore` exclut `node_modules/` et `.env`
- [ ] Base MySQL créée sur Freesqldatabase.com
- [ ] Variables d'env configurées sur Render
- [ ] Service Render déployé et URL récupérée
- [ ] Migrations exécutées (`db:migrate`)
- [ ] `index.html` sur GitHub Pages
- [ ] URL API configurée dans l'interface → connexion testée ✓

---

*SKHP · PradSonkeng · ApiGestArt*
