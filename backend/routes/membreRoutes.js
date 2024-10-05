// const express = require("express");
// const router = express.Router();
// const membreController = require("../controllers/membreController");

// // Routes CRUD pour les membres
// router.get("/", membreController.listerMembres);
// router.post("/", membreController.creerMembre);
// router.put("/:id", membreController.modifierMembre);
// router.delete("/:id", membreController.supprimerMembre);

// module.exports = router;
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
