const express = require("express");
const router = express.Router();
const pretController = require("../controllers/pretController");

// Routes CRUD pour les prêts
router
  .route("/")
  .get(pretController.listerPrets)
  .post(pretController.ajouterPret);

router.route("/:id").delete(pretController.supprimerPret);

module.exports = router;
