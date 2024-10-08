const db = require("../models/membreModel");
const bcrypt = require("bcryptjs");

// Utilitaire pour envoyer des réponses standardisées
const sendResponse = (
  res,
  { status = 200, success = true, message = "", data = null }
) => {
  res.status(status).json({
    status: success ? "success" : "fail",
    message,
    data: data || undefined,
  });
};

// Lister tous les membres
exports.listerMembres = (req, res, next) => {
  const sql = "SELECT * FROM membres";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return sendResponse(res, {
        status: 500,
        success: false,
        message: "Erreur lors de la récupération des membres",
        data: err.message,
      });
    }

    if (rows.length === 0) {
      return sendResponse(res, {
        status: 404,
        success: false,
        message: "Aucun membre trouvé",
      });
    }

    sendResponse(res, {
      data: rows,
    });
  });
};

// Créer un membre avec validation et hashage de mot de passe
exports.creerMembre = async (req, res, next) => {
  const { nom, prenom, email, telephone, statut, role, password } = req.body;

  if (!nom || !prenom || !email || !password) {
    return sendResponse(res, {
      status: 400,
      success: false,
      message: "Nom, prénom, email, et mot de passe sont obligatoires",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hashage du mot de passe
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
        return sendResponse(res, {
          status: 500,
          success: false,
          message: "Erreur lors de la création du membre",
          data: err.message,
        });
      }

      sendResponse(res, {
        status: 201,
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
  } catch (error) {
    return sendResponse(res, {
      status: 500,
      success: false,
      message: "Erreur lors du hashage du mot de passe",
      data: error.message,
    });
  }
};

// Modifier un membre avec validation et hashage du mot de passe si nécessaire
exports.modifierMembre = async (req, res, next) => {
  const { nom, prenom, email, telephone, statut, role, password } = req.body;
  const id = parseInt(req.params.id, 10);

  if (!nom || !prenom || !email) {
    return sendResponse(res, {
      status: 400,
      success: false,
      message: "Nom, prénom, et email sont obligatoires",
    });
  }

  let hashedPassword = null;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10); // Hashage du nouveau mot de passe si modifié
  }

  const sql = `UPDATE membres SET nom = ?, prenom = ?, email = ?, telephone = ?, statut = ?, role = ?, password = COALESCE(?, password) 
               WHERE id = ?`;
  const params = [
    nom,
    prenom,
    email,
    telephone,
    statut || "actif",
    role || "membre",
    hashedPassword,
    id,
  ];

  db.run(sql, params, function (err) {
    if (err) {
      return sendResponse(res, {
        status: 500,
        success: false,
        message: "Erreur lors de la modification du membre",
        data: err.message,
      });
    }

    if (this.changes === 0) {
      return sendResponse(res, {
        status: 404,
        success: false,
        message: `Membre avec l'ID ${id} non trouvé`,
      });
    }

    sendResponse(res, {
      data: { id, nom, prenom, email, telephone, statut, role },
    });
  });
};

// Supprimer un membre
exports.supprimerMembre = (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  const sql = `DELETE FROM membres WHERE id = ?`;

  db.run(sql, id, function (err) {
    if (err) {
      return sendResponse(res, {
        status: 500,
        success: false,
        message: "Erreur lors de la suppression du membre",
        data: err.message,
      });
    }

    if (this.changes === 0) {
      return sendResponse(res, {
        status: 404,
        success: false,
        message: `Membre avec l'ID ${id} non trouvé`,
      });
    }

    sendResponse(res, {
      status: 204,
    });
  });
};
