const db = require("../models/cotisationModel"); // Assurez-vous que cotisationModel est correctement configuré

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

// Lister toutes les cotisations
exports.listerCotisations = (req, res, next) => {
  const sql = "SELECT * FROM cotisations";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return sendResponse(res, {
        status: 500,
        success: false,
        message: "Erreur lors de la récupération des cotisations",
        data: err.message,
      });
    }

    if (rows.length === 0) {
      return sendResponse(res, {
        status: 404,
        success: false,
        message: "Aucune cotisation trouvée",
      });
    }

    sendResponse(res, {
      data: rows,
    });
  });
};

// Créer une cotisation avec validation
exports.creerCotisation = (req, res, next) => {
  const { membre_id, montant, date, statut } = req.body;

  // Vérification des données obligatoires
  if (!membre_id || !montant || !date) {
    return sendResponse(res, {
      status: 400,
      success: false,
      message: "Le membre, le montant et la date sont obligatoires",
    });
  }

  const sql = `INSERT INTO cotisations (membre_id, montant, date, statut) 
               VALUES (?, ?, ?, ?)`;
  const params = [
    membre_id,
    montant,
    date,
    statut || "en attente", // Statut par défaut si non fourni
  ];

  db.run(sql, params, function (err) {
    if (err) {
      return sendResponse(res, {
        status: 500,
        success: false,
        message: "Erreur lors de la création de la cotisation",
        data: err.message,
      });
    }

    // Renvoi de la cotisation créée avec succès
    sendResponse(res, {
      status: 201,
      data: {
        id: this.lastID,
        membre_id,
        montant,
        date,
        statut: statut || "en attente",
      },
    });
  });
};

// Modifier une cotisation avec validation
exports.modifierCotisation = (req, res, next) => {
  const { membre_id, montant, date, statut } = req.body;

  // Assurez-vous que l'ID est bien un entier et valide
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return sendResponse(res, {
      status: 400,
      success: false,
      message: "ID invalide",
    });
  }

  // Vérification des données obligatoires
  if (!membre_id || !montant || !date || !statut) {
    return sendResponse(res, {
      status: 400,
      success: false,
      message: "Le membre, le montant, la date et le statut sont obligatoires",
    });
  }

  const sql = `UPDATE cotisations SET membre_id = ?, montant = ?, date = ?, statut = ? WHERE id = ?`;
  const params = [membre_id, montant, date, statut, id];

  db.run(sql, params, function (err) {
    if (err) {
      return sendResponse(res, {
        status: 500,
        success: false,
        message: "Erreur lors de la modification de la cotisation",
        data: err.message,
      });
    }

    if (this.changes === 0) {
      return sendResponse(res, {
        status: 404,
        success: false,
        message: `Cotisation avec l'ID ${id} non trouvée`,
      });
    }

    sendResponse(res, {
      data: {
        id,
        membre_id,
        montant,
        date,
        statut,
      },
    });
  });
};

// Supprimer une cotisation
exports.supprimerCotisation = (req, res, next) => {
  const id = parseInt(req.params.id, 10); // Validation pour convertir l'ID en entier

  if (isNaN(id)) {
    return sendResponse(res, {
      status: 400,
      success: false,
      message: "ID invalide",
    });
  }

  const sql = `DELETE FROM cotisations WHERE id = ?`;

  db.run(sql, id, function (err) {
    if (err) {
      return sendResponse(res, {
        status: 500,
        success: false,
        message: "Erreur lors de la suppression de la cotisation",
        data: err.message,
      });
    }

    // Si aucune cotisation n'a été supprimée
    if (this.changes === 0) {
      return sendResponse(res, {
        status: 404,
        success: false,
        message: `Cotisation avec l'ID ${id} non trouvée`,
      });
    }

    sendResponse(res, {
      status: 204,
    }); // Succès, aucun contenu à retourner
  });
};
