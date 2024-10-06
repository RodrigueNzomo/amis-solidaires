const express = require("express");
const router = express.Router();
const membreController = require("../controllers/membreController");

// Routes CRUD pour les membres
router
  .route("/")
  .get(membreController.listerMembres)
  .post(membreController.creerMembre);

router
  .route("/:id")
  .put(membreController.modifierMembre)
  .delete(membreController.supprimerMembre);

module.exports = router;
