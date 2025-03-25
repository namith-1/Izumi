document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const body = document.body;
    const viewButtons = document.querySelectorAll('.view-btn');
    const magazineContainer = document.querySelector('.magazine-container');
    const bookmarkButtons = document.querySelectorAll('.action-btn.bookmark');
    const filterTags = document.querySelectorAll('.filter-tag');
    const searchInput = document.querySelector('.search-container input');
    const categorySelect = document.getElementById('category');
    const sortSelect = document.getElementById('sort');
    
    // Toggle sidebar
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('expanded');
        body.classList.toggle('sidebar-open');
    });
    
    // Close sidebar when clicking outside (on mobile)
    document.addEventListener('click', function(e) {
        if (body.classList.contains('sidebar-open') && 
            !sidebar.contains(e.target) && 
            e.target !== sidebarToggle) {
            sidebar.classList.remove('expanded');
            body.classList.remove('sidebar-open');
        }
    });
    
    // Switch between grid and list view
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all view buttons
            viewButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get view type from data attribute
            const viewType = this.getAttribute('data-view');
            
            // Update container class
            if (viewType === 'grid') {
                magazineContainer.className = 'magazine-container grid-view';
            } else if (viewType === 'list') {
                magazineContainer.className = 'magazine-container list-view';
            }
        });
    });
    
    // Bookmark functionality
    bookmarkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            // Toggle between filled and outline bookmark icon
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                
                // Show temporary bookmark confirmation
                showNotification('Article added to bookmarks');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                
                // Show temporary bookmark removal confirmation
                showNotification('Article removed from bookmarks');
            }
        });
    });
    
    // Filter tag selection
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Remove active class from all tags
            filterTags.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tag
            this.classList.add('active');
            
            // Filter magazines based on selected tag
            filterMagazines();
        });
    });
    
    // Search functionality
    searchInput.addEventListener('input', debounce(function() {
        filterMagazines();
    }, 300));
    
    // Category and sort change
    categorySelect.addEventListener('change', filterMagazines);
    sortSelect.addEventListener('change', sortMagazines);
    
    // Pagination functionality
    const paginationButtons = document.querySelectorAll('.pagination .page-btn');
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('active') && !this.classList.contains('next')) {
                paginationButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Simulate page change (in a real app, this would load new content)
                showNotification('Loading page ' + this.textContent);
                
                // Scroll to top of magazine section
                document.querySelector('.magazine-grid').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Notification functionality
    function showNotification(message) {
        // Check if a notification already exists and remove it
        const existingNotification = document.querySelector('.notification-message');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification-message';
        notification.textContent = message;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Hide and remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Filter magazines based on search, category, and tags
    function filterMagazines() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value;
        const selectedTag = document.querySelector('.filter-tag.active').textContent;
        
        // Placeholder for actual filtering logic
        // In a real app, this would filter the actual magazine cards
        // For this demo, we'll just show a notification
        let filterMessage = 'Filtering magazines';
        if (searchTerm) {
            filterMessage += ` for "${searchTerm}"`;
        }
        if (selectedCategory !== 'all') {
            filterMessage += ` in ${selectedCategory.replace('-', ' ')}`;
        }
        if (selectedTag !== 'All') {
            filterMessage += ` tagged as ${selectedTag}`;
        }
        
        showNotification(filterMessage);
    }
    
    // Sort magazines based on selected option
    function sortMagazines() {
        const sortOption = sortSelect.value;
        showNotification(`Sorting magazines by ${sortOption.replace('-', ' ')}`);
        
        // Placeholder for actual sorting logic
        // In a real app, this would reorder the magazine cards
    }
    
    // Debounce function for search input
    function debounce(func, delay) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }
    
    // Add CSS for notifications
    addNotificationStyles();
    
    function addNotificationStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .notification-message {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: var(--dark);
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 1000;
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.3s, transform 0.3s;
                font-size: 0.875rem;
            }
            
            .notification-message.show {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    // Show/hide mobile menu button based on screen width
    function handleResponsiveLayout() {
        if (window.innerWidth <= 576) {
            // Create mobile menu button if it doesn't exist
            if (!document.querySelector('.mobile-menu-btn')) {
                const menuBtn = document.createElement('button');
                menuBtn.className = 'mobile-menu-btn';
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                document.querySelector('.main-header').prepend(menuBtn);
                
                menuBtn.addEventListener('click', function() {
                    sidebar.classList.add('expanded');
                    body.classList.add('sidebar-open');
                });
            }
        } else {
            // Remove mobile menu button if it exists
            const menuBtn = document.querySelector('.mobile-menu-btn');
            if (menuBtn) {
                menuBtn.remove();
            }
            
            // Reset sidebar on larger screens
            if (window.innerWidth > 576) {
                sidebar.classList.remove('expanded');
                body.classList.remove('sidebar-open');
            }
        }
    }
    
    // Initialize responsive layout
    handleResponsiveLayout();
    
    // Update layout on window resize
    window.addEventListener('resize', debounce(handleResponsiveLayout, 100));
    
    // Simulate loading state
    setTimeout(() => {
        document.querySelectorAll('.magazine-card').forEach(card => {
            card.style.opacity = '1';
        });
    }, 500);
});