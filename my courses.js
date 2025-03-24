document.addEventListener('DOMContentLoaded', function() {
    // Variables

    const statusFilter = document.getElementById('status-filter');
    const categoryFilter = document.getElementById('category-filter');
    const sortBySelect = document.getElementById('sort-by');
    const searchInput = document.querySelector('.search-container input');
    const searchButton = document.querySelector('.search-btn');
    const courseCards = document.querySelectorAll('.course-card');
    
    // View toggle (Grid/List)
  
    
    // Status Filter
    statusFilter.addEventListener('change', filterCourses);
    
    // Category Filter
    categoryFilter.addEventListener('change', filterCourses);
    
    // Sort By
    sortBySelect.addEventListener('change', sortCourses);
    
    // Search functionality
    searchButton.addEventListener('click', searchCourses);
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchCourses();
        }
    });
    
    // Filter Courses Function
    function filterCourses() {
        const statusValue = statusFilter.value;
        const categoryValue = categoryFilter.value;
        
        courseCards.forEach(card => {
            let statusMatch = true;
            let categoryMatch = true;
            
            // Status filtering
            if (statusValue !== 'all') {
                if (statusValue === 'in-progress' && !card.querySelector('.course-badge').textContent.includes('Progress') && !card.querySelector('.course-badge').textContent.includes('Almost')) {
                    statusMatch = false;
                } else if (statusValue === 'completed' && !card.querySelector('.course-badge').textContent.includes('Completed')) {
                    statusMatch = false;
                } else if (statusValue === 'not-started' && !card.querySelector('.course-badge').textContent.includes('Not Started')) {
                    statusMatch = false;
                }
            }
            
            // Category filtering (this is simulated since we don't have category data in HTML)
            // In a real implementation, you would have data attributes or classes for categories
            if (categoryValue !== 'all') {
                const courseTitle = card.querySelector('.course-title').textContent.toLowerCase();
                
                if (categoryValue === 'programming' && 
                    !courseTitle.includes('javascript') && 
                    !courseTitle.includes('python') && 
                    !courseTitle.includes('react') && 
                    !courseTitle.includes('code') && 
                    !courseTitle.includes('app development')) {
                    categoryMatch = false;
                } else if (categoryValue === 'data-science' && 
                          !courseTitle.includes('data') && 
                          !courseTitle.includes('machine learning')) {
                    categoryMatch = false;
                } else if (categoryValue === 'design' && 
                          !courseTitle.includes('design') && 
                          !courseTitle.includes('ui') && 
                          !courseTitle.includes('ux')) {
                    categoryMatch = false;
                } else if (categoryValue === 'business' && 
                          !courseTitle.includes('business') && 
                          !courseTitle.includes('financial') && 
                          !courseTitle.includes('management') && 
                          !courseTitle.includes('agile')) {
                    categoryMatch = false;
                } else if (categoryValue === 'language' && 
                          !courseTitle.includes('japanese') && 
                          !courseTitle.includes('language')) {
                    categoryMatch = false;
                }
            }
            
            // Show or hide based on filters
            if (statusMatch && categoryMatch) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update section visibility based on filtered courses
        updateSectionVisibility();
    }
    
    // Sort Courses Function
    function sortCourses() {
        const sortValue = sortBySelect.value;
        const sections = document.querySelectorAll('.courses-section');
        
        sections.forEach(section => {
            const grid = section.querySelector('.courses-grid');
            const cards = Array.from(grid.querySelectorAll('.course-card:not([style*="display: none"])'));
            
            cards.sort((a, b) => {
                if (sortValue === 'alphabetical') {
                    const titleA = a.querySelector('.course-title').textContent;
                    const titleB = b.querySelector('.course-title').textContent;
                    return titleA.localeCompare(titleB);
                } else if (sortValue === 'progress') {
                    // Extract progress percentage or default values
                    const progressA = a.querySelector('.progress-text')?.textContent.match(/(\d+)%/) 
                        ? parseInt(a.querySelector('.progress-text').textContent.match(/(\d+)%/)[1]) 
                        : (a.classList.contains('completed') ? 100 : 0);
                    
                    const progressB = b.querySelector('.progress-text')?.textContent.match(/(\d+)%/) 
                        ? parseInt(b.querySelector('.progress-text').textContent.match(/(\d+)%/)[1]) 
                        : (b.classList.contains('completed') ? 100 : 0);
                        
                    return progressB - progressA; // Highest progress first
                } else if (sortValue === 'duration') {
                    // Extract duration or default values (this is just a simulation since we don't have real duration data)
                    const durationA = a.querySelector('.course-stat:nth-child(1) span').textContent.match(/(\d+)h/) 
                        ? parseInt(a.querySelector('.course-stat:nth-child(1) span').textContent.match(/(\d+)h/)[1]) 
                        : 0;
                    
                    const durationB = b.querySelector('.course-stat:nth-child(1) span').textContent.match(/(\d+)h/) 
                        ? parseInt(b.querySelector('.course-stat:nth-child(1) span').textContent.match(/(\d+)h/)[1]) 
                        : 0;
                        
                    return durationA - durationB; // Shortest duration first
                }
                
                // Default is 'recent' - we'll use position in DOM as a proxy
                return 0; // Keep original order
            });
            
            // Reorder the cards in the DOM
            cards.forEach(card => grid.appendChild(card));
        });
    }
    
    // Search Courses Function
    function searchCourses() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // If search is empty, reset all filters
            courseCards.forEach(card => {
                card.style.display = '';
            });
            statusFilter.value = 'all';
            categoryFilter.value = 'all';
            updateSectionVisibility();
            return;
        }
        
        courseCards.forEach(card => {
            const title = card.querySelector('.course-title').textContent.toLowerCase();
            const instructor = card.querySelector('.course-instructor span').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || instructor.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update section visibility based on search results
        updateSectionVisibility();
    }
    
    // Update Section Visibility
    function updateSectionVisibility() {
        const sections = document.querySelectorAll('.courses-section');
        
        sections.forEach(section => {
            const visibleCards = section.querySelectorAll('.course-card:not([style*="display: none"])');
            const courseCount = section.querySelector('.course-count');
            
            if (visibleCards.length === 0) {
                section.style.display = 'none';
            } else {
                section.style.display = '';
                // Update course count
                courseCount.textContent = `${visibleCards.length} course${visibleCards.length !== 1 ? 's' : ''}`;
            }
        });
    }
    
    // Animate on scroll - Simple animation for course cards
    function animateCards() {
        const cards = document.querySelectorAll('.course-card');
        
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }
    
    // Initialize animations
    animateCards();
    
    // Progress bar animation
    const progressBars = document.querySelectorAll('.course-progress-indicator');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-in-out';
            bar.style.width = width;
        }, 300);
    });
});