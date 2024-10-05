// # Scripts JavaScript pour la logique frontend
// # Fichier JavaScript principal
document.addEventListener("DOMContentLoaded", function () {
  // Exemple de données à afficher dans le tableau de bord
  const statistiques = {
    cotisations: 4500,
    prets: 3000,
    aides: 1200,
  };

  // Insérer les données dans la page
  const statsDiv = document.getElementById("statistiques-donnees");
  statsDiv.innerHTML = `
        <p>Total Cotisations : ${statistiques.cotisations} €</p>
        <p>Total Prêts : ${statistiques.prets} €</p>
        <p>Total Aides : ${statistiques.aides} €</p>
    `;
});

document.addEventListener("DOMContentLoaded", function () {
  // Charger les membres via une API
  function chargerMembres() {
    fetch("/api/membres")
      .then((response) => response.json())
      .then((data) => afficherMembres(data))
      .catch((error) => console.error("Erreur:", error));
  }

  // Afficher les membres dans le tableau
  function afficherMembres(membres) {
    const tbody = document.getElementById("liste-membres");
    tbody.innerHTML = "";
    membres.forEach((membre) => {
      const row = `
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
            `;
      tbody.innerHTML += row;
    });
  }

  // Ajouter un membre via un formulaire
  const form = document.getElementById("form-membre");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const email = document.getElementById("email").value;
    const telephone = document.getElementById("telephone").value;
    const statut = document.getElementById("statut").value;

    fetch("/api/membres", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nom, prenom, email, telephone, statut }),
    })
      .then((response) => response.json())
      .then(() => chargerMembres()) // Recharger les membres après ajout
      .catch((error) => console.error("Erreur:", error));
  });

  // Charger les membres au chargement de la page
  chargerMembres();
});

function modifierMembre(id) {
  // Logique de modification à ajouter ici
}

function supprimerMembre(id) {
  fetch(`/api/membres/${id}`, {
    method: "DELETE",
  })
    .then(() => chargerMembres()) // Recharger la liste des membres après suppression
    .catch((error) => console.error("Erreur:", error));
}
document.addEventListener("DOMContentLoaded", function () {
  // Charger les cotisations via une API
  function chargerCotisations() {
    fetch("/api/cotisations")
      .then((response) => response.json())
      .then((data) => afficherCotisations(data))
      .catch((error) => console.error("Erreur:", error));
  }

  // Afficher les cotisations dans le tableau
  function afficherCotisations(cotisations) {
    const tbody = document.getElementById("liste-cotisations");
    tbody.innerHTML = "";
    cotisations.forEach((cotisation) => {
      const row = `
                <tr>
                    <td>${cotisation.id}</td>
                    <td>${cotisation.idMembre}</td>
                    <td>${cotisation.montant}</td>
                    <td>${cotisation.dateVersement}</td>
                    <td>
                        <button onclick="supprimerCotisation(${cotisation.id})">Supprimer</button>
                    </td>
                </tr>
            `;
      tbody.innerHTML += row;
    });
  }

  // Ajouter une cotisation via un formulaire
  const form = document.getElementById("form-cotisation");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const idMembre = document.getElementById("idMembre").value;
    const montant = document.getElementById("montant").value;
    const dateVersement = document.getElementById("dateVersement").value;

    fetch("/api/cotisations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idMembre, montant, dateVersement }),
    })
      .then((response) => response.json())
      .then(() => chargerCotisations()) // Recharger les cotisations après ajout
      .catch((error) => console.error("Erreur:", error));
  });

  // Charger les cotisations au chargement de la page
  chargerCotisations();
});

function supprimerCotisation(id) {
  fetch(`/api/cotisations/${id}`, {
    method: "DELETE",
  })
    .then(() => chargerCotisations()) // Recharger la liste des cotisations après suppression
    .catch((error) => console.error("Erreur:", error));
}
document.addEventListener("DOMContentLoaded", function () {
  // Charger les prêts via une API
  function chargerPrets() {
    fetch("/api/prets")
      .then((response) => response.json())
      .then((data) => afficherPrets(data))
      .catch((error) => console.error("Erreur:", error));
  }

  // Afficher les prêts dans le tableau
  function afficherPrets(prets) {
    const tbody = document.getElementById("liste-prets");
    tbody.innerHTML = "";
    prets.forEach((pret) => {
      const row = `
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
            `;
      tbody.innerHTML += row;
    });
  }

  // Ajouter un prêt via un formulaire
  const form = document.getElementById("form-pret");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const idMembre = document.getElementById("idMembre").value;
    const montant = document.getElementById("montant").value;
    const tauxInteret = document.getElementById("tauxInteret").value;
    const echeance = document.getElementById("echeance").value;

    fetch("/api/prets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idMembre, montant, tauxInteret, echeance }),
    })
      .then((response) => response.json())
      .then(() => chargerPrets()) // Recharger les prêts après ajout
      .catch((error) => console.error("Erreur:", error));
  });

  // Charger les prêts au chargement de la page
  chargerPrets();
});

function supprimerPret(id) {
  fetch(`/api/prets/${id}`, {
    method: "DELETE",
  })
    .then(() => chargerPrets()) // Recharger la liste des prêts après suppression
    .catch((error) => console.error("Erreur:", error));
}
