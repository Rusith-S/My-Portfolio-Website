// Global variable to track selected country
let selectedCountry = null;

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeCountrySelector();
    initializeFormValidation();
    // CRITICAL CHECK: Ensure 'countries' array is defined and populated before this script runs.
    if (typeof countries === 'undefined' || countries.length === 0) {
        console.error("ERROR: The 'countries' array is not defined or is empty. Please ensure the data is loaded before contact.js.");
    }
});

// ------------------------------------------------------------------------

// Country Selector Initialization
function initializeCountrySelector() {
    const countryList = document.getElementById('countryList');
    const countrySelector = document.getElementById('countrySelector');
    const countrySearch = document.getElementById('countrySearch');
    const selectedFlag = document.getElementById('selectedFlag');
    const selectedCode = document.getElementById('selectedCode');
    // We assume the trigger is the direct child div holding the flag and code
    const trigger = document.querySelector('#countrySelector .country-selector-trigger');
    
    if (!countryList || !countrySelector || !trigger || !selectedFlag || !selectedCode) return;

    // Set default country to Sri Lanka
    selectedCountry = countries.find(c => c.code === 'LK') || countries[0];
    updateSelectedCountry(selectedCountry);

    // Populate country list
    renderCountryList(countries);

    // FIX: Toggle dropdown by clicking the dedicated trigger element
    trigger.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevents document listener from closing immediately
        countrySelector.classList.toggle('active');
        if (countrySelector.classList.contains('active')) {
            // Reset search and focus when opening
            countrySearch.value = '';
            renderCountryList(countries); 
            countrySearch.focus();
        }
    });

    // Prevent clicks inside the dropdown content from closing the selector
    const dropdown = document.querySelector('.country-dropdown');
    if (dropdown) {
        dropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Search functionality
    countrySearch.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredCountries = countries.filter(country => 
            country.name.toLowerCase().includes(searchTerm) ||
            country.dialCode.includes(searchTerm) ||
            country.code.toLowerCase().includes(searchTerm)
        );
        renderCountryList(filteredCountries);
    });

    // Render country list (UPDATED: Uses CSS flag icons based on country code)
    function renderCountryList(countriesToRender) {
        countryList.innerHTML = '';
        
        if (countriesToRender.length === 0) {
            countryList.innerHTML = '<div class="no-results">No results found.</div>';
            return;
        }
        
        countriesToRender.forEach(country => {
            const option = document.createElement('div');
            option.className = 'country-option';
            if (country.code === selectedCountry.code) {
                option.classList.add('selected');
            }
            
            option.innerHTML = `
                <span class="flag-icon flag-icon-${country.code.toLowerCase()}"></span>
                <span class="country-name">${country.name}</span>
                <span class="country-dial-code">${country.dialCode}</span>
            `;
            
            option.addEventListener('click', function() {
                // Update selection and close dropdown
                selectedCountry = country;
                updateSelectedCountry(country);
                countrySelector.classList.remove('active');
                countrySearch.value = '';
                
                // Re-render list to mark new country as selected and reset filter
                renderCountryList(countries); 
                
                // Revalidate phone number with new country
                const phoneInput = document.getElementById('phoneInput');
                if (phoneInput && phoneInput.value.trim()) {
                    validatePhone();
                }
            });
            
            countryList.appendChild(option);
        });
    }

    // ⭐ FIX: Update selected country display by updating the existing
    // trigger span's class (avoid creating nested flag spans which left
    // the old class in place and caused the Sri Lanka flag to remain).
    function updateSelectedCountry(country) {
        if (!selectedFlag || !selectedCode) return;

        // Set the class on the existing flag-containing element so the
        // flag-icon CSS library shows the correct flag.
        selectedFlag.className = `flag-icon flag-icon-${country.code.toLowerCase()}`;

        // Update dial code text and current selection
        selectedCode.textContent = country.dialCode;
        selectedCountry = country;
    }

    // Expose the same function globally so other parts of the code (e.g. form
    // reset) call the exact same updater and get a consistent result.
    window.updateSelectedCountry = updateSelectedCountry;

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (countrySelector.classList.contains('active') && !countrySelector.contains(e.target)) {
            countrySelector.classList.remove('active');
            countrySearch.value = ''; // Clear search when closing
            renderCountryList(countries); // Reset list view
        }
    });
}

// ------------------------------------------------------------------------

