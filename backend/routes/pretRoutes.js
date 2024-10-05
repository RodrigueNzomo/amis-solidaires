// const express = require("express");
// const router = express.Router();
// const pretController = require("../controllers/pretController");

// // Routes CRUD pour les prêts
// router.get("/", pretController.listerPrets);
// router.post("/", pretController.ajouterPret);
// router.delete("/:id", pretController.supprimerPret);

// module.exports = router;
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
