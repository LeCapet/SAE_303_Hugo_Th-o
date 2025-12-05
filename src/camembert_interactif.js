// src/camembert_interactif.js

AFRAME.registerComponent('camembert-interactif', {
    schema: {
        explanation: {type: 'string', default: 'Informations non disponibles.'},
        originalSrc: {type: 'string', default: ''}, // La texture d'origine du secteur
        width: {type: 'number', default: 0.2},
        height: {type: 'number', default: 0.2}
    },

    init: function () {
        const el = this.el;
        this.clickHandler = this.clickHandler.bind(this);
        el.addEventListener('click', this.clickHandler);
    },

    // Affiche le texte en mettant à jour le plan cliqué
    activateSector: function (explanation) {
        const el = this.el;
        
        // Change l'aspect du plan cliqué pour afficher le texte
        el.setAttribute('src', ''); // Supprime l'image de la texture
        el.setAttribute('color', '#333'); // Fond sombre pour la lisibilité
        el.setAttribute('text', {
            value: explanation,
            color: 'white',
            align: 'center',
            wrapCount: 20
        });
    },

    // Rétablit l'image d'origine
    deactivateSector: function() {
        const el = this.el;
        
        // Rétablit l'image de la texture d'origine
        el.setAttribute('src', this.data.originalSrc); 
        el.setAttribute('color', 'white'); // Couleur de base si l'image a de la transparence
        el.removeAttribute('text');
    },

    clickHandler: function (evt) {
        const el = this.el;
        const targetEntity = document.querySelector('#example-target'); 
        const explanation = this.data.explanation;

        // 1. DÉSACIVATION
        if (activeSectorId === el.id) {
            this.deactivateSector(); // Rétablit l'image
            resetAllStates();
            return;
        }

        // 2. ACTIVATION
        
        // Nettoyage général et réinitialisation des anciens états
        if (activeBarId !== null || activeSectorId !== null) {
            removeAllARContent(targetEntity);
            
            // Si l'ancien secteur cliqué n'est PAS le même que le nouveau, on le désactive
            if (activeSectorId && activeSectorId !== el.id) {
                const oldSector = document.querySelector(`#${activeSectorId}`);
                if (oldSector) {
                    oldSector.components['camembert-interactif'].deactivateSector();
                }
            }
            
            resetAllStates();
        }
        
        // Activer le nouveau secteur (Afficher le texte sur l'image)
        this.activateSector(explanation);
        activeSectorId = el.id; 
    },
});