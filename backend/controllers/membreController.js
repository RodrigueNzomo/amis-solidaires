const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

// Lister tous les membres
exports.listerMembres = (req, res) => {
  const sql = "SELECT * FROM membres";

  db.all(sql, [], (err, rows) => {
    if (err) {
      // En cas d'erreur, nous renvoyons une réponse JSON avec le code 500
      return res.status(500).json({
        status: "error",
        message: "Erreur lors de la récupération des membres",
        error: err.message,
      });
    }

    // Si aucun membre n'est trouvé, nous renvoyons un message informatif
    if (rows.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Aucun membre trouvé",
      });
    }

    // Si tout fonctionne, nous renvoyons la liste des membres
    res.status(200).json({
      status: "success",
      data: rows,
    });
  });
};

// Créer un membre avec validation
exports.creerMembre = (req, res) => {
  const { nom, prenom, email, telephone, statut } = req.body;

  // Validation simple
  if (!nom || !prenom || !email) {
    return res.status(400).json({
      status: "fail",
      message: "Nom, prénom, et email sont obligatoires",
    });
  }

  const sql = `INSERT INTO membres (nom, prenom, email, telephone, statut) VALUES (?, ?, ?, ?, ?)`;
  const params = [nom, prenom, email, telephone, statut || "actif"]; // Valeur par défaut pour statut
  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Erreur lors de la création du membre",
        error: err.message,
      });
    }
    res.status(201).json({
      status: "success",
      data: {
        id: this.lastID,
        nom,
        prenom,
        email,
        telephone,
        statut: statut || "actif",
      },
    });
  });
};

// Modifier un membre avec validation
exports.modifierMembre = (req, res) => {
  const { nom, prenom, email, telephone, statut } = req.body;
  const id = parseInt(req.params.id);

  if (!nom || !prenom || !email) {
    return res.status(400).json({
      status: "fail",
      message: "Nom, prénom, et email sont obligatoires",
    });
  }

  const sql = `UPDATE membres SET nom = ?, prenom = ?, email = ?, telephone = ?, statut = ? WHERE id = ?`;
  const params = [nom, prenom, email, telephone, statut, id];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Erreur lors de la modification du membre",
        error: err.message,
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        status: "fail",
        message: `Membre avec l'ID ${id} non trouvé`,
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        id,
        nom,
        prenom,
        email,
        telephone,
        statut,
      },
    });
  });
};

// Supprimer un membre avec standardisation des réponses
exports.supprimerMembre = (req, res) => {
  const id = parseInt(req.params.id);
  const sql = `DELETE FROM membres WHERE id = ?`;

  db.run(sql, id, function (err) {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Erreur lors de la suppression du membre",
        error: err.message,
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        status: "fail",
        message: `Membre avec l'ID ${id} non trouvé`,
      });
    }

    res.status(204).send(); // Succès, aucun contenu à retourner
  });
};

// // // membreController.js : Gestion des requêtes pour les membres (création, modification, suppression, etc.).
// // let membres = []; // Base de données simulée

// // exports.listerMembres = (req, res) => {
// //   res.json(membres);
// // };

// // exports.creerMembre = (req, res) => {
// //   const nouveauMembre = req.body;
// //   nouveauMembre.id = membres.length + 1; // Générer un ID unique
// //   membres.push(nouveauMembre);
// //   res.status(201).json(nouveauMembre);
// // };

// // exports.modifierMembre = (req, res) => {
// //   const id = parseInt(req.params.id);
// //   const membre = membres.find((m) => m.id === id);
// //   if (membre) {
// //     Object.assign(membre, req.body);
// //     res.status(200).json(membre);
// //   } else {
// //     res.status(404).send("Membre non trouvé");
// //   }
// // };

// // exports.supprimerMembre = (req, res) => {
// //   const id = parseInt(req.params.id);
// //   const index = membres.findIndex((m) => m.id === id);
// //   if (index !== -1) {
// //     membres.splice(index, 1);
// //     res.status(204).send();
// //   } else {
// //     res.status(404).send("Membre non trouvé");
// //   }
// // };
// // let membres = []; // Simuler une base de données locale

// // Lister tous les membres
// exports.listerMembres = (req, res) => {
//   res.json(membres); // Renvoie la liste des membres au format JSON
// };

// // Créer un membre
// exports.creerMembre = (req, res) => {
//   const nouveauMembre = req.body;
//   nouveauMembre.id = membres.length + 1; // Générer un ID unique
//   membres.push(nouveauMembre);
//   res.status(201).json(nouveauMembre); // Renvoie le membre créé avec un code 201 (créé)
// };

// // Modifier un membre
// exports.modifierMembre = (req, res) => {
//   const id = parseInt(req.params.id);
//   const membre = membres.find((m) => m.id === id);
//   if (membre) {
//     Object.assign(membre, req.body);
//     res.status(200).json(membre);
//   } else {
//     res.status(404).send("Membre non trouvé");
//   }
// };

// // Supprimer un membre
// exports.supprimerMembre = (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = membres.findIndex((m) => m.id === id);
//   if (index !== -1) {
//     membres.splice(index, 1);
//     res.status(204).send();
//   } else {
//     res.status(404).send("Membre non trouvé");
//   }
// };
