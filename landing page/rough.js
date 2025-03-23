// // js for otp email


// <script>
//         // DOM elements
//         const emailForm = document.getElementById('email-form');
//         const otpForm = document.getElementById('otp-form');
//         const userForm = document.getElementById('user-form');
//         const emailInput = document.getElementById('email-input');
//         const otpInputs = document.querySelectorAll('.otp-input');
//         const resendLink = document.querySelector('.resend-link');
//         const emailError = document.getElementById('email-error');
//         const otpError = document.getElementById('otp-error');
//         const registerError = document.getElementById('register-error');
//         const emailLoading = document.getElementById('email-loading');
//         const otpLoading = document.getElementById('otp-loading');
//         const registerLoading = document.getElementById('register-loading');
//         const sendOtpBtn = document.getElementById('send-otp-btn');
        
//         // Store email for later use
//         let userEmail = '';
//         let sessionId = '';
        
//         // Backend API endpoints
//         const API_BASE_URL = 'https://your-backend-api.com/api';
//         const SEND_OTP_ENDPOINT = `${API_BASE_URL}/send-otp`;
//         const VERIFY_OTP_ENDPOINT = `${API_BASE_URL}/verify-otp`;
//         const REGISTER_USER_ENDPOINT = `${API_BASE_URL}/register`;
        
//         // Function to send OTP to email
//         async function sendOTP(email) {
//             try {
//                 emailError.classList.add('hidden');
//                 emailLoading.classList.remove('hidden');
//                 sendOtpBtn.disabled = true;
                
//                 const response = await fetch(SEND_OTP_ENDPOINT, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ email })
//                 });
                
//                 const data = await response.json();
                
//                 if (!response.ok) {
//                     throw new Error(data.message || 'Failed to send OTP');
//                 }
                
//                 // Store session ID for OTP verification
//                 sessionId = data.sessionId;
//                 userEmail = email;
                
//                 // Show OTP form and hide email form
//                 emailForm.classList.add('hidden');
//                 otpForm.classList.remove('hidden');
                
//                 // Focus on first OTP input
//                 otpInputs[0].focus();
                
//                 return true;
//             } catch (error) {
//                 emailError.textContent = error.message;
//                 emailError.classList.remove('hidden');
//                 return false;
//             } finally {
//                 emailLoading.classList.add('hidden');
//                 sendOtpBtn.disabled = false;
//             }
//         }
        
//         // Function to verify OTP
//         async function verifyOTP(otp) {
//             try {
//                 otpError.classList.add('hidden');
//                 otpLoading.classList.remove('hidden');
                
//                 const response = await fetch(VERIFY_OTP_ENDPOINT, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ 
//                         email: userEmail,
//                         otp: otp,
//                         sessionId: sessionId
//                     })
//                 });
                
//                 const data = await response.json();
                
//                 if (!response.ok) {
//                     throw new Error(data.message || 'Invalid OTP');
//                 }
                
//                 // Show username form and hide OTP form
//                 otpForm.classList.add('hidden');
//                 userForm.classList.remove('hidden');
                
//                 return true;
//             } catch (error) {
//                 otpError.textContent = error.message;
//                 otpError.classList.remove('hidden');
//                 return false;
//             } finally {
//                 otpLoading.classList.add('hidden');
//             }
//         }
        
//         // Function to register user
//         async function registerUser(username, password) {
//             try {
//                 registerError.classList.add('hidden');
//                 registerLoading.classList.remove('hidden');
                
//                 const response = await fetch(REGISTER_USER_ENDPOINT, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ 
//                         email: userEmail,
//                         username: username,
//                         password: password,
//                         sessionId: sessionId
//                     })
//                 });
                
//                 const data = await response.json();
                
//                 if (!response.ok) {
//                     throw new Error(data.message || 'Registration failed');
//                 }
                
//                 // Redirect to success page or login page
//                 alert('Registration successful! You can now login.');
                
