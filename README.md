# Application Todo-List

## Description

Développement d'une application multi-plateforme en React Native permettant de gérer diverses listes de tâches. 
Utilisation de Neo4j pour la base de données couplée à GraphQL. Apollo Server a été utilisé pour le déploiement de l'API, et Expo pour un lancement simple et rapide de l'application.

## Prérequis

+ Installation de [Node.js](https://nodejs.org/en/download)
    + Normalement l'installation de `npm` et `npx` est comprise dans celle de Node.js

+ Installation de [Neo4j](https://neo4j.com/docs/operations-manual/current/installation/)
    + Installation du plugin [APOC](https://neo4j.com/docs/apoc/current/installation/)

## Comment lancer l'application

### Démarrer l'API GraphQL

+ Se rendre dans le dossier `./src/graphql-app/`

+ Mettez à jour le fichier `.env`

+ Installation des dépendances nécessaires au projet avec la commande `npm install`

+ La commande `npm start` permet de lancer le serveur Apollo

### Démarrer l'Application React Native

+ Se rendre dans le dossier `./src/graphql-app/`

+ Installation d'Expo CLI avec la commande`npm install -g expo-cli`

+ Installation des dépendances nécessaires au projet avec la commande `npm install`

+ La commande `npm start` permet de lancer l'application Todo-List

## Contribuer

+ N'hésitez pas à signaler des bugs.

+ N'hésitez pas à améliorer le code existant.

## Licence

Ce projet est sous licence [MIT](./LICENSE.md).

## Captures d'écran

![home](./screenshots/home.png)

![signIn](./screenshots/signIn.png)

![todo-lists](./screenshots/todo-lists.png)

![todos](./screenshots/todos.png)
