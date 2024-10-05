const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const membreRoutes = require("./routes/membreRoutes"); // Importer les routes des membres

// Fonction pour ouvrir une base de données SQLite
const openDatabase = (dbPath) => {
  return new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error(
        "Erreur lors de l'ouverture de la base de données :",
        err.message
      );
    } else {
      console.log("Connexion réussie à la base de données SQLite.");
    }
  });
};

// Fonction pour créer une table
const createTable = (db) => {
  const createTableSQL = `
        CREATE TABLE IF NOT EXISTS membres (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT NOT NULL,
            prenom TEXT NOT NULL,
            email TEXT NOT NULL,
            telephone TEXT,
            statut TEXT
        )
    `;

  db.run(createTableSQL, (err) => {
    if (err) {
      console.error("Erreur lors de la création de la table :", err.message);
    } else {
      console.log('Table "membres" créée avec succès.');
    }
  });
};

// Initialisation de l'application Express
const app = express();

// Middleware pour analyser les requêtes en JSON
app.use(bodyParser.json());

// Utilisation des routes pour les membres
app.use("/api/membres", membreRoutes);

// Démarrer la base de données et créer la table
const db = openDatabase("./database.sqlite");
createTable(db);

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

// server.js : Point d'entrée pour le serveur backend avec Express.js.
// const express = require("express");
// const bodyParser = require("body-parser");

// // Initialiser l'application Express
// const app = express();

// // Middleware pour parser les requêtes en JSON
// app.use(bodyParser.json());

// // Import des routes
// const membreRoutes = require("./routes/membreRoutes");
// const cotisationRoutes = require("./routes/cotisationRoutes");
// const pretRoutes = require("./routes/pretRoutes");

// // Utilisation des routes
// app.use("/api/membres", membreRoutes);
// app.use("/api/cotisations", cotisationRoutes);
// app.use("/api/prets", pretRoutes);

// // Définir le port du serveur
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Serveur démarré sur le port ${PORT}`);
// });
// const express = require("express");
// const bodyParser = require("body-parser");

// // Initialiser l'application Express
// const app = express();

// // Middleware pour parser les requêtes en JSON
// app.use(express.json()); // Utilisation de express.json() au lieu de body-parser

// // Import des routes
// const routes = ["membreRoutes", "cotisationRoutes", "pretRoutes"].map((route) =>
//   require(`./routes/${route}`)
// );

// // Utilisation des routes
// routes.forEach((route, index) => {
//   const routePath = ["/api/membres", "/api/cotisations", "/api/prets"][index];
//   app.use(routePath, route);
// });

// // Définir le port du serveur
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Serveur démarré sur le port ${PORT}`);
// });

// // const sqlite3 = require("sqlite3").verbose();

// // Créer et ouvrir une base de données SQLite
// let db = new sqlite3.Database("./database.sqlite", (err) => {
//   if (err) {
//     console.error(
//       "Erreur lors de l'ouverture de la base de données :",
//       err.message
//     );
//   } else {
//     console.log("Connexion réussie à la base de données SQLite.");
//   }
// });

// // Exemple de création de table "membres"
// db.run(
//   `CREATE TABLE IF NOT EXISTS membres (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     nom TEXT NOT NULL,
//     prenom TEXT NOT NULL,
//     email TEXT NOT NULL,
//     telephone TEXT,
//     statut TEXT
// )`,
//   (err) => {
//     if (err) {
//       console.error("Erreur lors de la création de la table :", err.message);
//     } else {
//       console.log('Table "membres" créée avec succès.');
//     }
//   }
// );
// const sqlite3 = require("sqlite3").verbose();

// // Fonction pour ouvrir une base de données SQLite
// const openDatabase = (dbPath) => {
//   return new sqlite3.Database(dbPath, (err) => {
//     if (err) {
//       console.error(
//         "Erreur lors de l'ouverture de la base de données :",
//         err.message
//       );
//     } else {
//       console.log("Connexion réussie à la base de données SQLite.");
//     }
//   });
// };

// // Fonction pour créer une table
// const createTable = (db) => {
//   const createTableSQL = `
//         CREATE TABLE IF NOT EXISTS membres (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             nom TEXT NOT NULL,
//             prenom TEXT NOT NULL,
//             email TEXT NOT NULL,
//             telephone TEXT,
//             statut TEXT
//         )
//     `;

//   db.run(createTableSQL, (err) => {
//     if (err) {
//       console.error("Erreur lors de la création de la table :", err.message);
//     } else {
//       console.log('Table "membres" créée avec succès.');
//     }
//   });
// };

// // Utilisation des fonctions
// const db = openDatabase("./database.sqlite");
// createTable(db);
