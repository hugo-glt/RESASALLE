# Vue 3 + TypeScript + Vite

Stack technique
Backend : Node.js + TypeScript + Express 5
ORM : TypeORM (MariaDB)
Auth : JWT (jsonwebtoken)
Base de données : MariaDB
Linter : Biome
Outils : ts-node, nodemon

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

Use case : Réservation de salles — Resasalle
    Contexte:
Resasalle est une application web de réservation de salles pour un établissement scolaire. Elle permet aux enseignants et au personnel administratif de visualiser les salles disponibles, de réserver un créneau, et de suivre l'historique des actions.

Acteurs
    Acteur	Rôle
    Admin	Gère les utilisateurs, les salles, les équipements. Accès à tout l'historique.
    Teacher	Réserve des salles pour ses cours. Consulte ses réservations.
    Student	Voit le planning des salles (lecture seule).

Fonctionnalités implémentées
    Fonctionnalité	Description
    Inscription	Un admin crée un utilisateur avec un rôle (Student, Teacher, Admin)
    Connexion / Déconnexion	Authentification JWT, enregistrement dans l'historique
    Profil connecté	Récupération des informations de l'utilisateur (nom, email, rôle)
    Recherche filtrée	Filtrage des salles par bâtiment, étage, capacité, équipements
    Création de réservation	Réservation d'une salle avec vérification des conflits horaires
    Disponibilités	Liste des salles libres pour un créneau donné
    Feed du jour	Affiche toutes les réservations du jour triées par horaire
    Historique	Trace de toutes les actions (login, logout, création de réservation)

WIREFRAME 

Login Wireframe
[!Capture](/frontend/src/assets/documentation/Login_Wireframe.png)

User/ Homepage Wireframe
[!Capture](/frontend/src/assets/documentation/User_Wireframe.png)

Admin Dashboard Wireframe
[!Capture](/frontend/src/assets/documentation/AdminDashboard_Wireframe1.png)
[!Capture](/frontend/src/assets/documentation/AdminDashboard_Wireframe2.png)

