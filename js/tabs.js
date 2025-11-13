// Tab switching functionality
function opentab(tabName, event) {
    const tabLinks = document.getElementsByClassName("tab-links");
    const tabContents = document.getElementsByClassName("tab-contents");
    
    // Remove active class from all tabs
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active-link");
    }
    
    // Hide all tab contents
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active-tab");
    }
    
    // Add active class to clicked tab
    event.currentTarget.classList.add("active-link");
    
    // Show selected tab content
    document.getElementById(tabName).classList.add("active-tab");
}