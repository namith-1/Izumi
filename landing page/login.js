document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');

    // Create error message element
    function createErrorElement(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        return errorDiv;
    }

    // Clear previous error messages
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        // Remove error class from inputs
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach(input => input.classList.remove('error'));
    }

    // Validate email
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            emailInput.classList.add('error');
            const error = createErrorElement('Email address is required');
            emailInput.parentNode.appendChild(error);
            return false;
        } else if (!emailRegex.test(email)) {
            emailInput.classList.add('error');
            const error = createErrorElement('Please enter a valid email address');
            emailInput.parentNode.appendChild(error);
            return false;
        }
        return true;
    }

    // Validate password
    function validatePassword() {
        const password = passwordInput.value;
        
        if (password === '') {
            passwordInput.classList.add('error');
            const error = createErrorElement('Password is required');
            passwordInput.parentNode.appendChild(error);
            return false;
        } else if (password.length < 6) {
            passwordInput.classList.add('error');
            const error = createErrorElement('Password must be at least 6 characters');
            passwordInput.parentNode.appendChild(error);
            return false;
        }
        
        return true;
    }

    // Add input event listeners for real-time validation
    emailInput.addEventListener('blur', function() {
        clearErrors();
        validateEmail();
    });

    passwordInput.addEventListener('blur', function() {
        clearErrors();
        validatePassword();
    });

    // Form submission handler
    form.addEventListener('submit', function(event) {
        // Clear any existing error messages
        clearErrors();
        
        // Run all validations
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        // If any validation fails, prevent form submission
        if (!(isEmailValid && isPasswordValid)) {
            event.preventDefault();
        } else {
            // If all validations pass, you could add code here to:
            // - Submit login credentials
            // - Handle authentication
            console.log("Login form submitted successfully!");
            
            // For demo purposes, you might want to prevent the actual submission:
            // event.preventDefault();
        }
    });
});