# Vue 3 + TypeScript + Vite
This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.
Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## Stack technique

Backend : Node.js + TypeScript + Express 5
ORM : TypeORM (MariaDB)
Auth : JWT (jsonwebtoken)
Base de données : MariaDB
Linter : Biome
Outils : ts-node, nodemon

## 1. Cloner le projet

'bash
git clone <git@github.com:hugo-glt/RESASALLE.git>
cd resasalle

### Prérequis

- Node.js ≥ 18
- npm ≥ 9
- MariaDB 

## Use case : Réservation de salles — Resasalle

    Contexte:
Resasalle est une application web de réservation de salles pour un établissement scolaire. Elle permet aux enseignants et au personnel administratif de visualiser les salles disponibles, de réserver un créneau, et de suivre l'historique des actions.

## Acteurs

    Acteur	Rôle
    Admin	Gère les utilisateurs, les salles, les équipements. Accès à tout l'historique.
    Teacher	Réserve des salles pour ses cours. Consulte ses réservations.
    Student	Voit le planning des salles (lecture seule).

## Fonctionnalités implémentées

### Authentification
| Fonctionnalité | Acteurs | Description |
|---|---|---|
| Inscription | Admin | Création d'un utilisateur avec un rôle (Student, Teacher, Admin) |
| Connexion / Déconnexion | Tous | Authentification JWT avec enregistrement dans l'historique |
| Profil connecté | Tous | Récupération des infos utilisateur (nom, email, rôle) |

### Salles
| Fonctionnalité | Acteurs | Description |
|---|---|---|
| Recherche filtrée | Teacher, Student | Filtrage par bâtiment, étage, capacité, équipements |
| Disponibilités | Teacher, Student | Liste des salles libres pour un créneau donné |

### Réservations
| Fonctionnalité | Acteurs | Description |
|---|---|---|
| Création de réservation | Teacher | Réservation avec vérification des conflits horaires |
| Feed du jour | Tous | Affiche toutes les réservations du jour triées par horaire |

### Administration
| Fonctionnalité | Acteurs | Description |
|---|---|---|
| Gestion utilisateurs | Admin | CRUD complet des utilisateurs |
| Gestion salles | Admin | CRUD des salles et équipements |
| Historique | Admin | Trace de toutes les actions (login, logout, réservation) |

## WIREFRAME 

Login Wireframe
[!Capture](/documentation/Login_Wireframe.png)

User/ Homepage Wireframe
[!Capture](/documentation/User_Wireframe.png)

Admin Dashboard Wireframe
[!Capture](/documentation/AdminDashboard_Wireframe1.png)
[!Capture](/documentation/AdminDashboard_Wireframe2.png)

SHÉMA DE BASE DE DONNÉES
[!Capture](/documentation/MLD_DDB.png)

CHARTE GRAPHIQUE
[!Capture](/documentation/Graphic_Charter.png)

ENDPOINTS
[!Capture](/documentation/EndPoints_Charter.png)

## BACKEND
```bash
cd backend

1. Installer les dépendances
npm install

2. Configurer les variables d'environnement
cp dote.env .env

3. Modifier .env avec vos identifiants MariaDB

4. Lancer en développement
npm run dev
```

## FRONTEND
```bash
1. Installer les dépendances
npm install

2. Lancer en développement
npm run dev
```

## STRUCTURE DU PROJET 
```bash
resasalle/
├── backend/
│   ├── src/
│   │   ├── app.ts          # Point d'entrée
│   │   ├── routes/         # Routes API
│   │   ├── controllers/    # Logique métier
│   │   ├── entities/       # Entités TypeORM
│   │   └── middleware/     # Middleware (auth, etc.)
│   ├── dote.env            # Template .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── views/          # Pages (Login, Home, Dashboard...)
│   │   ├── layouts/        # Layouts (NavBar)
│   │   ├── router/         # Routes Vue Router
│   │   ├── composables/    # Stores partagés
│   │   └── assets/         # Icons, images
│   └── package.json
└── documentation/          # Wireframes, charte, etc.
```