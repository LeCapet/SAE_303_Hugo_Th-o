let activeBarId = null; 

function removeAllARContent(targetEntity) {
    targetEntity.querySelectorAll('.generated-point, .warning-text').forEach(el => {
        el.parentNode.removeChild(el);
    });
}

function resetAllStates() {
    activeBarId = null;
}