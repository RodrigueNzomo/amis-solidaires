// aideController.js
const db = require("../models/aideModel");

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

// Lister toutes les aides
exports.listerAides = (req, res, next) => {
  const sql = "SELECT * FROM aides";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return sendResponse(res, {
        status: 500,
        success: false,
        message: "Erreur lors de la récupération des aides",
        data: err.message,
      });
    }

    if (rows.length === 0) {
      return sendResponse(res, {
        status: 404,
        success: false,
        message: "Aucune aide trouvée",
      });
    }

    sendResponse(res, {
      data: rows,
    });
  });
};

// Créer une aide avec validation
exports.creerAide = (req, res, next) => {
  const { membre_id, montant, date, description } = req.body;

  // Vérification des données obligatoires
  if (!membre_id || !montant || !date) {
    return sendResponse(res, {
      status: 400,
      success: false,
      message: "Le membre, le montant et la date sont obligatoires",
    });
  }

  const sql = `INSERT INTO aides (membre_id, montant, date, description, statut) 
               VALUES (?, ?, ?, ?, ?)`;
  const params = [membre_id, montant, date, description || "", "en attente"];

  db.run(sql, params, function (err) {
    if (err) {
      return sendResponse(res, {
        status: 500,
        success: false,
        message: "Erreur lors de la création de l'aide",
        data: err.message,
      });
    }

    sendResponse(res, {
      status: 201,
      data: {
        id: this.lastID,
        membre_id,
        montant,
        date,
        description,
        statut: "en attente",
      },
    });
  });
};

// Modifier une aide avec validation
exports.modifierAide = (req, res, next) => {
  const { membre_id, montant, date, description, statut } = req.body;
  const id = parseInt(req.params.id, 10);

  // Validation des données
  if (!membre_id || !montant || !date || !statut) {
    return sendResponse(res, {
      status: 400,
      success: false,
      message: "Le membre, le montant, la date et le statut sont obligatoires",
    });
  }

  const sql = `UPDATE aides 
               SET membre_id = ?, montant = ?, date = ?, description = ?, statut = ?
               WHERE id = ?`;
  const params = [membre_id, montant, date, description || "", statut, id];

  db.run(sql, params, function (err) {
    if (err) {
      return sendResponse(res, {
        status: 500,
        success: false,
        message: "Erreur lors de la modification de l'aide",
        data: err.message,
      });
    }

    if (this.changes === 0) {
      return sendResponse(res, {
        status: 404,
        success: false,
        message: `Aide avec l'ID ${id} non trouvée`,
      });
    }

    sendResponse(res, {
      data: {
        id,
        membre_id,
        montant,
        date,
        description,
        statut,
      },
    });
  });
};

// Supprimer une aide
exports.supprimerAide = (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return sendResponse(res, {
      status: 400,
      success: false,
      message: "ID invalide",
    });
  }

  const sql = `DELETE FROM aides WHERE id = ?`;

  db.run(sql, id, function (err) {
    if (err) {
      return sendResponse(res, {
        status: 500,
        success: false,
        message: "Erreur lors de la suppression de l'aide",
        data: err.message,
      });
    }

    if (this.changes === 0) {
      return sendResponse(res, {
        status: 404,
        success: false,
        message: `Aide avec l'ID ${id} non trouvée`,
      });
    }

    sendResponse(res, {
      status: 204,
    });
  });
};
