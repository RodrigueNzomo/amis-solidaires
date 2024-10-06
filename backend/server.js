// Importer les modules nécessaires
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

// Fonction pour créer une table si elle n'existe pas
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

// Démarrer le serveur sur le port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
