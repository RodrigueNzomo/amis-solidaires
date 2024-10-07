const db = require("../models/aideModel");

// Lister toutes les aides
exports.listerAides = (req, res) => {
  const sql = "SELECT * FROM aides";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Erreur lors de la récupération des aides",
        error: err.message,
      });
    }

    if (rows.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Aucune aide trouvée",
      });
    }

    res.status(200).json({
      status: "success",
      data: rows,
    });
  });
};

// Créer une aide avec validation
exports.creerAide = (req, res) => {
  const { membre_id, montant, date, description } = req.body;

  if (!membre_id || !montant || !date) {
    return res.status(400).json({
      status: "fail",
      message: "Le membre, le montant et la date sont obligatoires",
    });
  }

  const sql = `INSERT INTO aides (membre_id, montant, date, description, statut) VALUES (?, ?, ?, ?, ?)`;
  const params = [membre_id, montant, date, description || "", "en attente"];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Erreur lors de la création de l'aide",
        error: err.message,
      });
    }

    res.status(201).json({
      status: "success",
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
exports.modifierAide = (req, res) => {
  const { membre_id, montant, date, description, statut } = req.body;
  const id = parseInt(req.params.id);

  if (!membre_id || !montant || !date || !statut) {
    return res.status(400).json({
      status: "fail",
      message: "Le membre, le montant, la date et le statut sont obligatoires",
    });
  }

  const sql = `UPDATE aides SET membre_id = ?, montant = ?, date = ?, description = ?, statut = ? WHERE id = ?`;
  const params = [membre_id, montant, date, description || "", statut, id];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Erreur lors de la modification de l'aide",
        error: err.message,
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        status: "fail",
        message: `Aide avec l'ID ${id} non trouvée`,
      });
    }

    res.status(200).json({
      status: "success",
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
exports.supprimerAide = (req, res) => {
  const id = parseInt(req.params.id);
  const sql = `DELETE FROM aides WHERE id = ?`;

  db.run(sql, id, function (err) {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Erreur lors de la suppression de l'aide",
        error: err.message,
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        status: "fail",
        message: `Aide avec l'ID ${id} non trouvée`,
      });
    }

    res.status(204).send(); // Succès, aucun contenu à retourner
  });
};
