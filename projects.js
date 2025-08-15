// Wrap in DOMContentLoaded to ensure elements exist
document.addEventListener("DOMContentLoaded", function() {

    // Show more projects
    function showMoreProjects() {
        document.getElementById('work5').style.display = 'block';
        document.getElementById('work6').style.display = 'block';
        document.getElementById('work7').style.display = 'block';

        document.querySelector('.see-more-btn').style.display = 'none';
        document.querySelector('.show-less-btn').style.display = 'inline-block';
    }

    // Show less projects
    function showLessProjects() {
        document.getElementById('work5').style.display = 'none';
        document.getElementById('work6').style.display = 'none';
        document.getElementById('work7').style.display = 'none';

        document.querySelector('.see-more-btn').style.display = 'inline-block';
        document.querySelector('.show-less-btn').style.display = 'none';
    }

    // Attach functions to buttons
    const seeMoreBtn = document.querySelector('.see-more-btn');
    const showLessBtn = document.querySelector('.show-less-btn');

    seeMoreBtn.addEventListener('click', showMoreProjects);
    showLessBtn.addEventListener('click', showLessProjects);
});
