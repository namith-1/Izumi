document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const usernameInput = document.querySelector('input[type="text"]');
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[placeholder="Password"]');
    const confirmPasswordInput = document.querySelector('input[placeholder="Confirm Password"]');
    const termsCheckbox = document.querySelector('#terms');

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

    // Validate username
    function validateUsername() {
        const username = usernameInput.value.trim();
        if (username.length < 3) {
            usernameInput.classList.add('error');
            const error = createErrorElement('Username must be at least 3 characters long');
            usernameInput.parentNode.appendChild(error);
            return false;
        }
        return true;
    }

    // Validate email
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
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
        if (password.length < 8) {
            passwordInput.classList.add('error');
            const error = createErrorElement('Password must be at least 8 characters long');
            passwordInput.parentNode.appendChild(error);
            return false;
        }
        
        // Check for at least one uppercase letter, one lowercase letter, and one number
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        
        if (!(hasUppercase && hasLowercase && hasNumber)) {
            passwordInput.classList.add('error');
            const error = createErrorElement('Password must contain at least one uppercase letter, one lowercase letter, and one number');
            passwordInput.parentNode.appendChild(error);
            return false;
        }
        
        return true;
    }

    // Validate password confirmation
    function validateConfirmPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (password !== confirmPassword) {
            confirmPasswordInput.classList.add('error');
            const error = createErrorElement('Passwords do not match');
            confirmPasswordInput.parentNode.appendChild(error);
            return false;
        }
        return true;
    }

    // Validate terms checkbox
    function validateTerms() {
        if (!termsCheckbox.checked) {
            const error = createErrorElement('You must agree to the terms and conditions');
            termsCheckbox.parentNode.appendChild(error);
            return false;
        }
        return true;
    }

    // Add input event listeners for real-time validation
    usernameInput.addEventListener('blur', function() {
        clearErrors();
        validateUsername();
    });

    emailInput.addEventListener('blur', function() {
        clearErrors();
        validateEmail();
    });

    passwordInput.addEventListener('blur', function() {
        clearErrors();
        validatePassword();
    });

    confirmPasswordInput.addEventListener('blur', function() {
        clearErrors();
        validateConfirmPassword();
    });

    // Form submission handler
    form.addEventListener('submit', function(event) {
        // Clear any existing error messages
        clearErrors();
        
        // Run all validations
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isTermsChecked = validateTerms();
        
        // If any validation fails, prevent form submission
        if (!(isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isTermsChecked)) {
            event.preventDefault();
        } else {
            // If all validations pass, you could add code here to:
            // - Show a success message
            // - Submit the form via AJAX
            // - Redirect the user
            console.log("Form submitted successfully!");
        }
    });
});