document.addEventListener("DOMContentLoaded", () => {
  // Charger les cotisations via une API
  const chargerCotisations = async () => {
    try {
      const response = await fetch("/api/cotisations");
      if (!response.ok)
        throw new Error("Erreur lors du chargement des cotisations");
      const data = await response.json();
      cotisations = data; // Mettre à jour la variable globale cotisations
      afficherCotisations(cotisations);
    } catch (error) {
      console.error("Erreur lors du chargement des cotisations :", error);
      afficherMessageErreur("Erreur lors du chargement des cotisations.");
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
          <td>${cotisation.membre_id}</td>
          <td>${cotisation.montant}</td>
          <td>${cotisation.date}</td>
          <td>${cotisation.statut}</td>
          <td>
            <button class="btn btn-danger" onclick="supprimerCotisation(${cotisation.id})">Supprimer</button>
          </td>
        </tr>
      `
      )
      .join("");
  };

  // Ajouter une cotisation via le formulaire
  document
    .getElementById("form-cotisation")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const idMembre = document.getElementById("idMembre").value;
      const montant = document.getElementById("montant").value;
      const dateVersement = document.getElementById("dateVersement").value;

      // Vérifier que les champs sont remplis
      if (!idMembre || !montant || !dateVersement) {
        afficherMessageErreur("Tous les champs doivent être remplis.");
        return;
      }

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
        console.error("Erreur lors de l'ajout de la cotisation :", error);
        afficherMessageErreur("Erreur lors de l'ajout de la cotisation.");
      }
    });

  // Supprimer une cotisation
  const supprimerCotisation = async (id) => {
    try {
      await fetch(`/api/cotisations/${id}`, {
        method: "DELETE",
      });
      chargerCotisations(); // Recharger les cotisations après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression de la cotisation :", error);
      afficherMessageErreur("Erreur lors de la suppression de la cotisation.");
    }
  };

  // Fonction pour trier les cotisations par critère (montant, date ou statut)
  const trierCotisations = (critere) => {
    const cotisationsTries = [...cotisations].sort((a, b) => {
      if (critere === "montant") return a.montant - b.montant;
      if (critere === "date") return new Date(a.date) - new Date(b.date);
      if (critere === "statut") return a.statut.localeCompare(b.statut);
    });
    afficherCotisations(cotisationsTries);
  };

  // Fonction pour filtrer les cotisations par statut
  const filtrerCotisationsParStatut = (statut) => {
    const cotisationsFiltres = cotisations.filter(
      (cotisation) => cotisation.statut === statut || statut === ""
    );
    afficherCotisations(cotisationsFiltres);
  };

  // Gestion des événements pour le tri et le filtre
  document
    .getElementById("tri-montant")
    .addEventListener("click", () => trierCotisations("montant"));
  document
    .getElementById("tri-date")
    .addEventListener("click", () => trierCotisations("date"));
  document
    .getElementById("tri-statut")
    .addEventListener("click", () => trierCotisations("statut"));

  document
    .getElementById("filtre-statut")
    .addEventListener("change", function () {
      filtrerCotisationsParStatut(this.value);
    });

  // Charger les cotisations au chargement de la page
  chargerCotisations();
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

// Exemple de données de cotisations pour démonstration
let cotisations = [
  {
    id: 1,
    membre_id: 101,
    montant: 15000,
    date: "2024-08-01",
    statut: "payée",
  },
  {
    id: 2,
    membre_id: 102,
    montant: 20000,
    date: "2024-08-05",
    statut: "en retard",
  },
  {
    id: 3,
    membre_id: 103,
    montant: 10000,
    date: "2024-08-10",
    statut: "payée",
  },
];

// Affichage initial des cotisations
afficherCotisations(cotisations);
