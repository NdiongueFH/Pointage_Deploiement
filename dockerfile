# Étape 1: Construction de l'application Angular
FROM node:18 AS builder 

WORKDIR /app

# Copier package.json et package-lock.json
COPY SunuPointages/package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY SunuPointages/ .

# Construire l'application Angular
RUN npm run build

# Étape 2: Serveur Nginx pour servir l'application Angular
FROM nginx:alpine

# Copier les fichiers de construction vers le répertoire Nginx
COPY --from=builder /app/dist/SunuPointages /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]