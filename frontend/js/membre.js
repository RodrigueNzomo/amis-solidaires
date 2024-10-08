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
      afficherMessageErreur("Erreur lors du chargement des membres.");
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

    // Vérifier que tous les champs sont remplis
    if (!membreData.nom || !membreData.prenom || !membreData.email) {
      afficherMessageErreur(
        "Tous les champs obligatoires doivent être remplis."
      );
      return;
    }

    try {
      const response = await fetch("/api/membres", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(membreData),
      });
      if (!response.ok) throw new Error("Erreur lors de l'ajout du membre");
      form.reset(); // Réinitialiser le formulaire
      chargerMembres(); // Recharger les membres après ajout
    } catch (error) {
      console.error("Erreur:", error);
      afficherMessageErreur("Erreur lors de l'ajout du membre.");
    }
  });

  // Charger les membres au chargement de la page
  chargerMembres();
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

// Exemple de suppression de membre
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
    afficherMessageErreur("Erreur lors de la suppression du membre.");
  }
};
