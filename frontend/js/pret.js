// document.addEventListener("DOMContentLoaded", function () {
//   // Charger les prêts via une API
//   function chargerPrets() {
//     fetch("/api/prets")
//       .then((response) => response.json())
//       .then((data) => afficherPrets(data))
//       .catch((error) => console.error("Erreur:", error));
//   }

//   // Afficher les prêts dans le tableau
//   function afficherPrets(prets) {
//     const tbody = document.getElementById("liste-prets");
//     tbody.innerHTML = "";
//     prets.forEach((pret) => {
//       const row = `
//                 <tr>
//                     <td>${pret.id}</td>
//                     <td>${pret.idMembre}</td>
//                     <td>${pret.montant}</td>
//                     <td>${pret.tauxInteret}</td>
//                     <td>${pret.echeance}</td>
//                     <td>
//                         <button onclick="supprimerPret(${pret.id})">Supprimer</button>
//                     </td>
//                 </tr>
//             `;
//       tbody.innerHTML += row;
//     });
//   }

//   // Ajouter un prêt via un formulaire
//   const form = document.getElementById("form-pret");
//   form.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const idMembre = document.getElementById("idMembre").value;
//     const montant = document.getElementById("montant").value;
//     const tauxInteret = document.getElementById("tauxInteret").value;
//     const echeance = document.getElementById("echeance").value;

//     fetch("/api/prets", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ idMembre, montant, tauxInteret, echeance }),
//     })
//       .then((response) => response.json())
//       .then(() => chargerPrets()) // Recharger les prêts après ajout
//       .catch((error) => console.error("Erreur:", error));
//   });

//   // Charger les prêts au chargement de la page
//   chargerPrets();
// });

// function supprimerPret(id) {
//   fetch(`/api/prets/${id}`, {
//     method: "DELETE",
//   })
//     .then(() => chargerPrets()) // Recharger la liste des prêts après suppression
//     .catch((error) => console.error("Erreur:", error));
// }
document.addEventListener("DOMContentLoaded", () => {
  // Charger les prêts via une API
  const chargerPrets = async () => {
    try {
      const response = await fetch("/api/prets");
      const data = await response.json();
      afficherPrets(data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  // Afficher les prêts dans le tableau
  const afficherPrets = (prets) => {
    const tbody = document.getElementById("liste-prets");
    tbody.innerHTML = prets
      .map(
        (pret) => `
      <tr>
        <td>${pret.id}</td>
        <td>${pret.idMembre}</td>
        <td>${pret.montant}</td>
        <td>${pret.tauxInteret}</td>
        <td>${pret.echeance}</td>
        <td>
          <button onclick="supprimerPret(${pret.id})">Supprimer</button>
        </td>
      </tr>
    `
      )
      .join("");
  };

  // Ajouter un prêt via un formulaire
  const form = document.getElementById("form-pret");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const idMembre = document.getElementById("idMembre").value;
    const montant = document.getElementById("montant").value;
    const tauxInteret = document.getElementById("tauxInteret").value;
    const echeance = document.getElementById("echeance").value;

    try {
      await fetch("/api/prets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idMembre, montant, tauxInteret, echeance }),
      });
      chargerPrets(); // Recharger les prêts après ajout
    } catch (error) {
      console.error("Erreur:", error);
    }
  });

  // Charger les prêts au chargement de la page
  chargerPrets();
});

const supprimerPret = async (id) => {
  try {
    await fetch(`/api/prets/${id}`, {
      method: "DELETE",
    });
    chargerPrets(); // Recharger la liste des prêts après suppression
  } catch (error) {
    console.error("Erreur:", error);
  }
};
