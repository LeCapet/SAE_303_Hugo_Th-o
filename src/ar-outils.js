function removeAllARContent(targetEntity) {
    // Supprime tous les éléments qui ont les classes 'generated-point' OU 'warning-text'
    targetEntity.querySelectorAll('.generated-point, .warning-text').forEach(el => {
        el.parentNode.removeChild(el);
    });
    console.log("Nettoyage de l'espace AR effectué.");
}

// Fonction pour réinitialiser l'état global (utile en cas de perte de cible)
function resetGlobalARState() {
    // Dans notre cas, nous gérons activeBarId dans effectif_etudiant.js,
    // mais si d'autres états globaux existaient, ils seraient gérés ici.
}