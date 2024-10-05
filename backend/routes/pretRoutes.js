const express = require("express");
const router = express.Router();
const pretController = require("../controllers/pretController");

// Routes pour la gestion des prêts
router.get("/", pretController.listerPrets);
router.post("/", pretController.ajouterPret);
router.delete("/:id", pretController.supprimerPret);

module.exports = router;
