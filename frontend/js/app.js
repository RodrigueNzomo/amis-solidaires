document.addEventListener("DOMContentLoaded", () => {
  // Exemple de données à afficher dans le tableau de bord
  const statistiques = {
    cotisations: 4500,
    prets: 3000,
    aides: 1200,
  };

  // Insérer les données dans la section dédiée aux statistiques
  const statsDiv = document.getElementById("statistiques-donnees");

  // Vérifier si l'élément statsDiv existe
  if (statsDiv) {
    statsDiv.innerHTML = Object.entries(statistiques)
      .map(
        ([key, value]) =>
          `<p>Total ${capitalizeFirstLetter(
            key
          )} : ${value.toLocaleString()} FCFA</p>`
      )
      .join("");
  } else {
    console.error("L'élément #statistiques-donnees est introuvable.");
  }
});

// Fonction utilitaire pour capitaliser la première lettre d'une chaîne
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
