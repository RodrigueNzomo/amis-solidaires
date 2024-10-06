const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(__dirname + "/../database.sqlite"); // Connexion à la base de données

// Créer la table des aides si elle n'existe pas
const createTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS aides (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      membre_id INTEGER NOT NULL,
      montant REAL NOT NULL,
      date TEXT NOT NULL,
      description TEXT,
      statut TEXT NOT NULL DEFAULT 'en attente',
      FOREIGN KEY (membre_id) REFERENCES membres(id)
    )`;

  db.run(sql, (err) => {
    if (err) {
      console.error(
        "Erreur lors de la création de la table 'aides' :",
        err.message
      );
    } else {
      console.log("Table 'aides' créée avec succès.");
    }
  });
};

// Appel de la création de la table à l'importation du module
createTable();

module.exports = db;
