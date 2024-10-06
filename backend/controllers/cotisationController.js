const db = require("../models/cotisationModel");

// Lister toutes les cotisations
exports.listerCotisations = (req, res) => {
  const sql = "SELECT * FROM cotisations";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Erreur lors de la récupération des cotisations",
        error: err.message,
      });
    }

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ status: "fail", message: "Aucune cotisation trouvée" });
    }

    res.status(200).json({ status: "success", data: rows });
  });
};

// Créer une cotisation
exports.creerCotisation = (req, res) => {
  const { membre_id, montant, date } = req.body;

  if (!membre_id || !montant || !date) {
    return res.status(400).json({
      status: "fail",
      message: "Le membre, le montant et la date sont obligatoires",
    });
  }

  const sql =
    "INSERT INTO cotisations (membre_id, montant, date, statut) VALUES (?, ?, ?, ?)";
  const params = [membre_id, montant, date, "en attente"];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Erreur lors de la création de la cotisation",
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
        statut: "en attente",
      },
    });
  });
};

// Modifier une cotisation
exports.modifierCotisation = (req, res) => {
  const { membre_id, montant, date, statut } = req.body;
  const id = parseInt(req.params.id);

  if (!membre_id || !montant || !date || !statut) {
    return res.status(400).json({
      status: "fail",
      message: "Le membre, le montant, la date et le statut sont obligatoires",
    });
  }

  const sql =
    "UPDATE cotisations SET membre_id = ?, montant = ?, date = ?, statut = ? WHERE id = ?";
  const params = [membre_id, montant, date, statut, id];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Erreur lors de la modification de la cotisation",
        error: err.message,
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        status: "fail",
        message: `Cotisation avec l'ID ${id} non trouvée`,
      });
    }

    res.status(200).json({
      status: "success",
      data: { id, membre_id, montant, date, statut },
    });
  });
};

// Supprimer une cotisation
exports.supprimerCotisation = (req, res) => {
  const id = parseInt(req.params.id);
  const sql = "DELETE FROM cotisations WHERE id = ?";

  db.run(sql, id, function (err) {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Erreur lors de la suppression de la cotisation",
        error: err.message,
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        status: "fail",
        message: `Cotisation avec l'ID ${id} non trouvée`,
      });
    }

    res.status(204).send(); // Succès, aucun contenu à retourner
  });
};
