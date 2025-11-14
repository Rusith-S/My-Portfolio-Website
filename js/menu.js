// Mobile menu functionality
function openmenu() {
    const sidemenu = document.getElementById("sidemenu");
    if (sidemenu) {
        // ensure a smooth reveal
        sidemenu.style.transition = sidemenu.style.transition || 'right 0.35s ease';
        sidemenu.style.right = '0';
        // mark as open for any CSS hooks
        sidemenu.classList.add('is-open');
    }
}

function closemenu() {
    const sidemenu = document.getElementById("sidemenu");
    if (sidemenu) {
        // compute the width and hide fully off-canvas; fallback to -250px
        const w = sidemenu.offsetWidth || 250;
        sidemenu.style.transition = sidemenu.style.transition || 'right 0.35s ease';
        sidemenu.style.right = `-${w}px`;
        sidemenu.classList.remove('is-open');
    }
}