document.addEventListener("DOMContentLoaded", function() {
    const letters = document.querySelectorAll('.typing-animation');

    function typeLetters() {
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.style.opacity = '1';
            }, index * 200);
        });

        setTimeout(clearLetters, letters.length * 200);
    }

    function clearLetters() {
        for (let i = letters.length - 1; i >= 0; i--) {
            setTimeout(() => {
                letters[i].style.opacity = '0';
            }, (letters.length - i) * 100);
        }

        setTimeout(typeLetters, (letters.length + 1) * 100);
    }

    // Start the loop
    setTimeout(typeLetters, 10);
});

