// document.addEventListener("DOMContentLoaded", function () {
//     const items = document.querySelectorAll(".certification-item");
//     const loadMoreBtn = document.getElementById("loadMoreBtn");
//     let visibleCount = 3;

//     function showItems() {
//         items.forEach((item, index) => {
//             if (index < visibleCount) {
//                 item.classList.add("visible");
//             }
//         });
//     }

//     showItems();

//     loadMoreBtn.addEventListener("click", function () {
//         visibleCount += 3;
//         showItems();
//         if (visibleCount >= items.length) {
//             loadMoreBtn.style.display = "none";
//         }

//     });
// });




// document.addEventListener("DOMContentLoaded", function () {
//     const items = document.querySelectorAll(".certification-item");
//     const loadMoreBtn = document.getElementById("loadMoreBtn");
//     const showLessBtn = document.getElementById("showLessBtn");
//     let visibleCount = 3; // initially show 3 items

//     function updateItems() {
//         items.forEach((item, index) => {
//             item.style.display = index < visibleCount ? "flex" : "none";
//         });

//         if (visibleCount >= items.length) {
//             loadMoreBtn.style.display = "none";
//             showLessBtn.style.display = "block";
//         } else {
//             loadMoreBtn.style.display = "block";
//             showLessBtn.style.display = "none";
//         }
//     }

//     // Initial display
//     updateItems();

//     loadMoreBtn.addEventListener("click", () => {
//         visibleCount += 3; // show 3 more
//         if (visibleCount > items.length) visibleCount = items.length;
//         updateItems();
//     });

//     showLessBtn.addEventListener("click", () => {
//         visibleCount = 3; // reset to initial 3
//         updateItems();
//     });
// });


// document.addEventListener("DOMContentLoaded", function () {
//     const items = document.querySelectorAll(".certification-item");
//     const loadMoreBtn = document.getElementById("loadMoreBtn");
//     const showLessBtn = document.getElementById("showLessBtn");
//     let visibleCount = 3; // initially show 3 items

//     function updateItems() {
//         items.forEach((item, index) => {
//             item.style.display = index < visibleCount ? "flex" : "none";
//         });

//         if (visibleCount >= items.length) {
//             loadMoreBtn.style.display = "none";
//             showLessBtn.style.display = "block";
//         } else {
//             loadMoreBtn.style.display = "block";
//             showLessBtn.style.display = "none";
//         }
//     }

//     // Initial display
//     updateItems();

//     loadMoreBtn.addEventListener("click", () => {
//         visibleCount += 3; // show 3 more
//         if (visibleCount > items.length) visibleCount = items.length;
//         updateItems();
//     });

//     showLessBtn.addEventListener("click", () => {
//         visibleCount = 3; // reset to initial 3
//         updateItems();

//         // Scroll to first certificate smoothly
//         if (items.length > 0) {
//             items[0].scrollIntoView({ behavior: "smooth", block: "start" });
//         }
//     });
// });





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
