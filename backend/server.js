// Importer les modules nécessaires
const express = require("express");
const bcrypt = require("bcryptjs");
const sqlite3 = require("sqlite3").verbose();
const membreRoutes = require("./routes/membreRoutes");
const cotisationRoutes = require("./routes/cotisationRoutes");
const pretRoutes = require("./routes/pretRoutes");
const aideRoutes = require("./routes/aideRoutes");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const fs = require("fs").promises;
fs.rmdir("./path-to-delete", { recursive: true })
  .then(() => console.log("Deleted!"))
  .catch((err) => console.error("Error:", err));
const fg = require("fast-glob");
const files = fg.sync(["**/*.js"]);
console.log(files);
const winston = require("winston");
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});
logger.info("Hello, Winston!");

// Initialisation de l'application Express
const app = express();

// Middleware pour analyser les requêtes en JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Création des tables SQL
const SQL_TABLES = {
  membres: `
    CREATE TABLE IF NOT EXISTS membres (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      prenom TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      telephone TEXT,
      statut TEXT DEFAULT 'actif',
      role TEXT NOT NULL DEFAULT 'membre',
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `,
  cotisations: `
    CREATE TABLE IF NOT EXISTS cotisations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      membre_id INTEGER NOT NULL,
      montant REAL NOT NULL,
      date TEXT NOT NULL,
      statut TEXT NOT NULL DEFAULT 'en attente',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (membre_id) REFERENCES membres(id)
    )
  `,
  prets: `
    CREATE TABLE IF NOT EXISTS prets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      membre_id INTEGER NOT NULL,
      montant REAL NOT NULL,
      date TEXT NOT NULL,
      statut TEXT NOT NULL DEFAULT 'en cours',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (membre_id) REFERENCES membres(id)
    )
  `,
  aides: `
    CREATE TABLE IF NOT EXISTS aides (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      membre_id INTEGER NOT NULL,
      montant REAL NOT NULL,
      date TEXT NOT NULL,
      description TEXT,
      statut TEXT NOT NULL DEFAULT 'en attente',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (membre_id) REFERENCES membres(id)
    )
  `,
};

// Fonction pour initialiser la base de données
const initializeDatabase = () => {
  const db = new sqlite3.Database("./database.sqlite", (err) => {
    if (err) {
      console.error("Erreur de connexion à la base de données:", err.message);
      process.exit(1);
    }
    console.log("Connexion réussie à la base de données SQLite");
  });

  // Création séquentielle des tables
  db.serialize(() => {
    Object.entries(SQL_TABLES).forEach(([tableName, sql]) => {
      db.run(sql, (err) => {
        if (err) {
          console.error(
            `Erreur lors de la création de la table ${tableName}:`,
            err.message
          );
        } else {
          console.log(`Table "${tableName}" créée avec succès`);
        }
      });
    });
  });

  return db;
};

// Initialisation de la base de données
const db = initializeDatabase();

// Middleware pour rendre la base de données disponible dans les requêtes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routes API
app.use("/api/membres", membreRoutes);
app.use("/api/cotisations", cotisationRoutes);
app.use("/api/prets", pretRoutes);
app.use("/api/aides", aideRoutes);
app.use("/api/auth/register", authRoutes);

// Middleware pour gérer les erreurs 404
app.use((req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "Route non trouvée",
  });
});

// Middleware de gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Une erreur interne est survenue",
  });
});

// Gestionnaire d'arrêt propre
process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      console.error(
        "Erreur lors de la fermeture de la base de données:",
        err.message
      );
    } else {
      console.log("Connexion à la base de données fermée.");
    }
    process.exit(err ? 1 : 0);
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
