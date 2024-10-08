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
    checkAndAddPasswordColumn();
  }
});

// Fonction pour vérifier si la colonne 'password' existe déjà
const checkAndAddPasswordColumn = () => {
  const checkColumnSQL = `
    PRAGMA table_info(membres)
  `;

  db.all(checkColumnSQL, [], (err, rows) => {
    if (err) {
      console.error(
        "Erreur lors de la récupération des informations sur la table :",
        err.message
      );
      closeDatabase();
      return;
    }

    const columnExists = rows.some((row) => row.name === "password");

    if (columnExists) {
      console.log("La colonne 'password' existe déjà dans la table 'membres'.");
      closeDatabase();
    } else {
      addPasswordColumn();
    }
  });
};

// Ajouter la colonne 'password' si elle n'existe pas
const addPasswordColumn = () => {
  const addPasswordColumnSQL = `
    ALTER TABLE membres ADD COLUMN password TEXT NOT NULL
  `;

  db.run(addPasswordColumnSQL, (err) => {
    if (err) {
      console.error(
        "Erreur lors de l'ajout de la colonne 'password' :",
        err.message
      );
    } else {
      console.log(
        "Colonne 'password' ajoutée avec succès à la table 'membres'."
      );
    }

    closeDatabase();
  });
};

// Fermer la base de données
const closeDatabase = () => {
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
};