// Form Validation and Submission
function initializeFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;

    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const phoneInput = document.getElementById('phoneInput');
    const messageInput = document.getElementById('messageInput');

    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Event listeners
    if (nameInput) nameInput.addEventListener('blur', () => validateField(nameInput, nameRegex, 'nameError', 'Please enter a valid name (letters and spaces only).'));
    if (emailInput) emailInput.addEventListener('blur', () => validateField(emailInput, emailRegex, 'emailError', 'Please enter a valid email address.'));
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            // Keep only digits in the phone input
            this.value = this.value.replace(/[^\d]/g, '');
        });
        phoneInput.addEventListener('blur', validatePhone);
    }
    if (messageInput) messageInput.addEventListener('blur', validateMessage);

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        clearAllErrors();

        const isNameValid = validateField(nameInput, nameRegex, 'nameError', 'Please enter a valid name (letters and spaces only).');
        const isEmailValid = validateField(emailInput, emailRegex, 'emailError', 'Please enter a valid email address.');
        const isPhoneValid = validatePhone();
        const isMessageValid = validateMessage();

        if (!isNameValid || !isEmailValid || !isPhoneValid || !isMessageValid) {
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
        
        // --- FORM SUBMISSION LOGIC ---

        const selectedCodeElement = document.getElementById('selectedCode');
        const selectedCode = selectedCodeElement ? selectedCodeElement.textContent : '';
        const fullPhoneNumber = selectedCode + phoneInput.value;
        
        // LOG 1: Check if this part is reached
        console.log('Validation passed. Attempting to submit form...');

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
                // LOG 2: Check if the loading Swal is displayed
                console.log('SweetAlert Loading displayed.'); 
            }
        });

        const formData = new FormData(this);
        // Overwrite the 'Phone' field with the full dial code + number
        formData.set('Phone', fullPhoneNumber);

        // Formspree endpoint 
        fetch('https://formspree.io/f/xqaljbbg', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            // LOG 3: Check response status
            console.log('Formspree response received. Status:', response.status);
            
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success! 🚀',
                    text: 'Your message has been sent successfully! I will get back to you soon.',
                    confirmButtonColor: '#1e90ff',
                    background: '#1a1a1a',
                    color: '#e0e0e0'
                });
                contactForm.reset();
                
                // Reset country selector to Sri Lanka
                const sriLanka = countries.find(c => c.code === 'LK');
                if (sriLanka) {
                    selectedCountry = sriLanka;
                    // Reset flag display to use the CSS class again
                    // Ensure updateSelectedCountry is defined and accessible
                    if (typeof updateSelectedCountry === 'function') {
                         updateSelectedCountry(sriLanka); 
                    }
                }
            } else {
                // Throwing an error here jumps to the .catch() block
                return response.json().then(errorData => {
                    console.error("Formspree Non-OK Response Error:", errorData);
                    throw new Error(`Form submission failed: ${errorData.error || 'Server error'}`);
                }).catch(() => {
                    // If response is not JSON (e.g., 404 or 500 error page), throw a generic error
                    throw new Error('Form submission failed: Unknown server response.');
                });
            }
        })
        .catch(error => {
            // LOG 4: This is where your error is being caught and Swal is thrown
            console.error('An error occurred during form submission (Formspree fetch failed or response.ok was false):', error.message); 
            
            Swal.fire({
                icon: 'error',
                title: 'Oops... 😔',
                // Display the specific error message caught
                text: `Something went wrong! Please try again later. Error: ${error.message || 'Check console for details.'}`,
                confirmButtonColor: '#1e90ff',
                background: '#1a1a1a',
                color: '#e0e0e0'
            });
        });
    });

    // ... (rest of validation functions remain the same) ...
    function validateField(input, regex, errorId, defaultErrorMsg) {
        const errorElement = document.getElementById(errorId);
        const formGroup = input.closest('.form-group');
        if (!input || !errorElement || !formGroup) return false;
        
        const value = input.value.trim();
        let isValid = true;
        
        if (value === '') {
            errorElement.textContent = 'This field is required.';
            isValid = false;
        } else if (!regex.test(value)) {
            errorElement.textContent = defaultErrorMsg;
            isValid = false;
        }

        if (!isValid) {
            errorElement.classList.add('show');
            formGroup.classList.add('error');
        } else {
            errorElement.classList.remove('show');
            formGroup.classList.remove('error');
        }
        return isValid;
    }

    function validatePhone() {
        const phoneInput = document.getElementById('phoneInput');
        const phoneError = document.getElementById('phoneError');
        const formGroup = phoneInput ? phoneInput.closest('.form-group') : null;
        
        if (!phoneInput || !phoneError || !formGroup) return false;
        
        const phoneValue = phoneInput.value.trim();
        
        if (!selectedCountry) {
            phoneError.textContent = 'Please select a country code';
            phoneError.classList.add('show');
            formGroup.classList.add('error');
            return false;
        }
        
        const minLength = selectedCountry.minLength;
        const maxLength = selectedCountry.maxLength;
        
        if (!phoneValue || !/^\d+$/.test(phoneValue)) {
            phoneError.textContent = 'Please enter a valid phone number (digits only)';
            phoneError.classList.add('show');
            formGroup.classList.add('error');
            return false;
        }
        
        if (phoneValue.length < minLength || phoneValue.length > maxLength) {
            if (minLength === maxLength) {
                phoneError.textContent = `Please enter exactly ${minLength} digits for ${selectedCountry.name}`;
            } else {
                phoneError.textContent = `Please enter ${minLength}-${maxLength} digits for ${selectedCountry.name}`;
            }
            phoneError.classList.add('show');
            formGroup.classList.add('error');
            return false;
        }
        
        phoneError.classList.remove('show');
        formGroup.classList.remove('error');
        return true;
    }

    function validateMessage() {
        const messageInput = document.getElementById('messageInput');
        const messageError = document.getElementById('messageError');
        const formGroup = messageInput ? messageInput.closest('.form-group') : null;
        
        if (!messageInput || !messageError || !formGroup) return false;
        
        const isValid = messageInput.value.trim() !== '';

        if (!isValid) {
            messageError.textContent = 'This field is required.';
            messageError.classList.add('show');
            formGroup.classList.add('error');
        } else {
            messageError.classList.remove('show');
            formGroup.classList.remove('error');
        }
        return isValid;
    }

    function clearAllErrors() {
        document.querySelectorAll('.error-message').forEach(error => {
            error.classList.remove('show');
        });
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });
    }
}







