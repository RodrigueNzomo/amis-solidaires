const express = require("express");
const router = express.Router();
const cotisationController = require("../controllers/cotisationController");

// Routes CRUD pour les cotisations
router
  .route("/")
  .get(cotisationController.listerCotisations)
  .post(cotisationController.ajouterCotisation);

router.route("/:id").delete(cotisationController.supprimerCotisation);

module.exports = router;
