document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".certification-item");
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    let visibleCount = 3;

    function showItems() {
        items.forEach((item, index) => {
            if (index < visibleCount) {
                item.classList.add("visible");
            }
        });
    }

    showItems();

    loadMoreBtn.addEventListener("click", function () {
        visibleCount += 3;
        showItems();
        if (visibleCount >= items.length) {
            loadMoreBtn.style.display = "none";
        }

    });
});