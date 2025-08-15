document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");
    const nameField = form.querySelector('input[name="Name"]');
    const emailField = form.querySelector('input[name="Email"]');
    const phoneField = form.querySelector('input[name="Phone"]');
    const messageField = form.querySelector('textarea[name="Message"]');

    // Real-time input restrictions
    nameField.addEventListener("input", function() {
        this.value = this.value.replace(/[^A-Za-z\s]/g, "");
    });

    phoneField.addEventListener("input", function() {
        this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
    });

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        let valid = true;

        // Hide all errors first
        document.querySelectorAll(".error-message").forEach(el => el.classList.remove("show"));

        // Name validation
        if (!/^[A-Za-z\s]+$/.test(nameField.value.trim()) || nameField.value.trim() === "") {
            document.getElementById("nameError").classList.add("show");
            valid = false;
        }

        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim())) {
            document.getElementById("emailError").classList.add("show");
            valid = false;
        }

        // Phone validation
        if (!/^\d{10}$/.test(phoneField.value.trim())) {
            document.getElementById("phoneError").classList.add("show");
            valid = false;
        }

        // Message validation
        if (messageField.value.trim() === "") {
            document.getElementById("messageError").classList.add("show");
            valid = false;
        }

        if (!valid) return;

        // Submit form
        fetch(form.action, {
            method: "POST",
            headers: { "Accept": "application/json" },
            body: new FormData(form)
        })
        .then(response => {
            if (response.ok) {
                Swal.fire({
                    title: 'Message Sent!',
                    text: 'Thank you for contacting me. I will respond soon.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 3000,
                    background: '#1e1e1e',
                    color: '#fff',
                    iconColor: '#4CAF50'
                });
                form.reset();
            } else {
                Swal.fire({
                    title: 'Oops...',
                    text: 'Something went wrong! Please try again.',
                    icon: 'error',
                    showConfirmButton: true,
                    background: '#1e1e1e',
                    color: '#fff',
                    iconColor: '#f44336'
                });
            }
        })
        .catch(error => {
            console.error(error);
            Swal.fire({
                title: 'Network Error',
                text: 'Please check your internet connection.',
                icon: 'error',
                showConfirmButton: true,
                background: '#1e1e1e',
                color: '#fff',
                iconColor: '#f44336'
            });
        });
    });
});
