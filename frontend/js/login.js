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
