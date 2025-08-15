document.addEventListener("DOMContentLoaded", function() {
    const tablinks = document.getElementsByClassName("tab-links");
    const tabcontents = document.getElementsByClassName("tab-contents");

    function opentab(tabname, event) {
        // Remove active classes from all links and contents
        for (let tablink of tablinks) {
            tablink.classList.remove("active-link");
        }
        for (let tabcontent of tabcontents) {
            tabcontent.classList.remove("active-tab");
        }

        // Add active classes to current
        event.currentTarget.classList.add("active-link");
        document.getElementById(tabname).classList.add("active-tab");
    }

    // Expose opentab to window for inline onclick usage
    window.opentab = opentab;
});
