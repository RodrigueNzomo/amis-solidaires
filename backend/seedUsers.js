const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");

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

// Utilisateurs à insérer
const utilisateurs = [
  {
    nom: "John",
    prenom: "Doe",
    email: "john.doe@example.com",
    telephone: "+242 060000001",
    role: "president",
    password: "password123",
  },
  {
    nom: "Jane",
    prenom: "Smith",
    email: "jane.smith@example.com",
    telephone: "+242 060000002",
    role: "tresorier",
    password: "password123",
  },
  {
    nom: "Alice",
    prenom: "Johnson",
    email: "alice.johnson@example.com",
    telephone: "+242 060000003",
    role: "membre",
    password: "password123",
  },
  {
    nom: "Bob",
    prenom: "Williams",
    email: "bob.williams@example.com",
    telephone: "+242 060000004",
    role: "membre",
    password: "password123",
  },
  {
    nom: "Clara",
    prenom: "Thomas",
    email: "clara.thomas@example.com",
    telephone: "+242 060000005",
    role: "president",
    password: "password123",
  },
];

// Fonction pour insérer les utilisateurs avec hashage des mots de passe
const insererUtilisateurs = () => {
  let count = 0;

  utilisateurs.forEach((utilisateur, index) => {
    // Hashage du mot de passe
    bcrypt.hash(utilisateur.password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Erreur lors du hashage du mot de passe :", err.message);
        return;
      }

      // SQL pour insérer l'utilisateur dans la table membres
      const sql = `
        INSERT INTO membres (nom, prenom, email, telephone, statut, role, password)
        VALUES (?, ?, ?, ?, 'actif', ?, ?)
      `;
      const params = [
        utilisateur.nom,
        utilisateur.prenom,
        utilisateur.email,
        utilisateur.telephone,
        utilisateur.role,
        hashedPassword,
      ];

      db.run(sql, params, function (err) {
        if (err) {
          console.error(
            `Erreur lors de l'insertion de l'utilisateur ${utilisateur.nom} :`,
            err.message
          );
        } else {
          console.log(`Utilisateur ${utilisateur.nom} inséré avec succès.`);
        }

        // Fermer la connexion à la base de données après la dernière insertion
        count++;
        if (count === utilisateurs.length) {
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
        }
      });
    });
  });
};

// Appeler la fonction pour insérer les utilisateurs
insererUtilisateurs();
