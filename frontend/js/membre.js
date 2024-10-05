// document.addEventListener("DOMContentLoaded", function () {
//   // Charger les membres via une API
//   function chargerMembres() {
//     fetch("/api/membres")
//       .then((response) => response.json())
//       .then((data) => afficherMembres(data))
//       .catch((error) => console.error("Erreur:", error));
//   }

//   // Afficher les membres dans le tableau
//   function afficherMembres(membres) {
//     const tbody = document.getElementById("liste-membres");
//     tbody.innerHTML = "";
//     membres.forEach((membre) => {
//       const row = `
//                 <tr>
//                     <td>${membre.id}</td>
//                     <td>${membre.nom}</td>
//                     <td>${membre.prenom}</td>
//                     <td>${membre.email}</td>
//                     <td>${membre.telephone}</td>
//                     <td>
//                         <button onclick="modifierMembre(${membre.id})">Modifier</button>
//                         <button onclick="supprimerMembre(${membre.id})">Supprimer</button>
//                     </td>
//                 </tr>
//             `;
//       tbody.innerHTML += row;
//     });
//   }

//   // Ajouter un membre via un formulaire
//   const form = document.getElementById("form-membre");
//   form.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const nom = document.getElementById("nom").value;
//     const prenom = document.getElementById("prenom").value;
//     const email = document.getElementById("email").value;
//     const telephone = document.getElementById("telephone").value;
//     const statut = document.getElementById("statut").value;

//     fetch("/api/membres", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ nom, prenom, email, telephone, statut }),
//     })
//       .then((response) => response.json())
//       .then(() => chargerMembres()) // Recharger les membres après ajout
//       .catch((error) => console.error("Erreur:", error));
//   });

//   // Charger les membres au chargement de la page
//   chargerMembres();
// });

// function modifierMembre(id) {
//   // Logique de modification à ajouter ici
// }

// function supprimerMembre(id) {
//   fetch(`/api/membres/${id}`, {
//     method: "DELETE",
//   })
//     .then(() => chargerMembres()) // Recharger la liste des membres après suppression
//     .catch((error) => console.error("Erreur:", error));
// }
document.addEventListener("DOMContentLoaded", () => {
  // Charger les membres via une API
  const chargerMembres = async () => {
    try {
      const response = await fetch("/api/membres");
      const data = await response.json();
      afficherMembres(data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  // Afficher les membres dans le tableau
  const afficherMembres = (membres) => {
    const tbody = document.getElementById("liste-membres");
    tbody.innerHTML = membres
      .map(
        (membre) => `
      <tr>
        <td>${membre.id}</td>
        <td>${membre.nom}</td>
        <td>${membre.prenom}</td>
        <td>${membre.email}</td>
        <td>${membre.telephone}</td>
        <td>
          <button onclick="modifierMembre(${membre.id})">Modifier</button>
          <button onclick="supprimerMembre(${membre.id})">Supprimer</button>
        </td>
      </tr>
    `
      )
      .join("");
  };

  // Ajouter un membre via un formulaire
  const form = document.getElementById("form-membre");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const membreData = {
      nom: document.getElementById("nom").value,
      prenom: document.getElementById("prenom").value,
      email: document.getElementById("email").value,
      telephone: document.getElementById("telephone").value,
      statut: document.getElementById("statut").value,
    };

    try {
      await fetch("/api/membres", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(membreData),
      });
      chargerMembres(); // Recharger les membres après ajout
    } catch (error) {
      console.error("Erreur:", error);
    }
  });

  // Charger les membres au chargement de la page
  chargerMembres();
});

const modifierMembre = (id) => {
  // Logique de modification à ajouter ici
};

const supprimerMembre = async (id) => {
  try {
    await fetch(`/api/membres/${id}`, {
      method: "DELETE",
    });
    chargerMembres(); // Recharger la liste des membres après suppression
  } catch (error) {
    console.error("Erreur:", error);
  }
};
