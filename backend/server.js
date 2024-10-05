// server.js : Point d'entrée pour le serveur backend avec Express.js.
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Import des routes
const membreRoutes = require("./routes/membreRoutes");
const cotisationRoutes = require("./routes/cotisationRoutes");
const pretRoutes = require("./routes/pretRoutes");

// Utilisation des routes
app.use("/api/membres", membreRoutes);
app.use("/api/cotisations", cotisationRoutes);
app.use("/api/prets", pretRoutes);

// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Le serveur fonctionne sur le port ${port}`);
});
