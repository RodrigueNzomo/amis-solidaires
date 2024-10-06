document
  .getElementById("ajout-aide-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const membre_id = document.getElementById("membre_id").value;
    const montant = document.getElementById("montant").value;
    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;

    fetch("http://localhost:4000/api/aides", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ membre_id, montant, date, description }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Aide ajoutée:", data);
        afficherAides();
      })
      .catch((error) => console.error("Erreur:", error));
  });

function afficherAides() {
  fetch("http://localhost:4000/api/aides")
    .then((response) => response.json())
    .then((data) => {
      const aidesList = document.getElementById("aides-list");
      aidesList.innerHTML = "";
      data.data.forEach((aide) => {
        const aideElement = document.createElement("div");
        aideElement.innerHTML = `
          <p>Membre ID: ${aide.membre_id}</p>
          <p>Montant: ${aide.montant}</p>
          <p>Date: ${aide.date}</p>
          <p>Description: ${aide.description}</p>
          <p>Statut: ${aide.statut}</p>
          <hr>
        `;
        aidesList.appendChild(aideElement);
      });
    })
    .catch((error) => console.error("Erreur:", error));
}

afficherAides();
