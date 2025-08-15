document.addEventListener("DOMContentLoaded", function() {
    const side_menu = document.getElementById("sidemenu");

    // Open the side menu
    function openmenu() {
        side_menu.style.right = "0";
    }

    // Close the side menu
    function closemenu() {
        side_menu.style.right = "-200px";
    }

    // Attach to window for inline onclick usage
    window.openmenu = openmenu;
    window.closemenu = closemenu;
});
