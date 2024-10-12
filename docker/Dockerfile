# 1. Utilisez une image officielle de Node.js (ici la version 14)
FROM node:14

# 2. Définir le répertoire de travail dans le conteneur
WORKDIR /app

# 3. Copier le fichier package.json et installer les dépendances
COPY package.json /app/
RUN npm install

# 4. Copier tout le contenu du projet dans le répertoire de travail du conteneur
COPY . /app

# 5. Exposer le port sur lequel l'application s'exécutera (3000)
EXPOSE 3000

# 6. Démarrer l'application
CMD ["node", "server.js"]
