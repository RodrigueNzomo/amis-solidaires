document.addEventListener("DOMContentLoaded", () => {
  // Charger les membres via une API
  const chargerMembres = async () => {
    try {
      const response = await fetch("/api/membres");
      if (!response.ok)
        throw new Error("Erreur lors du chargement des membres");
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
          <td>${membre.role}</td>
          <td>${membre.statut}</td>
          <td>
            <button class="btn btn-primary" onclick="modifierMembre(${membre.id})">Modifier</button>
            <button class="btn btn-danger" onclick="supprimerMembre(${membre.id})">Supprimer</button>
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
      nom: form.nom.value,
      prenom: form.prenom.value,
      email: form.email.value,
      telephone: form.telephone.value,
      statut: form.statut.value,
    };

    try {
      const response = await fetch("/api/membres", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(membreData),
      });
      if (!response.ok) throw new Error("Erreur lors de l'ajout du membre");
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
    const response = await fetch(`/api/membres/${id}`, {
      method: "DELETE",
    });
    if (!response.ok)
      throw new Error("Erreur lors de la suppression du membre");
    chargerMembres(); // Recharger la liste des membres après suppression
  } catch (error) {
    console.error("Erreur:", error);
  }
};

// Exemple de données des membres
let membres = [
  {
    id: 1,
    nom: "Jean",
    prenom: "Dupont",
    email: "jean@example.com",
    role: "membre",
    statut: "actif",
  },
  {
    id: 2,
    nom: "Marie",
    prenom: "Durand",
    email: "marie@example.com",
    role: "president",
    statut: "actif",
  },
  {
    id: 3,
    nom: "Paul",
    prenom: "Martin",
    email: "paul@example.com",
    role: "tresorier",
    statut: "inactif",
  },
];

// Fonction pour afficher les membres
function afficherMembres(membresList) {
  const membresTable = document.getElementById("liste-membres");
  membresTable.innerHTML = ""; // Clear table

  membresList.forEach((membre) => {
    const row = `
      <tr>
        <td>${membre.id}</td>
        <td>${membre.nom}</td>
        <td>${membre.prenom}</td>
        <td>${membre.email}</td>
        <td>${membre.role}</td>
        <td>${membre.statut}</td>
      </tr>
    `;
    membresTable.innerHTML += row;
  });
}

// Afficher les membres initialement
afficherMembres(membres);

// Fonction pour trier les membres par rôle ou statut
function trierMembres(critere) {
  const membresTries = [...membres].sort((a, b) => {
    return a[critere].localeCompare(b[critere]);
  });
  afficherMembres(membresTries);
}

// Fonction pour filtrer les membres par rôle
function filtrerMembresParRole(role) {
  const membresFiltres = membres.filter((membre) => membre.role === role);
  afficherMembres(membresFiltres);
}

// Gestionnaire d'événements pour le tri
document
  .getElementById("tri-role")
  .addEventListener("click", () => trierMembres("role"));
document
  .getElementById("tri-statut")
  .addEventListener("click", () => trierMembres("statut"));

// Gestionnaire d'événements pour le filtre de rôle
document.getElementById("filtre-role").addEventListener("change", function () {
  const role = this.value;
  filtrerMembresParRole(role);
});
