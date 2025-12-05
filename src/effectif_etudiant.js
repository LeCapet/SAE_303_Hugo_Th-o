// ==========================================================
// 1. Composant A-Frame : bar-point-generator
// Gère l'événement de clic et la génération des points AR.
// ==========================================================
AFRAME.registerComponent('bar-point-generator', {
  schema: {
    points: {type: 'number', default: 10} // Nombre de points à afficher
  },

  init: function () {
    const el = this.el;
    this.clickHandler = this.clickHandler.bind(this);
    el.addEventListener('click', this.clickHandler);
  },

  clickHandler: function (evt) {
    const targetEntity = this.el.parentNode; // L'entité cible (mindar-image-target)
    const numberOfPoints = this.data.points;
    
    // --- 1. Message d'alerte simple ---
    console.log(`Barre cliquée! Génération de ${numberOfPoints} points.`);
    alert(`Barre cliquée. Affichage de ${numberOfPoints} points.`);

    // Supprimer les points précédents pour éviter l'accumulation
    const oldPoints = targetEntity.querySelectorAll('.generated-point');
    oldPoints.forEach(point => point.parentNode.removeChild(point));

    // --- 2. Logique de génération des points (sphères) ---
    for (let i = 0; i < numberOfPoints; i++) {
      const pointEl = document.createElement('a-sphere');
      
      // Calcule une position aléatoire au-dessus de la zone AR (simule un nuage de points)
      // Ces coordonnées sont relatives à la cible AR.
      const x = (Math.random() - 0.5) * 0.5;
      const y = (Math.random() * 0.5) + 0.1;
      const z = 0.01;
      
      pointEl.setAttribute('position', `${x} ${y} ${z}`);
      pointEl.setAttribute('radius', '0.02');
      pointEl.setAttribute('color', 'yellow');
      pointEl.setAttribute('class', 'generated-point'); 
      
      // Ajouter une petite animation de rotation
      pointEl.setAttribute('animation', {
          property: 'rotation',
          to: '0 360 0',
          loop: true,
          dur: 3000
      });
      
      targetEntity.appendChild(pointEl);
    }
  },

  remove: function () {
    this.el.removeEventListener('click', this.clickHandler);
  }
});


// ==========================================================
// 2. Logique d'initialisation des événements (minimaliste)
// ==========================================================
document.addEventListener("DOMContentLoaded", function() {
  // Gestion des événements de cible
  const exampleTarget = document.querySelector('#example-target');
  if (exampleTarget) {
    exampleTarget.addEventListener("targetFound", event => {
      console.log("Cible trouvée : affiche_formation_biterois");
    });
    exampleTarget.addEventListener("targetLost", event => {
      console.log("Cible perdue");
    });
  }
});