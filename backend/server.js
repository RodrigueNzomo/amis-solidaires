// Importer les modules nécessaires
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3").verbose();
const membreRoutes = require("./routes/membreRoutes");
const cotisationRoutes = require("./routes/cotisationRoutes");
const pretRoutes = require("./routes/pretRoutes");
const aideRoutes = require("./routes/aideRoutes");
const authRoutes = require("./routes/authRoutes");

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

// Fonction pour créer les tables si elles n'existent pas
const createTables = (db) => {
  const createMembresTableSQL = `
    CREATE TABLE IF NOT EXISTS membres (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      prenom TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL,  -- Ajout de la colonne pour le mot de passe
      telephone TEXT,
      statut TEXT DEFAULT 'actif'
    )
  `;

  const createCotisationsTableSQL = `
    CREATE TABLE IF NOT EXISTS cotisations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      membre_id INTEGER NOT NULL,
      montant REAL NOT NULL,
      date TEXT NOT NULL,
      statut TEXT NOT NULL DEFAULT 'en attente',
      FOREIGN KEY (membre_id) REFERENCES membres(id)
    )
  `;

  const createPretsTableSQL = `
    CREATE TABLE IF NOT EXISTS prets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      membre_id INTEGER NOT NULL,
      montant REAL NOT NULL,
      date TEXT NOT NULL,
      statut TEXT NOT NULL DEFAULT 'en cours',
      FOREIGN KEY (membre_id) REFERENCES membres(id)
    )
  `;

  const createAidesTableSQL = `
    CREATE TABLE IF NOT EXISTS aides (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      membre_id INTEGER NOT NULL,
      montant REAL NOT NULL,
      date TEXT NOT NULL,
      description TEXT,
      statut TEXT NOT NULL DEFAULT 'en attente',
      FOREIGN KEY (membre_id) REFERENCES membres(id)
    )
  `;

  // Création des tables
  db.run(createMembresTableSQL, (err) => {
    if (err) {
      console.error(
        "Erreur lors de la création de la table 'membres' :",
        err.message
      );
    } else {
      console.log('Table "membres" créée avec succès.');
    }
  });

  db.run(createCotisationsTableSQL, (err) => {
    if (err) {
      console.error(
        "Erreur lors de la création de la table 'cotisations' :",
        err.message
      );
    } else {
      console.log('Table "cotisations" créée avec succès.');
    }
  });

  db.run(createPretsTableSQL, (err) => {
    if (err) {
      console.error(
        "Erreur lors de la création de la table 'prets' :",
        err.message
      );
    } else {
      console.log('Table "prets" créée avec succès.');
    }
  });

  db.run(createAidesTableSQL, (err) => {
    if (err) {
      console.error(
        "Erreur lors de la création de la table 'aides' :",
        err.message
      );
    } else {
      console.log('Table "aides" créée avec succès.');
    }
  });
};

// Initialisation de l'application Express
const app = express();

// Middleware pour analyser les requêtes en JSON
app.use(bodyParser.json());

// Utilisation des routes pour les membres, cotisations, prêts, aides, et authentification
app.use("/api/membres", membreRoutes);
app.use("/api/cotisations", cotisationRoutes);
app.use("/api/prets", pretRoutes);
app.use("/api/aides", aideRoutes);
app.use("/api/auth/login", authRoutes); // Route pour la gestion de l'authentification

// Démarrer la base de données et créer les tables
const db = openDatabase("./database.sqlite");
createTables(db);

// Middleware pour gérer les erreurs 404
app.use((req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "Route non trouvée",
  });
});

// Démarrer le serveur sur le port 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
