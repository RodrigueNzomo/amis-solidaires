// # Scripts JavaScript pour la logique frontend
// # Fichier JavaScript principal
// document.addEventListener("DOMContentLoaded", function () {
//   // Exemple de données à afficher dans le tableau de bord
//   const statistiques = {
//     cotisations: 4500,
//     prets: 3000,
//     aides: 1200,
//   };

//   // Insérer les données dans la page
//   const statsDiv = document.getElementById("statistiques-donnees");
//   statsDiv.innerHTML = `
//         <p>Total Cotisations : ${statistiques.cotisations} FCFA</p>
//         <p>Total Prêts : ${statistiques.prets} FCFA</p>
//         <p>Total Aides : ${statistiques.aides} FCFA</p>
//     `;
// });
// Fichier JavaScript principal
document.addEventListener("DOMContentLoaded", () => {
  // Exemple de données à afficher dans le tableau de bord
  const statistiques = {
    cotisations: 4500,
    prets: 3000,
    aides: 1200,
  };

  // Insérer les données dans la page
  const statsDiv = document.getElementById("statistiques-donnees");
  statsDiv.innerHTML = Object.entries(statistiques)
    .map(
      ([key, value]) =>
        `<p>Total ${capitalizeFirstLetter(key)} : ${value} FCFA</p>`
    )
    .join("");
});

// Fonction utilitaire pour capitaliser la première lettre d'une chaîne
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
