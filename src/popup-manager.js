// popup-manager.js - Gestion des popups pour le projet AR

let popupActive = false;

/**
 * Affiche un popup 2D par-dessus la scène AR
 * @param {string} title - Titre du popup
 * @param {string} content - Contenu HTML du popup
 */
function showPopup(title, content) {
    if (popupActive) return;
    
    popupActive = true;
    
    // Créer l'overlay
    const overlay = document.createElement('div');
    overlay.id = 'ar-popup-overlay';
    overlay.className = 'popup-overlay';
    
    // Créer le contenu du popup
    const popup = document.createElement('div');
    popup.className = 'popup-container';
    
    // Créer le titre
    const titleElement = document.createElement('h2');
    titleElement.className = 'popup-title';
    titleElement.textContent = title;
    
    // Créer le contenu
    const contentElement = document.createElement('div');
    contentElement.className = 'popup-content';
    contentElement.innerHTML = content;
    
    // Créer le footer
    const footer = document.createElement('div');
    footer.className = 'popup-footer';
    footer.textContent = 'Cliquez n\'importe où pour fermer';
    
    // Assembler le popup
    popup.appendChild(titleElement);
    popup.appendChild(contentElement);
    popup.appendChild(footer);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    
    // Empêcher la propagation du clic sur le popup lui-même
    popup.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Fermer au clic sur l'overlay
    overlay.addEventListener('click', () => {
        closePopup();
    });
}

/**
 * Ferme le popup actif
 */
function closePopup() {
    const overlay = document.getElementById('ar-popup-overlay');
    if (overlay) {
        overlay.remove();
        popupActive = false;
    }
}

/**
 * Composant A-Frame pour la zone cliquable du camembert
 */
AFRAME.registerComponent('camembert-clickable', {
    init: function() {
        this.el.addEventListener('click', () => {
            const title = "Étudiant par type de diplôme";
            const content = `
                <p><strong>Répartition des 3 675 étudiants par type de diplôme :</strong></p>
                <ul>
                    <li><strong>72% - Diplôme de l'Éducation Nationale (EN)</strong><br>
                    La grande majorité des étudiants suivent des formations reconnues par l'Éducation Nationale.</li>
                    
                    <li><strong>12,3% - Autres Diplômes d'État</strong><br>
                    Incluant les formations paramédicales, sociales et autres certifications d'État.</li>
                    
                    <li><strong>10,3% - Diplômes RNCP privés</strong><br>
                    Certifications professionnelles enregistrées au Répertoire National des Certifications Professionnelles.</li>
                    
                    <li><strong>2,7% - Certifications spécialisées</strong><br>
                    Formations techniques et spécialisées dans des domaines spécifiques.</li>
                    
                    <li><strong>1,9% - Certifications professionnelles</strong><br>
                    Qualifications professionnelles ciblées.</li>
                    
                    <li><strong>0,3% - Titres professionnels</strong><br>
                    Certifications délivrées par le Ministère du Travail.</li>
                </ul>
                <p class="popup-note">
                    <strong>À noter :</strong> Cette diversité de diplômes reflète la richesse de l'offre de formation dans le Biterrois, permettant à chaque étudiant de trouver un parcours adapté à ses ambitions.
                </p>
            `;
            showPopup(title, content);
        });
    }
});