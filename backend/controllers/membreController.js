const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");
const bcrypt = require("bcrypt");

// Lister tous les membres
exports.listerMembres = (req, res) => {
  const sql = "SELECT * FROM membres";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Erreur lors de la récupération des membres",
        error: err.message,
      });
    }

    if (rows.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Aucun membre trouvé",
      });
    }

    res.status(200).json({
      status: "success",
      data: rows,
    });
  });
};

// Créer un membre avec validation et hashage du mot de passe
exports.creerMembre = (req, res) => {
  const { nom, prenom, email, telephone, statut, role, password } = req.body;

  if (!nom || !prenom || !email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Nom, prénom, email, et mot de passe sont obligatoires",
    });
  }

  // Hashage du mot de passe avant de le stocker
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Erreur lors du hashage du mot de passe",
        error: err.message,
      });
    }

    const sql = `INSERT INTO membres (nom, prenom, email, telephone, statut, role, password) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      nom,
      prenom,
      email,
      telephone,
      statut || "actif",
      role || "membre",
      hashedPassword,
    ];

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
          role: role || "membre",
        },
      });
    });
  });
};

// Modifier un membre avec validation
exports.modifierMembre = (req, res) => {
  const { nom, prenom, email, telephone, statut, role, password } = req.body;
  const id = parseInt(req.params.id);

  if (!nom || !prenom || !email) {
    return res.status(400).json({
      status: "fail",
      message: "Nom, prénom, et email sont obligatoires",
    });
  }

  const updateMember = (hashedPassword) => {
    const sql = `UPDATE membres SET nom = ?, prenom = ?, email = ?, telephone = ?, statut = ?, role = ?, password = ? WHERE id = ?`;
    const params = [
      nom,
      prenom,
      email,
      telephone,
      statut,
      role,
      hashedPassword,
      id,
    ];

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
          role,
        },
      });
    });
  };

  // Si le mot de passe est fourni, nous le hashons
  if (password) {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Erreur lors du hashage du mot de passe",
          error: err.message,
        });
      }
      updateMember(hashedPassword);
    });
  } else {
    updateMember(null); // Pas de modification du mot de passe
  }
};

// Supprimer un membre
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
