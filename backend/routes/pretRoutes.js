// controllers/pretController.js
const db = require("../models/pretModel");

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

// Les autres méthodes du contrôleur ici...
