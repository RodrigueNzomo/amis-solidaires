const db = require("../models/pretModel");

// Lister tous les prêts
exports.listerPrets = (req, res) => {
  const sql = "SELECT * FROM prets";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Erreur lors de la récupération des prêts",
        error: err.message,
      });
    }

    if (rows.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Aucun prêt trouvé",
      });
    }

    res.status(200).json({
      status: "success",
      data: rows,
    });
  });
};

// Créer un prêt avec validation
exports.creerPret = (req, res) => {
  const { membre_id, montant, date_debut, date_fin, taux_interet } = req.body;

  // Vérification des données obligatoires
  if (!membre_id || !montant || !date_debut || !date_fin) {
    return res.status(400).json({
      status: "fail",
      message:
        "Le membre, le montant, la date de début et la date de fin sont obligatoires",
    });
  }

  const sql = `INSERT INTO prets (membre_id, montant, date_debut, date_fin, taux_interet, statut) 
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [
    membre_id,
    montant,
    date_debut,
    date_fin,
    taux_interet || 0, // Si taux d'intérêt n'est pas fourni, valeur par défaut 0
    "en cours", // Statut par défaut lors de la création
  ];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Erreur lors de la création du prêt",
        error: err.message,
      });
    }

    // Renvoi du prêt créé avec succès
    res.status(201).json({
      status: "success",
      data: {
        id: this.lastID,
        membre_id,
        montant,
        date_debut,
        date_fin,
        taux_interet: taux_interet || 0,
        statut: "en cours",
      },
    });
  });
};

// Modifier un prêt avec validation
exports.modifierPret = (req, res) => {
  const { membre_id, montant, date_debut, date_fin, taux_interet, statut } =
    req.body;

  // Assurez-vous que l'ID est bien un entier et valide
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({
      status: "fail",
      message: "ID invalide",
    });
  }

  // Vérification des données obligatoires
  if (!membre_id || !montant || !date_debut || !date_fin || !statut) {
    return res.status(400).json({
      status: "fail",
      message:
        "Le membre, le montant, les dates et le statut sont obligatoires",
    });
  }

  const sql = `UPDATE prets SET membre_id = ?, montant = ?, date_debut = ?, date_fin = ?, taux_interet = ?, statut = ? WHERE id = ?`;
  const params = [
    membre_id,
    montant,
    date_debut,
    date_fin,
    taux_interet || 0,
    statut,
    id,
  ];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Erreur lors de la modification du prêt",
        error: err.message,
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        status: "fail",
        message: `Prêt avec l'ID ${id} non trouvé`,
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        id,
        membre_id,
        montant,
        date_debut,
        date_fin,
        taux_interet,
        statut,
      },
    });
  });
};

// Supprimer un prêt
exports.supprimerPret = (req, res) => {
  const id = parseInt(req.params.id, 10); // Validation pour convertir l'ID en entier

  if (isNaN(id)) {
    return res.status(400).json({
      status: "fail",
      message: "ID invalide",
    });
  }

  const sql = `DELETE FROM prets WHERE id = ?`;

  db.run(sql, id, function (err) {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Erreur lors de la suppression du prêt",
        error: err.message,
      });
    }

    // Si aucun prêt n'a été supprimé
    if (this.changes === 0) {
      return res.status(404).json({
        status: "fail",
        message: `Prêt avec l'ID ${id} non trouvé`,
      });
    }

    res.status(204).send(); // Succès, aucun contenu à retourner
  });
};
