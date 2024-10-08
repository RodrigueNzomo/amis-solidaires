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
