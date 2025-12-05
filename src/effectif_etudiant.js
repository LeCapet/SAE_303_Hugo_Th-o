
AFRAME.registerComponent('bar-point-generator', {
  schema: {
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
    
    // 1. GESTION DE LA DÉSACIVATION
    if (activeBarId === el.id) {
        removeAllARContent(targetEntity);
        resetAllStates();
        return; 
    }
    
    // 2. GESTION DE L'ACTIVATION
    
    // Nettoyage général et réinitialisation de l'ancienne barre
    if (activeBarId !== null) {
        removeAllARContent(targetEntity);
        resetAllStates();
    }
    
    // Marquer la nouvelle barre comme active
    activeBarId = el.id; 
    
    // Génération des nouveaux points
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

    // Affichage du texte d'avertissement
    const warningTextEl = document.createElement('a-text');
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