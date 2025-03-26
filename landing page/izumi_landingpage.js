// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            authButtons.classList.toggle('active');
        });
    }
    function showOverlay() {
        document.getElementById("overlay").style.display = "flex";
    }

    function hideOverlay() {
        document.getElementById("overlay").style.display = "none";
    }
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-nav.prev');
    const nextBtn = document.querySelector('.testimonial-nav.next');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
            showSlide(currentSlide);
        });
        
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % testimonials.length;
            showSlide(currentSlide);
        });
    }
    
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
    }
    
    // Auto slide testimonials
    setInterval(function() {
        if (testimonials.length > 1) {
            currentSlide = (currentSlide + 1) % testimonials.length;
            showSlide(currentSlide);
        }
    }, 5000);
    
    // Modal Functionality
    const loginBtn = document.querySelector('.btn-login');
    const signupBtn = document.querySelector('.btn-signup');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const showSignupBtns = document.querySelectorAll('.show-signup');
    const showLoginBtns = document.querySelectorAll('.show-login');
    const signupFreeBtns = document.querySelectorAll('.btn-primary');
    
    // Function to open modal
    function openModal(modal) {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Function to close modal
    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Login button click
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            openModal(loginModal);
        });
    }
    
    // Signup button click
    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            openModal(signupModal);
        });
    }
    
    // Sign up for free button click (in CTA section)
    signupFreeBtns.forEach(btn => {
        if (btn.textContent === 'Sign Up For Free') {
            btn.addEventListener('click', function() {
                openModal(signupModal);
            });
        }
    });
    
    // Close button click
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            closeModal(loginModal);
            closeModal(signupModal);
        });
    });
    
    // Show signup from login modal
    showSignupBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal(loginModal);
            openModal(signupModal);
        });
    });
    
    // Show login from signup modal
    showLoginBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal(signupModal);
            openModal(loginModal);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            closeModal(loginModal);
        }
        if (e.target === signupModal) {
            closeModal(signupModal);
        }
    });
    
    // Form validation
    const authForms = document.querySelectorAll('.auth-form');
    
    authForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const inputs = form.querySelectorAll('input[required]');
            
            inputs.forEach(input => {
                if (!input.value) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // For demo purposes, just close the modal
                closeModal(loginModal);
                closeModal(signupModal);
                
                // Show success message
                alert('Form submitted successfully!');
            }
        });
    });
    
    // 3D Effect on Images
    const hero3dElement = document.querySelector('.hero-3d-element');
    const cta3dElement = document.querySelector('.cta-3d-element');
    
    if (hero3dElement) {
        window.addEventListener('mousemove', function(e) {
            const x = (window.innerWidth / 2 - e.pageX) / 30;
            const y = (window.innerHeight / 2 - e.pageY) / 30;
            
            hero3dElement.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${-x}deg)`;
        });
    }
    
    if (cta3dElement) {
        window.addEventListener('mousemove', function(e) {
            const x = (window.innerWidth / 2 - e.pageX) / 50;
            const y = (window.innerHeight / 2 - e.pageY) / 50;
            
            cta3dElement.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${-x}deg)`;
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Adjust for navbar height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    authButtons.classList.remove('active');
                }
            }
        });
    });
    
   
   
    // Run on load and scroll
    window.addEventListener('load', checkIfInView);
    window.addEventListener('scroll', checkIfInView);
    
    // Search box functionality
    const searchBox = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.btn-search');
    
    if (searchButton && searchBox) {
        searchButton.addEventListener('click', function() {
            const searchQuery = searchBox.value.trim();
            
            if (searchQuery) {
                // In a real application, this would redirect to search results
                alert(`Searching for: ${searchQuery}`);
                searchBox.value = '';
            }
        });
        
        // Allow search on Enter key
        searchBox.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchQuery = searchBox.value.trim();
                
                if (searchQuery) {
                    // In a real application, this would redirect to search results
                    alert(`Searching for: ${searchQuery}`);
                    searchBox.value = '';
                }
            }
        });
    }
});

// Function to load an HTML, CSS, and JS file dynamically
function loadSeparatedContent(htmlFile, cssFile, jsFile, containerId) {
    fetch(htmlFile)
        .then(response => response.text())
        .then(data => {
            document.getElementById(containerId).innerHTML = data;  // Insert HTML into the correct div

            // Dynamically load the CSS file
            let cssLink = document.createElement("link");
            cssLink.rel = "stylesheet";
            cssLink.href = cssFile;
            document.head.appendChild(cssLink);

            // Dynamically load the JS file
            let scriptTag = document.createElement("script");
            scriptTag.src = jsFile;
            document.body.appendChild(scriptTag);
        })
        .catch(error => console.error("Error loading content:", error));
}

// Load the Course section into #course-section
loadSeparatedContent("courses/course.html", "courses/course.css", "courses/course.js", "course-section");

// Load the Magazine section into #magazine-section
loadSeparatedContent("magazines/magazine.html", "magazines/magazine.css", "magazines/magazine.js", "magazine-section");
