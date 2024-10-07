const jwt = require("jsonwebtoken");

// Middleware pour vérifier le token JWT
const verifierToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Récupérer l'en-tête Authorization

  // Vérifier si l'en-tête contient un token Bearer
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      status: "fail",
      message: "Un token valide est requis pour l'authentification",
    });
  }

  // Extraire le token de l'en-tête
  const token = authHeader.split(" ")[1];

  // Vérifier la validité du token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          status: "fail",
          message: "Token expiré. Veuillez vous reconnecter.",
        });
      }
      return res.status(401).json({
        status: "fail",
        message: "Token invalide",
      });
    }

    // Stocker les informations du token décodé dans req.user
    req.user = decoded;
    next(); // Passer au middleware suivant
  });
};

// Middleware pour vérifier les rôles d'accès
const verifierRole = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Récupérer le rôle de l'utilisateur du token

    // Vérifier si le rôle de l'utilisateur est autorisé
    if (!roles.includes(userRole)) {
      return res.status(403).json({
        status: "fail",
        message: "Accès refusé. Vous n'avez pas les permissions nécessaires.",
      });
    }

    next(); // L'utilisateur a le bon rôle, continuer
  };
};

module.exports = { verifierToken, verifierRole };
