// Projects Show More/Less functionality
document.addEventListener('DOMContentLoaded', function() {
    const seeMoreBtn = document.getElementById('seeMoreBtn');
    const showLessBtn2 = document.getElementById('showLessBtn2');
    
    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const hiddenWorks = document.querySelectorAll('.work[style*="display: none"]');
            hiddenWorks.forEach(work => {
                work.style.display = 'block';
            });
            this.style.display = 'none';
            showLessBtn2.style.display = 'inline-block';
        });
    }

    if (showLessBtn2) {
        showLessBtn2.addEventListener('click', function(e) {
            e.preventDefault();
            const allWorks = document.querySelectorAll('.work');
            allWorks.forEach((work, index) => {
                if (index >= 3) {
                    work.style.display = 'none';
                }
            });
            this.style.display = 'none';
            seeMoreBtn.style.display = 'inline-block';
            
            // Scroll back to portfolio section
            document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
        });
    }
});