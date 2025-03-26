    // Course card hover effect
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });

        // Animation on scroll
        const animatedElements = document.querySelectorAll('.feature-card, .course-card, .magazine-card, .section-header');
    
        function checkIfInView() {
            const windowHeight = window.innerHeight;
            const windowTopPosition = window.scrollY;
            const windowBottomPosition = windowTopPosition + windowHeight;
            
            animatedElements.forEach(element => {
                const elementHeight = element.offsetHeight;
                const elementTopPosition = element.offsetTop;
                const elementBottomPosition = elementTopPosition + elementHeight;
                
                // Check if element is in view
                if ((elementBottomPosition >= windowTopPosition) && 
                    (elementTopPosition <= windowBottomPosition)) {
                    element.classList.add('in-view');
                }
            });
        }

        document.addEventListener('DOMContentLoaded', function() {
            const carousel = document.getElementById('courseCarousel');
            const cards = document.querySelectorAll('.course-card');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            let currentIndex = 0;
            const cardWidth = cards[0].offsetWidth + 25; // card width + gap
            const visibleCards = 3;
            const totalCards = cards.length;
        
            // Disable buttons when at start or end
            function updateButtonState() {
                prevBtn.disabled = currentIndex === 0;
                nextBtn.disabled = currentIndex >= totalCards - visibleCards;
                
                prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
                nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
            }
        
            // Next button click handler
            nextBtn.addEventListener('click', () => {
                if (currentIndex < totalCards - visibleCards) {
                    currentIndex++;
                    carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
                    updateButtonState();
                }
            });
        
            // Previous button click handler
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
                    updateButtonState();
                }
            });
        
            // Initial button state
            updateButtonState();
        });