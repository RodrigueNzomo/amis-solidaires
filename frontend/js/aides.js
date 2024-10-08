document.addEventListener("DOMContentLoaded", () => {
  // Charger les aides via une API
  const chargerAides = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/aides");
      if (!response.ok) throw new Error("Erreur lors du chargement des aides");
      const data = await response.json();
      afficherAides(data.data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  // Afficher les aides dans le tableau
  const afficherAides = (aides) => {
    const tbody = document.getElementById("liste-aides");
    tbody.innerHTML = aides
      .map(
        (aide) => `
      <tr>
        <td>${aide.id}</td>
        <td>${aide.membre_id}</td>
        <td>${aide.montant}</td>
        <td>${aide.date}</td>
        <td>${aide.description}</td>
        <td>${aide.statut}</td>
        <td>
          <button class="btn btn-danger" onclick="supprimerAide(${aide.id})">Supprimer</button>
        </td>
      </tr>
    `
      )
      .join("");
  };

  // Ajouter une aide via un formulaire
  const form = document.getElementById("ajout-aide-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const aideData = {
      membre_id: document.getElementById("membre_id").value,
      montant: document.getElementById("montant").value,
      date: document.getElementById("date").value,
      description: document.getElementById("description").value,
    };

    try {
      const response = await fetch("http://localhost:4000/api/aides", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aideData),
      });
      if (!response.ok) throw new Error("Erreur lors de l'ajout de l'aide");
      chargerAides(); // Recharger les aides après ajout
    } catch (error) {
      console.error("Erreur:", error);
    }
  });

  // Charger les aides au chargement de la page
  chargerAides();
});

// Supprimer une aide
const supprimerAide = async (id) => {
  try {
    const response = await fetch(`http://localhost:4000/api/aides/${id}`, {
      method: "DELETE",
    });
    if (!response.ok)
      throw new Error("Erreur lors de la suppression de l'aide");
    chargerAides(); // Recharger la liste des aides après suppression
  } catch (error) {
    console.error("Erreur:", error);
  }
};

// Fonction pour afficher les aides initialement
let aides = [
  {
    id: 1,
    membre_id: 101,
    montant: 50000,
    date: "2024-08-01",
    description: "Soutien scolaire",
    statut: "en attente",
  },
  {
    id: 2,
    membre_id: 102,
    montant: 25000,
    date: "2024-07-15",
    description: "Aide médicale",
    statut: "accordée",
  },
];

afficherAides(aides);

// Fonction pour trier les aides par montant, date ou statut
function trierAides(critere) {
  const aidesTries = [...aides].sort((a, b) => {
    if (critere === "montant") return a.montant - b.montant;
    if (critere === "date") return new Date(a.date) - new Date(b.date);
    if (critere === "statut") return a.statut.localeCompare(b.statut);
  });
  afficherAides(aidesTries);
}

// Fonction pour filtrer les aides par statut
function filtrerAidesParStatut(statut) {
  const aidesFiltres = aides.filter((aide) => aide.statut === statut);
  afficherAides(aidesFiltres);
}

// Gestionnaire d'événements pour le tri
document.getElementById("tri-montant").addEventListener("click", () => {
  trierAides("montant");
});

document.getElementById("tri-date").addEventListener("click", () => {
  trierAides("date");
});

document.getElementById("tri-statut").addEventListener("click", () => {
  trierAides("statut");
});

// Gestionnaire d'événements pour le filtre de statut
document
  .getElementById("filtre-statut")
  .addEventListener("change", function () {
    const statut = this.value;
    filtrerAidesParStatut(statut);
  });
document.getElementById("logout-btn").addEventListener("click", function () {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
});
