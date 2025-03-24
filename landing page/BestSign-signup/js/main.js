// const sign_in_btn = document.querySelector("#sign-in-btn")
// const sign_up_btn = document.querySelector("#sign-up-btn")
// const container = document.querySelector(".container");

// sign_up_btn.addEventListener('click',() =>{
//     container.classList.add("sign-up-mode");
// });

// sign_in_btn.addEventListener('click',() =>{
//     container.classList.remove("sign-up-mode");
// });


document.addEventListener('DOMContentLoaded', function() {
    // Toggle elements
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");
    
    // Form elements
    const signUpForm = document.querySelector('.sign-up-form');
    const signInForm = document.querySelector('.sign-in-form');
    
    // Sign-up form fields
    const usernameInput = document.querySelector('.sign-up-form input[type="text"]');
    const emailInput = document.querySelector('.sign-up-form input[type="email"]');
    const passwordInput = document.querySelector('.sign-up-form input[placeholder="Password"]');
    const confirmPasswordInput = document.querySelector('.sign-up-form input[placeholder="Confirm Password"]');
    const termsCheckbox = document.querySelector('#terms');

    // Handle sign-up toggle
    sign_up_btn.addEventListener('click', () => {
        container.classList.add("sign-up-mode");
    });

    // Handle sign-in toggle
    sign_in_btn.addEventListener('click', () => {
        container.classList.remove("sign-up-mode");
    });

    // Create error message element
    function createErrorElement(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'var(--error-color)';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '-5px';
        errorDiv.style.marginBottom = '10px';
        errorDiv.style.textAlign = 'left';
        errorDiv.style.width = '100%';
        errorDiv.textContent = message;
        return errorDiv;
    }

    // Clear previous error messages
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        // Remove error class from inputs
        const inputs = document.querySelectorAll('.input-field input');
        inputs.forEach(input => input.classList.remove('error'));
    }

    // Validate username
    function validateUsername() {
        if (!usernameInput) return true; // Skip if element doesn't exist
        
        const username = usernameInput.value.trim();
        if (username.length < 3) {
            usernameInput.parentElement.classList.add('error');
            usernameInput.parentElement.style.border = '1px solid var(--error-color)';
            const error = createErrorElement('Username must be at least 3 characters long');
            usernameInput.parentElement.after(error);
            return false;
        }
        return true;
    }

    // Validate email
    function validateEmail() {
        if (!emailInput) return true; // Skip if element doesn't exist
        
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailInput.parentElement.classList.add('error');
            emailInput.parentElement.style.border = '1px solid var(--error-color)';
            const error = createErrorElement('Please enter a valid email address');
            emailInput.parentElement.after(error);
            return false;
        }
        return true;
    }

    // Validate password
    function validatePassword() {
        if (!passwordInput) return true; // Skip if element doesn't exist
        
        const password = passwordInput.value;
        if (password.length < 8) {
            passwordInput.parentElement.classList.add('error');
            passwordInput.parentElement.style.border = '1px solid var(--error-color)';
            const error = createErrorElement('Password must be at least 8 characters long');
            passwordInput.parentElement.after(error);
            return false;
        }
        
        // Check for at least one uppercase letter, one lowercase letter, and one number
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        
        if (!(hasUppercase && hasLowercase && hasNumber)) {
            passwordInput.parentElement.classList.add('error');
            passwordInput.parentElement.style.border = '1px solid var(--error-color)';
            const error = createErrorElement('Password must contain at least one uppercase letter, one lowercase letter, and one number');
            passwordInput.parentElement.after(error);
            return false;
        }
        
        return true;
    }

    // Validate password confirmation
    function validateConfirmPassword() {
        if (!confirmPasswordInput || !passwordInput) return true; // Skip if elements don't exist
        
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (password !== confirmPassword) {
            confirmPasswordInput.parentElement.classList.add('error');
            confirmPasswordInput.parentElement.style.border = '1px solid var(--error-color)';
            const error = createErrorElement('Passwords do not match');
            confirmPasswordInput.parentElement.after(error);
            return false;
        }
        return true;
    }

    // Validate terms checkbox
    function validateTerms() {
        if (!termsCheckbox) return true; // Skip if element doesn't exist
        
        if (!termsCheckbox.checked) {
            const error = createErrorElement('You must agree to the terms and conditions');
            termsCheckbox.parentElement.after(error);
            return false;
        }
        return true;
    }

    // Add input event listeners for real-time validation (only if elements exist)
    if (usernameInput) {
        usernameInput.addEventListener('blur', function() {
            clearErrors();
            validateUsername();
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            clearErrors();
            validateEmail();
        });
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('blur', function() {
            clearErrors();
            validatePassword();
        });
    }
    
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('blur', function() {
            clearErrors();
            validateConfirmPassword();
        });
    }

    // Form submission handler for sign-up form
    if (signUpForm) {
        signUpForm.addEventListener('submit', function(event) {
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
                // If all validations pass
                console.log("Sign-up form submitted successfully!");
                // You can add AJAX submission code here
            }
        });
    }
    
    // Form submission handler for sign-in form (with basic validation)
    if (signInForm) {
        signInForm.addEventListener('submit', function(event) {
            const loginEmail = document.querySelector('.sign-in-form input[type="email"]');
            const loginPassword = document.querySelector('.sign-in-form input[type="password"]');
            let valid = true;
            
            clearErrors();
            
            // Simple validation for login form
            if (loginEmail && loginEmail.value.trim() === '') {
                loginEmail.parentElement.classList.add('error');
                loginEmail.parentElement.style.border = '1px solid var(--error-color)';
                const error = createErrorElement('Email is required');
                loginEmail.parentElement.after(error);
                valid = false;
            }
            
            if (loginPassword && loginPassword.value.trim() === '') {
                loginPassword.parentElement.classList.add('error');
                loginPassword.parentElement.style.border = '1px solid var(--error-color)';
                const error = createErrorElement('Password is required');
                loginPassword.parentElement.after(error);
                valid = false;
            }
            
            if (!valid) {
                event.preventDefault();
            } else {
                console.log("Sign-in form submitted successfully!");
                // You can add AJAX submission code here
            }
        });
    }
    
    // Add responsive handling for mobile screens
    function handleResponsive() {
        if (window.innerWidth <= 870) {
            // Add any specific mobile adjustments here
            document.querySelectorAll('.panel .content').forEach(content => {
                content.style.transition = '0.9s 0.8s ease-in-out';
            });
        } else {
            document.querySelectorAll('.panel .content').forEach(content => {
                content.style.transition = '0.9s 0.6s ease-in-out';
            });
        }
    }
    
    // Initial call and resize listener
    handleResponsive();
    window.addEventListener('resize', handleResponsive);
});