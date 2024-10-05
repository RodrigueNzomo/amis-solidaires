const express = require("express");
const router = express.Router();
const cotisationController = require("../controllers/cotisationController");

// Routes pour la gestion des cotisations
router.get("/", cotisationController.listerCotisations);
router.post("/", cotisationController.ajouterCotisation);
router.delete("/:id", cotisationController.supprimerCotisation);

module.exports = router;
