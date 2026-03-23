# Image de base Node.js légère
FROM node:18-alpine

# Dossier de travail dans le container
WORKDIR /app

# Copier les fichiers de dépendances en premier
COPY package*.json ./

# Installer les dépendances (production uniquement)
RUN npm install --production

# Copier tout le code source
COPY . .

# Exposer le port utilisé par l'app
EXPOSE 8080

# Démarrer l'application
CMD ["nodemon", "server.js"]
```
