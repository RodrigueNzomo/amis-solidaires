const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Connexion à la base de données
const db = new sqlite3.Database(
  path.join(__dirname, "../database.sqlite"),
  (err) => {
    if (err) {
      console.error(
        "Erreur lors de la connexion à la base de données:",
        err.message
      );
    } else {
      console.log("Connexion réussie à la base de données SQLite.");
    }
  }
);

// Créer la table des prêts si elle n'existe pas
const createTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS prets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      membre_id INTEGER NOT NULL,
      montant REAL NOT NULL,
      date_debut TEXT NOT NULL,
      date_fin TEXT NOT NULL,
      statut TEXT NOT NULL DEFAULT 'en cours',
      taux_interet REAL DEFAULT 0,
      FOREIGN KEY (membre_id) REFERENCES membres(id)
    )`;

  db.run(sql, (err) => {
    if (err) {
      console.error(
        "Erreur lors de la création de la table 'prets' :",
        err.message
      );
    } else {
      console.log("Table 'prets' créée avec succès.");
    }
  });
};

// Appel de la création de la table à l'importation du module
createTable();

module.exports = db;
