// Form validation and submission with SweetAlert
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            const name = document.getElementById('nameInput').value;
            const email = document.getElementById('emailInput').value;
            const phone = document.getElementById('phoneInput').value;
            const message = document.getElementById('messageInput').value;

            // Validation regex patterns
            const nameRegex = /^[a-zA-Z\s]+$/;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^\d{10}$/;

            let isValid = true;

            // Clear all previous errors
            document.getElementById('nameError').classList.remove('show');
            document.getElementById('emailError').classList.remove('show');
            document.getElementById('phoneError').classList.remove('show');
            document.getElementById('messageError').classList.remove('show');

            // Validate name
            if (!nameRegex.test(name)) {
                document.getElementById('nameError').classList.add('show');
                isValid = false;
            }

            // Validate email
            if (!emailRegex.test(email)) {
                document.getElementById('emailError').classList.add('show');
                isValid = false;
            }

            // Validate phone
            if (!phoneRegex.test(phone)) {
                document.getElementById('phoneError').classList.add('show');
                isValid = false;
            }

            // Validate message
            if (message.trim() === '') {
                document.getElementById('messageError').classList.add('show');
                isValid = false;
            }

            if (!isValid) {
                Swal.fire({
                    icon: 'error',
                    title: 'Validation Error',
                    text: 'Please fill in all fields correctly!',
                    confirmButtonColor: '#1e90ff',
                    background: '#1a1a1a',
                    color: '#e0e0e0'
                });
                return;
            }

            // If validation passes, submit to Formspree
            const formData = new FormData(this);
            
            // Show loading
            Swal.fire({
                title: 'Sending...',
                text: 'Please wait while we send your message',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                background: '#1a1a1a',
                color: '#e0e0e0',
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            fetch('https://formspree.io/f/xqaljbbg', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Your message has been sent successfully! I will get back to you soon.',
                        confirmButtonColor: '#1e90ff',
                        background: '#1a1a1a',
                        color: '#e0e0e0'
                    });
                    contactForm.reset(); // Clear form
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Please try again later.',
                    confirmButtonColor: '#1e90ff',
                    background: '#1a1a1a',
                    color: '#e0e0e0'
                });
                console.error('Form submission error:', error);
            });
        });
    }
});