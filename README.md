# ChicDZ – Boutique en ligne de prêt-à-porter féminin (Algérie)

ChicDZ est une plateforme complète pensée pour les créatrices et revendeuses de vêtements féminins en Algérie. Elle comprend :

- une vitrine publique élégante qui reprend les codes visuels des boutiques algériennes modernes ;
- un tableau de bord administrateur sécurisé pour publier et gérer les produits ;
- une API Node.js avec base de données SQLite pour stocker les fiches produits et servir les tarifs Yalidine.

## Aperçu des fonctionnalités

### Côté client
- Landing page immersive avec bannière « Nouvelle collection », mise en avant des services et rappel du paiement à la livraison.
- Catalogue dynamique affichant les nouveaux produits avec prix en dinars et badge de disponibilité.
- Fiche produit détaillée avec couleurs, tailles, bouton de partage et lien direct WhatsApp.
- Tableau des tarifs de livraison Yalidine (bureau & domicile) couvrant les 58 wilayas.

### Côté administrateur
- Authentification par email/mot de passe (configurable via variables d’environnement).
- Tableau de bord responsive : aperçu des produits, suppression rapide, bouton vers la fiche publique.
- Formulaire de création avec upload d’image, saisie des couleurs, tailles, statut de stock et mise en avant.
- Gestion des médias : envoi des images sur le serveur avec URL publique (`/uploads`).

## Structure du projet
```
backend/          # API Express + SQLite
  src/
    server.js
    routes/
    utils/
    middleware/
  data/yalidine_rates.json
frontend/         # Application Vite + React + Tailwind CSS
  src/
    components/
    pages/
    context/
    hooks/
```

## Prérequis
- Node.js ≥ 18
- npm ≥ 9

## Installation

### 1. Cloner le dépôt et installer les dépendances
```bash
npm install --prefix backend
npm install --prefix frontend
```

### 2. Configurer les variables d’environnement
Copiez les fichiers d’exemple :
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```
Modifiez ensuite :
- `backend/.env` pour définir l’email admin, le mot de passe et la clé JWT ;
- `frontend/.env` pour indiquer l’URL de l’API si différente (par défaut `http://localhost:4000`).

### 3. Initialiser la base de données
```bash
npm run migrate --prefix backend
```
Cela crée le fichier SQLite et la table `products`.

### 4. Lancer les serveurs de développement
Dans deux terminaux :
```bash
npm run dev --prefix backend
npm run dev --prefix frontend
```
- API disponible sur `http://localhost:4000`
- Front-end disponible sur `http://localhost:5173`

> Le proxy Vite redirige automatiquement les requêtes `/api` vers le backend.

### 5. Construction de production
```bash
npm run build --prefix frontend
```
Génère les fichiers statiques dans `frontend/dist` (ignoré par git).

## Authentification
- Email par défaut : `admin@chicdz.dz`
- Mot de passe par défaut : `ChangeMe123!`

Changez ces valeurs dans `backend/.env` avant la mise en ligne.

## Tarifs Yalidine
Les tarifs officiels sont fournis dans `backend/data/yalidine_rates.json`. Vous pouvez les mettre à jour selon les derniers barèmes communiqués par Yalidine.

## Déploiement
- Hébergez l’API sur un VPS (Node + PM2) ou un service managé (Render, Railway…).
- Servez le build front-end via un CDN ou Nginx.
- Pensez à configurer les en-têtes CORS (`CORS_ORIGIN`) pour correspondre à votre nom de domaine.

## Licence
Projet fourni tel quel pour un usage commercial ou personnel. Personnalisez les visuels et contenus selon votre marque.
