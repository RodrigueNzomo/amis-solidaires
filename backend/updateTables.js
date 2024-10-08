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
    checkAndAddRoleColumn();
  }
});

// Fonction pour vérifier si la colonne 'role' existe déjà
const checkAndAddRoleColumn = () => {
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

    const columnExists = rows.some((row) => row.name === "role");

    if (columnExists) {
      console.log("La colonne 'role' existe déjà dans la table 'membres'.");
      closeDatabase();
    } else {
      addRoleColumn();
    }
  });
};

// Ajouter la colonne 'role' si elle n'existe pas
const addRoleColumn = () => {
  const addRoleColumnSQL = `
    ALTER TABLE membres ADD COLUMN role TEXT DEFAULT 'membre'
  `;

  db.run(addRoleColumnSQL, (err) => {
    if (err) {
      console.error(
        "Erreur lors de l'ajout de la colonne 'role' :",
        err.message
      );
    } else {
      console.log("Colonne 'role' ajoutée avec succès à la table 'membres'.");
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
