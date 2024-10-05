// const sqlite3 = require("sqlite3").verbose();

// // Ouvrir la base de données SQLite
// const db = new sqlite3.Database("./database.sqlite", (err) => {
//   if (err) {
//     console.error(
//       "Erreur lors de l'ouverture de la base de données :",
//       err.message
//     );
//   } else {
//     console.log("Connexion à la base de données SQLite réussie.");
//   }
// });

// module.exports = db;
const sqlite3 = require("sqlite3").verbose();

// Fonction pour ouvrir la base de données SQLite
const openDatabase = (dbPath) => {
  return new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error(
        "Erreur lors de l'ouverture de la base de données :",
        err.message
      );
    } else {
      console.log("Connexion à la base de données SQLite réussie.");
    }
  });
};

// Ouvrir la base de données
const db = openDatabase("./database.sqlite");

module.exports = db;

// 1. MongoDB (NoSQL)
// MongoDB est une base de données NoSQL qui stocke les données sous forme de documents JSON. C'est une bonne option si tu as besoin de flexibilité dans la structure des données.

// Fichier de configuration pour MongoDB :
// javascript
// Copier le code
// module.exports = {
//     url: 'mongodb://localhost:27017/amis-solidaires'
// };
// 2. MySQL (Relationnel)
// MySQL est une base de données relationnelle qui fonctionne bien pour les applications nécessitant des relations complexes entre les données.

// Fichier de configuration pour MySQL :
// javascript
// Copier le code
// module.exports = {
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'amis_solidaires'
// };
// 3. PostgreSQL (Relationnel)
// PostgreSQL est une autre base de données relationnelle robuste avec des fonctionnalités avancées comme le support JSON et les transactions complexes.

// Fichier de configuration pour PostgreSQL :
// javascript
// Copier le code
// module.exports = {
//     host: 'localhost',
//     user: 'postgres',
//     password: 'password',
//     database: 'amis_solidaires',
//     port: 5432
// };
// 4. SQLite (Fichier local)
// SQLite est une base de données relationnelle légère qui stocke les données dans un fichier. Idéal pour les petits projets ou les phases de prototypage.

// Fichier de configuration pour SQLite :
// javascript
// Copier le code
// module.exports = {
//     storage: './database.sqlite'
// };
// 5. Firebase (NoSQL - Cloud)
// Firebase est une base de données NoSQL basée sur le cloud, proposée par Google, qui offre des fonctionnalités en temps réel. C'est idéal pour des applications avec des utilisateurs distants.

// Fichier de configuration pour Firebase :
// javascript
// Copier le code
// const admin = require('firebase-admin');
// const serviceAccount = require('./path-to-serviceAccountKey.json');

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'https://amis-solidaires.firebaseio.com'
// });

// module.exports = admin.firestore();
// 6. Microsoft SQL Server (Relationnel)
// Microsoft SQL Server est une base de données relationnelle utilisée dans les environnements d'entreprise, offrant une grande robustesse pour les applications nécessitant une grande échelle.

// Fichier de configuration pour Microsoft SQL Server :
// javascript
// Copier le code
// module.exports = {
//     user: 'sa',
//     password: 'password',
//     server: 'localhost',
//     database: 'amis_solidaires',
//     options: {
//         encrypt: true,
//         enableArithAbort: true
//     }
// };
// 7. CouchDB (NoSQL)
// CouchDB est une base de données NoSQL qui gère des documents JSON et supporte la synchronisation entre plusieurs bases de données, ce qui la rend idéale pour les applications distribuées.

// Fichier de configuration pour CouchDB :
// javascript
// Copier le code
// module.exports = {
//     url: 'http://localhost:5984',
//     database: 'amis_solidaires'
// };
// 8. Redis (NoSQL - Clé-Valeur)
// Redis est une base de données NoSQL en mémoire qui est souvent utilisée pour le caching ou pour stocker des informations temporaires. Ce n’est pas recommandé comme base de données principale pour des données persistantes, mais peut être utile pour du cache.

// Fichier de configuration pour Redis :
// javascript
// Copier le code
// module.exports = {
//     host: 'localhost',
//     port: 6379
// };
// 9. MariaDB (Relationnel)
// MariaDB est une base de données relationnelle open source issue de MySQL. Elle est connue pour être plus rapide dans certains cas, avec des fonctionnalités avancées comme le support JSON.

// Fichier de configuration pour MariaDB :
// javascript
// Copier le code
// module.exports = {
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'amis_solidaires'
// };
// 10. Amazon DynamoDB (NoSQL - Cloud)
// DynamoDB est une base de données NoSQL proposée par AWS. Elle est entièrement gérée et scalable, ce qui la rend idéale pour des applications cloud.

// Fichier de configuration pour DynamoDB :
// javascript
// Copier le code
// const AWS = require('aws-sdk');
// AWS.config.update({
//     region: 'us-west-2',
//     accessKeyId: 'your-access-key',
//     secretAccessKey: 'your-secret-key'
// });

// module.exports = new AWS.DynamoDB.DocumentClient();
