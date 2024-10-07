const express = require("express");
const router = express.Router();
const aideController = require("../controllers/aideController");

// Routes CRUD pour les aides
router
  .route("/")
  .get(aideController.listerAides) // Assurez-vous que listerAides est une fonction, pas un objet
  .post(aideController.creerAide);

router
  .route("/:id")
  .put(aideController.modifierAide)
  .delete(aideController.supprimerAide);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const aideController = require("../controllers/aideController");
// const verifierToken = require("../middlewares/authMiddleware");
// const verifierRole = require("../middlewares/roleMiddleware");

// // Routes CRUD pour les aides avec protection JWT et gestion des rôles
// router.get(
//   "/",
//   verifierToken,
//   verifierRole(["president", "tresorier"]),
//   aideController.listerAides
// );
// router.post(
//   "/",
//   verifierToken,
//   verifierRole(["tresorier"]),
//   aideController.creerAide
// );
// router.put(
//   "/:id",
//   verifierToken,
//   verifierRole(["tresorier"]),
//   aideController.modifierAide
// );
// router.delete(
//   "/:id",
//   verifierToken,
//   verifierRole(["president"]),
//   aideController.supprimerAide
// );

// module.exports = router;