//                 // Reset forms and return to initial state
//                 resetForms();
                
//                 return true;
//             } catch (error) {
//                 registerError.textContent = error.message;
//                 registerError.classList.remove('hidden');
//                 return false;
//             } finally {
//                 registerLoading.classList.add('hidden');
//             }
//         }
        
//         // Function to reset all forms
//         function resetForms() {
//             emailForm.reset();
//             otpForm.reset();
//             userForm.reset();
            
//             userForm.classList.add('hidden');
//             otpForm.classList.add('hidden');
//             emailForm.classList.remove('hidden');
            
//             emailError.classList.add('hidden');
//             otpError.classList.add('hidden');
//             registerError.classList.add('hidden');
            
//             userEmail = '';
//             sessionId = '';
//         }
        
//         // Event listeners
//         emailForm.addEventListener('submit', async function(e) {
//             e.preventDefault();
//             const email = emailInput.value.trim();
//             await sendOTP(email);
//         });
        
//         // Auto-tab functionality for OTP inputs
//         otpInputs.forEach((input, index) => {
//             input.addEventListener('input', function(e) {
//                 // Allow only digits
//                 this.value = this.value.replace(/[^0-9]/g, '');
                
//                 if (this.value.length === 1) {
//                     if (index < otpInputs.length - 1) {
//                         otpInputs[index + 1].focus();
//                     }
//                 }
//             });
            
//             input.addEventListener('keydown', function(e) {
//                 if (e.key === 'Backspace' && this.value.length === 0) {
//                     if (index > 0) {
//                         otpInputs[index - 1].focus();
//                     }
//                 }
//             });
            
//             // Handle paste event
//             input.addEventListener('paste', function(e) {
//                 e.preventDefault();
//                 const pasteData = e.clipboardData.getData('text').trim();
                
//                 if (/^\d{6}$/.test(pasteData)) {
//                     // If pasted data is 6 digits, distribute across inputs
//                     otpInputs.forEach((input, i) => {
//                         input.value = pasteData[i] || '';
//                     });
//                     otpInputs[otpInputs.length - 1].focus();
//                 }
//             });
//         });
        
//         // OTP form submission
//         otpForm.addEventListener('submit', async function(e) {
//             e.preventDefault();
            
//             // Get entered OTP
//             let enteredOTP = '';
//             otpInputs.forEach(input => {
//                 enteredOTP += input.value;
//             });
            
//             // Verify OTP
//             if (enteredOTP.length === 6) {
//                 await verifyOTP(enteredOTP);
//             } else {
//                 otpError.textContent = 'Please enter a valid 6-digit OTP';
//                 otpError.classList.remove('hidden');
//             }
//         });
        
//         // Resend OTP
//         resendLink.addEventListener('click', async function(e) {
//             e.preventDefault();
            
//             // Clear existing OTP inputs
//             otpInputs.forEach(input => {
//                 input.value = '';
//             });
            
//             // Resend OTP to the same email
//             await sendOTP(userEmail);
//         });
        
//         // Final form submission
//         userForm.addEventListener('submit', async function(e) {
//             e.preventDefault();
            
//             const username = document.getElementById('username-input').value.trim();
//             const password = document.getElementById('password-input').value;
//             const confirmPassword = document.getElementById('confirm-password-input').value;
            
//             // Simple validation
//             if (password !== confirmPassword) {
//                 registerError.textContent = 'Passwords do not match';
//                 registerError.classList.remove('hidden');
//                 return;
//             }
            
//             if (password.length < 8) {
//                 registerError.textContent = 'Password must be at least 8 characters long';
//                 registerError.classList.remove('hidden');
//                 return;
//             }
            
//             // Register user
//             await registerUser(username, password);
//         });
        
//         // Google button functionality
//         document.querySelector('.google-button').addEventListener('click', function() {
//             // Redirect to Google OAuth endpoint
//             window.location.href = `${API_BASE_URL}/auth/google`;
//         });
//     </script>