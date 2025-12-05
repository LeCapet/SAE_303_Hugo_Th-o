// src/ar-utils.js (Version minimale pour la bascule)

let activeBarId = null; 
let activeSectorId = null; 

function removeAllARContent(targetEntity) {
    // Supprime uniquement les éléments générés par les barres
    targetEntity.querySelectorAll('.generated-point, .warning-text').forEach(el => {
        el.parentNode.removeChild(el);
    });
}

function resetAllStates() {
    // Si un secteur de camembert était actif, on rétablit son image
    if (activeSectorId) {
        const activeEl = document.querySelector(`#${activeSectorId}`);
        if (activeEl && activeEl.components['camembert-interactif']) {
            activeEl.components['camembert-interactif'].deactivateSector();
        }
    }
    activeBarId = null;
    activeSectorId = null;
}