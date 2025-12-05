// Variable globale pour suivre la dernière barre active (ID de l'entité)
let activeBarId = null;

// 1. Composant A-Frame : bar-point-generator

AFRAME.registerComponent('bar-point-generator', {
  schema: {
    points: {type: 'number', default: 10}, 
    // CORRECTION ICI : Utiliser 'originalValue' (camelCase)
    originalValue: {type: 'number', default: 0} 
  },

  init: function () {
    const el = this.el;
    this.clickHandler = this.clickHandler.bind(this);
    el.addEventListener('click', this.clickHandler);
  },

  removeAllPoints: function(targetEntity) {
    targetEntity.querySelectorAll('.generated-point, .warning-text').forEach(el => {
        el.parentNode.removeChild(el)
    });
  },

  clickHandler: function (evt) {
    const el = this.el;
    const targetEntity = el.parentNode; 
    const numberOfPoints = this.data.points; 
    
    // CORRECTION ICI : Lire la propriété en 'camelCase'
    const originalValue = this.data.originalValue; 

    // --- LOGIQUE DE FLUX (inchangée) ---
    
    // 1. GESTION DE LA DÉSACIVATION
    if (activeBarId === el.id) {
      console.log(`Bascule OFF : Barre ID ${el.id} re-cliquée. Désactivation.`);
      this.removeAllPoints(targetEntity);
      activeBarId = null; 
      return; 
    }
    
    // 2. GESTION DE L'ACTIVATION
    
    // A. Nettoyer la scène (Désactivation de l'ancienne barre, si elle existe)
    if (activeBarId !== null) {
        this.removeAllPoints(targetEntity); 
        console.log(`Bascule ON : Désactivation de l'ancienne barre (${activeBarId}).`);
    }
    
    // B. Marquer la nouvelle barre comme active
    activeBarId = el.id; 
    console.log(`Bascule ON : Activation de la nouvelle barre ID ${el.id}.`);
    
    // C. Génération des nouveaux points
    for (let i = 0; i < numberOfPoints; i++) {
      const pointEl = document.createElement('a-sphere');
      
      const x = (Math.random() - 0.5) * 0.8; 
      const y = (Math.random() - 0.5) * 0.8;
      const z = (Math.random() * 0.45) + 0.05; 
      
      pointEl.setAttribute('position', `${x} ${y} ${z}`);
      pointEl.setAttribute('radius', '0.01'); 
      pointEl.setAttribute('color', 'yellow');
      pointEl.setAttribute('class', 'generated-point'); 
      
      pointEl.setAttribute('animation', {
          property: 'rotation',
          to: '0 360 0',
          loop: true,
          dur: 3000
      });
      
      targetEntity.appendChild(pointEl);
    }

    // D. Affichage du texte d'avertissement
    const warningTextEl = document.createElement('a-text');
    
    // Affichage de la valeur lue
    warningTextEl.setAttribute('value', `Nombre réel d'étudiants : ${originalValue}\n(Chaque point représente environ 10 étudiants)`); 
    
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
        const barGeneratorComponent = targetEntity.components['bar-point-generator'];
        if (barGeneratorComponent) {
             barGeneratorComponent.removeAllPoints(targetEntity);
             activeBarId = null; 
        }
      }
    });
  }
});