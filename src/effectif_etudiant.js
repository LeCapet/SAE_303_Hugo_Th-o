let activeBarId = null;


AFRAME.registerComponent('bar-point-generator', {
  schema: {
    // La propriété 'originalValue' est supprimée du schéma
    points: {type: 'number', default: 10} 
  },

  init: function () {
    const el = this.el;
    this.clickHandler = this.clickHandler.bind(this);
    el.addEventListener('click', this.clickHandler);
  },

  clickHandler: function (evt) {
    const el = this.el;
    const targetEntity = el.parentNode; 
    const numberOfPoints = this.data.points; 
    
    // La lecture de 'originalValue' est supprimée ici

    // 1. GESTION DE LA DÉSACIVATION
    if (activeBarId === el.id) {
      console.log(`Bascule OFF : Barre ID ${el.id} re-cliquée. Désactivation.`);
      removeAllARContent(targetEntity); 
      activeBarId = null; 
      return; 
    }
    
    // 2. GESTION DE L'ACTIVATION
    
    // A. Nettoyer la scène (Désactivation de l'ancienne barre)
    if (activeBarId !== null) {
        removeAllARContent(targetEntity);
        console.log(`Bascule ON : Désactivation de l'ancienne barre (${activeBarId}).`);
    }
    
    // B. Marquer la nouvelle barre comme active
    activeBarId = el.id; 
    console.log(`Bascule ON : Activation de la nouvelle barre ID ${el.id}.`);
    
    // C. Génération des nouveaux points (code inchangé)
    for (let i = 0; i < numberOfPoints; i++) {
        const pointEl = document.createElement('a-sphere');
        const x = (Math.random() - 0.5) * 0.8; 
        const y = (Math.random() - 0.5) * 0.8;
        const z = (Math.random() * 0.45) + 0.05; 
        pointEl.setAttribute('position', `${x} ${y} ${z}`);
        pointEl.setAttribute('radius', '0.01'); 
        pointEl.setAttribute('color', 'yellow');
        pointEl.setAttribute('class', 'generated-point'); 
        pointEl.setAttribute('animation', { property: 'rotation', to: '0 360 0', loop: true, dur: 3000 });
        targetEntity.appendChild(pointEl);
    }

    // D. Affichage du texte d'avertissement
    const warningTextEl = document.createElement('a-text');
    
    // Texte simplifié pour ne garder que l'explication du point
    warningTextEl.setAttribute('value', `Chaque point représente environ 10 étudiants`); 
    
    warningTextEl.setAttribute('position', `0 0.6 0.2`); 
    warningTextEl.setAttribute('align', 'center');
    warningTextEl.setAttribute('width', '1.5'); 
    warningTextEl.setAttribute('color', 'white'); 
    warningTextEl.setAttribute('class', 'warning-text'); 
    
    targetEntity.appendChild(warningTextEl);
  },

  remove: function () {
    this.el.removeEventListener('click', this.clickHandler);
  }
});

// ==========================================================
// 2. Logique d'initialisation des événements
// ==========================================================
document.addEventListener("DOMContentLoaded", function() {
  const exampleTarget = document.querySelector('#example-target');
  
  if (exampleTarget) {
    exampleTarget.addEventListener("targetFound", event => {
      console.log("Cible trouvée.");
    });
    exampleTarget.addEventListener("targetLost", event => {
      console.log("Cible perdue.");
      
      const targetEntity = document.querySelector('#example-target');
      if (targetEntity) {
        // Le composant n'est pas nécessaire ici, appel direct de la fonction globale
        removeAllARContent(targetEntity);
        activeBarId = null; 
      }
    });
  }
});