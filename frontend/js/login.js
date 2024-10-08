document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Vérification des champs vides
    if (!email || !password) {
      alert("Veuillez remplir tous les champs.");
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
        // Optionnel : Stocker le token JWT dans localStorage ou dans un cookie
        localStorage.setItem("token", result.data.token);

        // Redirection vers la page de tableau de bord
        window.location.href = "index.html";
      } else {
        // Afficher un message d'erreur détaillé
        alert(
          result.message || "Erreur d'authentification, veuillez réessayer."
        );
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      alert(
        "Une erreur est survenue lors de la connexion. Veuillez réessayer."
      );
    }
  });

document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      document.getElementById("error-message").textContent =
        "Tous les champs doivent être remplis.";
      return;
    }

    const utilisateurs = [
      { email: "test1@example.com", password: "password123" },
      { email: "test2@example.com", password: "password456" },
    ];

    const utilisateur = utilisateurs.find(
      (user) => user.email === email && user.password === password
    );

    if (utilisateur) {
      localStorage.setItem("isLoggedIn", true);
      window.location.href = "index.html";
    } else {
      document.getElementById("error-message").textContent =
        "Identifiants invalides. Veuillez réessayer.";
    }
  });

// Code à ajouter dans chaque page pour vérifier l'état de la connexion
document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "login.html";
  }
});

// document
//   .getElementById("login-form")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();

//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     if (email === "test1@example.com" && password === "password123") {
//       sessionStorage.setItem("isLoggedIn", true);
//       window.location.href = "index.html";
//     } else {
//       alert("Identifiants invalides");
//     }
//   });
