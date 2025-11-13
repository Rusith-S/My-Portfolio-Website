// Mobile menu functionality
function openmenu() {
    const sidemenu = document.getElementById("sidemenu");
    if (sidemenu) {
        sidemenu.style.right = "0";
    }
}

function closemenu() {
    const sidemenu = document.getElementById("sidemenu");
    if (sidemenu) {
        sidemenu.style.right = "-200px";
    }
}