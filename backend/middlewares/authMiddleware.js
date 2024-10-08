const jwt = require("jsonwebtoken");

// Middleware pour vérifier le token JWT
const verifierToken = (req, res, next) => {
  // Vérification dans les en-têtes ou les cookies (si pertinent)
  const authHeader = req.headers["authorization"];
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : req.cookies
      ? req.cookies.token
      : null; // Option d'utilisation des cookies

  // Si aucun token n'est trouvé
  if (!token) {
    return res.status(403).json({
      status: "fail",
      message: "Un token valide est requis pour l'authentification",
    });
  }

  // Vérifier la validité du token JWT
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

    // Stocker les informations décodées du token dans req.user
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
