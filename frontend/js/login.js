document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        window.location.href = "index.html"; // Redirection vers le tableau de bord
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
    }
  });
