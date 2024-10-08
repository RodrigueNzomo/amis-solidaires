document.addEventListener("DOMContentLoaded", () => {
  // Charger les prêts via une API
  const chargerPrets = async () => {
    try {
      const response = await fetch("/api/prets");
      if (!response.ok) throw new Error("Erreur lors du chargement des prêts");
      const data = await response.json();
      afficherPrets(data);
    } catch (error) {
      console.error("Erreur:", error);
      afficherMessageErreur("Erreur lors du chargement des prêts.");
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
        <td>${pret.membre_id}</td>
        <td>${pret.montant}</td>
        <td>${pret.taux_interet}</td>
        <td>${pret.date_debut}</td>
        <td>${pret.date_fin}</td>
        <td>${pret.statut}</td>
        <td>
          <button class="btn btn-danger" onclick="supprimerPret(${pret.id})">Supprimer</button>
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
    const pretData = {
      idMembre: document.getElementById("idMembre").value,
      montant: document.getElementById("montant").value,
      tauxInteret: document.getElementById("tauxInteret").value,
      date_debut: document.getElementById("date_debut").value,
      date_fin: document.getElementById("date_fin").value,
    };

    // Vérifier que tous les champs sont remplis
    if (
      !pretData.idMembre ||
      !pretData.montant ||
      !pretData.date_debut ||
      !pretData.date_fin
    ) {
      afficherMessageErreur(
        "Tous les champs obligatoires doivent être remplis."
      );
      return;
    }

    try {
      const response = await fetch("/api/prets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pretData),
      });
      if (!response.ok) throw new Error("Erreur lors de l'ajout du prêt");
      form.reset(); // Réinitialiser le formulaire après ajout
      chargerPrets(); // Recharger les prêts après ajout
    } catch (error) {
      console.error("Erreur:", error);
      afficherMessageErreur("Erreur lors de l'ajout du prêt.");
    }
  });

  // Charger les prêts au chargement de la page
  chargerPrets();
});

// Fonction pour afficher les messages d'erreur
const afficherMessageErreur = (message) => {
  const erreurDiv = document.getElementById("message-erreur");
  erreurDiv.innerText = message;
  erreurDiv.style.display = "block";
  setTimeout(() => {
    erreurDiv.style.display = "none";
  }, 3000);
};

// Fonction pour supprimer un prêt
const supprimerPret = async (id) => {
  try {
    const response = await fetch(`/api/prets/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erreur lors de la suppression du prêt");
    chargerPrets(); // Recharger la liste des prêts après suppression
  } catch (error) {
    console.error("Erreur:", error);
    afficherMessageErreur("Erreur lors de la suppression du prêt.");
  }
};

// Exemple de données des prêts
let prets = [
  {
    id: 1,
    membre_id: 101,
    montant: 50000,
    date_debut: "2024-08-01",
    date_fin: "2025-08-01",
    statut: "en cours",
  },
  {
    id: 2,
    membre_id: 102,
    montant: 75000,
    date_debut: "2024-07-15",
    date_fin: "2025-07-15",
    statut: "remboursé",
  },
  {
    id: 3,
    membre_id: 103,
    montant: 100000,
    date_debut: "2024-06-01",
    date_fin: "2025-06-01",
    statut: "en cours",
  },
];

// Afficher les prêts initialement
afficherPrets(prets);

// Fonction pour trier les prêts par montant, date ou statut
function trierPrets(critere) {
  const pretsTries = [...prets].sort((a, b) => {
    if (critere === "montant") return a.montant - b.montant;
    if (critere === "date_debut")
      return new Date(a.date_debut) - new Date(b.date_debut);
    if (critere === "statut") return a.statut.localeCompare(b.statut);
  });
  afficherPrets(pretsTries);
}

// Fonction pour filtrer les prêts par statut
function filtrerPretsParStatut(statut) {
  const pretsFiltres = prets.filter((pret) => pret.statut === statut);
  afficherPrets(pretsFiltres);
}

// Gestionnaire d'événements pour le tri
document
  .getElementById("tri-montant")
  .addEventListener("click", () => trierPrets("montant"));
document
  .getElementById("tri-date-debut")
  .addEventListener("click", () => trierPrets("date_debut"));
document
  .getElementById("tri-statut")
  .addEventListener("click", () => trierPrets("statut"));

// Gestionnaire d'événements pour le filtre de statut
document
  .getElementById("filtre-statut")
  .addEventListener("change", function () {
    const statut = this.value;
    filtrerPretsParStatut(statut);
  });
document.getElementById("logout-btn").addEventListener("click", function () {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
});
