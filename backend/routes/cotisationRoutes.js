const express = require("express");
const router = express.Router();
const cotisationController = require("../controllers/cotisationController");

// Correction de la route get pour lister les cotisations
router.get("/", cotisationController.listerCotisations); // Doit être une fonction, pas un objet

// Autres routes, également avec des fonctions valides
router.post("/", cotisationController.creerCotisation);
router.put("/:id", cotisationController.modifierCotisation);
router.delete("/:id", cotisationController.supprimerCotisation);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const cotisationController = require("../controllers/cotisationController");
// const verifierToken = require("../middlewares/authMiddleware");
// const verifierRole = require("../middlewares/roleMiddleware");

// // Routes CRUD pour les cotisations avec protection JWT et gestion des rôles
// router
//   .route("/")
//   .get(
//     verifierToken,
//     verifierRole(["president", "tresorier"]),
//     cotisationController.listerCotisations
//   )
//   .post(
//     verifierToken,
//     verifierRole(["tresorier"]),
//     cotisationController.creerCotisation
//   );

// router
//   .route("/:id")
//   .put(
//     verifierToken,
//     verifierRole(["tresorier"]),
//     cotisationController.modifierCotisation
//   )
//   .delete(
//     verifierToken,
//     verifierRole(["president"]),
//     cotisationController.supprimerCotisation
//   );

// module.exports = router;
