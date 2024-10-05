// document.addEventListener("DOMContentLoaded", function () {
//   // Charger les cotisations via une API
//   function chargerCotisations() {
//     fetch("/api/cotisations")
//       .then((response) => response.json())
//       .then((data) => afficherCotisations(data))
//       .catch((error) => console.error("Erreur:", error));
//   }

//   // Afficher les cotisations dans le tableau
//   function afficherCotisations(cotisations) {
//     const tbody = document.getElementById("liste-cotisations");
//     tbody.innerHTML = "";
//     cotisations.forEach((cotisation) => {
//       const row = `
//                 <tr>
//                     <td>${cotisation.id}</td>
//                     <td>${cotisation.idMembre}</td>
//                     <td>${cotisation.montant}</td>
//                     <td>${cotisation.dateVersement}</td>
//                     <td>
//                         <button onclick="supprimerCotisation(${cotisation.id})">Supprimer</button>
//                     </td>
//                 </tr>
//             `;
//       tbody.innerHTML += row;
//     });
//   }

//   // Ajouter une cotisation via un formulaire
//   const form = document.getElementById("form-cotisation");
//   form.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const idMembre = document.getElementById("idMembre").value;
//     const montant = document.getElementById("montant").value;
//     const dateVersement = document.getElementById("dateVersement").value;

//     fetch("/api/cotisations", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ idMembre, montant, dateVersement }),
//     })
//       .then((response) => response.json())
//       .then(() => chargerCotisations()) // Recharger les cotisations après ajout
//       .catch((error) => console.error("Erreur:", error));
//   });

//   // Charger les cotisations au chargement de la page
//   chargerCotisations();
// });

// function supprimerCotisation(id) {
//   fetch(`/api/cotisations/${id}`, {
//     method: "DELETE",
//   })
//     .then(() => chargerCotisations()) // Recharger la liste des cotisations après suppression
//     .catch((error) => console.error("Erreur:", error));
// }
document.addEventListener("DOMContentLoaded", () => {
  // Charger les cotisations via une API
  const chargerCotisations = async () => {
    try {
      const response = await fetch("/api/cotisations");
      const data = await response.json();
      afficherCotisations(data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  // Afficher les cotisations dans le tableau
  const afficherCotisations = (cotisations) => {
    const tbody = document.getElementById("liste-cotisations");
    tbody.innerHTML = cotisations
      .map(
        (cotisation) => `
      <tr>
        <td>${cotisation.id}</td>
        <td>${cotisation.idMembre}</td>
        <td>${cotisation.montant}</td>
        <td>${cotisation.dateVersement}</td>
        <td>
          <button onclick="supprimerCotisation(${cotisation.id})">Supprimer</button>
        </td>
      </tr>
    `
      )
      .join("");
  };

  // Ajouter une cotisation via un formulaire
  const form = document.getElementById("form-cotisation");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const idMembre = document.getElementById("idMembre").value;
    const montant = document.getElementById("montant").value;
    const dateVersement = document.getElementById("dateVersement").value;

    try {
      await fetch("/api/cotisations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idMembre, montant, dateVersement }),
      });
      chargerCotisations(); // Recharger les cotisations après ajout
    } catch (error) {
      console.error("Erreur:", error);
    }
  });

  // Charger les cotisations au chargement de la page
  chargerCotisations();
});

const supprimerCotisation = async (id) => {
  try {
    await fetch(`/api/cotisations/${id}`, {
      method: "DELETE",
    });
    chargerCotisations(); // Recharger la liste des cotisations après suppression
  } catch (error) {
    console.error("Erreur:", error);
  }
};
