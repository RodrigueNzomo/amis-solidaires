const sqlite3 = require("sqlite3").verbose();

// Connexion à la base de données
const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error(
      "Erreur lors de l'ouverture de la base de données :",
      err.message
    );
  } else {
    console.log("Connexion réussie à la base de données SQLite.");
  }
});

// Ajouter la colonne 'role' à la table 'membres' si elle n'existe pas
const addRoleColumnSQL = `
  ALTER TABLE membres ADD COLUMN role TEXT DEFAULT 'membre'
`;

db.run(addRoleColumnSQL, (err) => {
  if (err) {
    if (err.message.includes("duplicate column name")) {
      console.log("La colonne 'role' existe déjà dans la table 'membres'.");
    } else {
      console.error(
        "Erreur lors de l'ajout de la colonne 'role' :",
        err.message
      );
    }
  } else {
    console.log("Colonne 'role' ajoutée avec succès à la table 'membres'.");
  }

  // Fermer la base de données après mise à jour
  db.close((err) => {
    if (err) {
      console.error(
        "Erreur lors de la fermeture de la base de données :",
        err.message
      );
    } else {
      console.log("Connexion à la base de données fermée.");
    }
  });
});
