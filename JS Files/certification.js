document.addEventListener("DOMContentLoaded", function () {
    const certItems = document.querySelectorAll("#certificationList .certification-item");
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    const showLessBtn = document.getElementById("showLessBtn");
    let visibleCount = 3; // show first 3 initially

    function updateCertificates() {
        certItems.forEach((item, index) => {
            item.style.display = index < visibleCount ? "flex" : "none";
        });

        if (visibleCount >= certItems.length) {
            loadMoreBtn.style.display = "none";
            showLessBtn.style.display = "block";
        } else {
            loadMoreBtn.style.display = "block";
            showLessBtn.style.display = "none";
        }
    }

    // Initial display
    updateCertificates();

    loadMoreBtn.addEventListener("click", () => {
        visibleCount += 3; // show 3 more
        if (visibleCount > certItems.length) visibleCount = certItems.length;
        updateCertificates();
    });

    showLessBtn.addEventListener("click", () => {
        visibleCount = 3; // reset to initial 3
        updateCertificates();
        // scroll to the certifications section
        document.getElementById("certifications").scrollIntoView({ behavior: "smooth" });
    });
});
