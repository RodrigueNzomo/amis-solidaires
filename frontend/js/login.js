document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "admin@amissolidaires.com" && password === "password") {
      sessionStorage.setItem("isLoggedIn", true);
      window.location.href = "index.html";
    } else {
      alert("Identifiants incorrects. Veuillez réessayer.");
    }
  });
