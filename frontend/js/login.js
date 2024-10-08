document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Vérification des champs vides
    if (!email || !password) {
      document.getElementById("error-message").textContent =
        "Tous les champs doivent être remplis.";
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Stocker le token JWT dans localStorage
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("isLoggedIn", true);

        // Redirection vers la page de tableau de bord
        window.location.href = "index.html";
      } else {
        // Afficher un message d'erreur détaillé
        document.getElementById("error-message").textContent =
          result.message || "Erreur d'authentification, veuillez réessayer.";
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      document.getElementById("error-message").textContent =
        "Une erreur est survenue lors de la connexion. Veuillez réessayer.";
    }
  });

// Vérification de l'état de la connexion
document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "login.html";
  }
});
