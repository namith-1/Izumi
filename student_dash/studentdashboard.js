document.addEventListener('DOMContentLoaded', function() {
    // Element references
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    const timeframeSelect = document.getElementById('timeframe');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelectorAll('.sidebar-menu a[data-page]');
    const pageContents = document.querySelectorAll('.page-content');
    const calendarDates = document.querySelectorAll('.calendar-date');
    const magazineCtas = document.querySelectorAll('.magazine-cta');
    const gameCtas = document.querySelectorAll('.game-cta');
    const courseCards = document.querySelectorAll('.course-card');
    const statCards = document.querySelectorAll('.stat-card');
    
    // Toggle sidebar on mobile
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            document.querySelector('.main-content').classList.toggle('expanded');
        });
    }

    // Mobile Menu Toggle
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Page Navigation
    if (navLinks.length) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                // Remove active class from all links
                navLinks.forEach(item => item.classList.remove('active'));

                // Add active class to clicked link
                this.classList.add('active');

                // Hide all pages
                pageContents.forEach(page => page.classList.remove('active'));

                // Show the selected page
                const pageId = this.getAttribute('data-page');
                document.getElementById(pageId).classList.add('active');

                // Hide sidebar on mobile after clicking
                if (window.innerWidth <= 992) {
                    sidebar.classList.remove('active');
                }
            });
        });
    }

    // Handle navigation clicks
    if (navItems.length) {
        navItems.forEach(navItem => {
            navItem.addEventListener('click', function(e) {
                // Only process if it has a data-section attribute
                if (this.dataset.section) {
                    e.preventDefault();
                    
                    // Remove active class from all nav items
                    navItems.forEach(item => {
                        item.classList.remove('active');
                    });
                    
                    // Add active class to clicked nav item
                    this.classList.add('active');
                    
                    // Hide all content sections
                    contentSections.forEach(section => {
                        section.classList.remove('active');
                    });
                    
                    // Show the corresponding content section
                    const targetSection = document.getElementById(this.dataset.section);
                    if (targetSection) {
                        targetSection.classList.add('active');
                        // Update the page title
                        document.querySelector('.main-title').textContent = targetSection.querySelector('h2').textContent;
                    }
                }
            });
        });
    }
    
    // Handle timeframe selector changes
    if (timeframeSelect) {
        timeframeSelect.addEventListener('change', function() {
            // In a real app, this would update the stats data based on the selected timeframe
            console.log(`Timeframe changed to: ${this.value}`);
            refreshStatsData(this.value);
        });
    }

    // Notification button functionality
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            // Toggle notification panel (to be implemented)
            console.log('Notification button clicked');
            // Example: Show a notification popup
            showNotificationPanel();
        });
    }
    
    // User profile dropdown functionality
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            // Toggle user dropdown (to be implemented)
            console.log('User profile clicked');
            // Example: Show a user menu dropdown
            toggleUserMenu();
        });
    }
    

    
    // Badge hover interactions
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            const badgeTitle = this.getAttribute('title');
            if (badgeTitle && badgeTitle !== 'View All') {
                // Show tooltip with badge details
                showBadgeTooltip(this, badgeTitle);
            }
        });
        
        badge.addEventListener('mouseleave', function() {
            // Hide tooltip
            hideBadgeTooltip();
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-container input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchQuery = searchInput.value.trim();
            if (searchQuery) {
                performSearch(searchQuery);
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchQuery = this.value.trim();
                if (searchQuery) {
                    performSearch(searchQuery);
                }
            }
        });
    
    }
    
    // Stat Card Click Event
    if (statCards.length) {
        statCards.forEach(card => {
            card.addEventListener('click', function() {
                const label = this.querySelector('.stat-card-label').textContent;
                alert(`Viewing detailed ${label} statistics...`);
            });
        });
    }
    
    // Helper functions (to be implemented in a real application)
    function refreshStatsData(timeframe) {
        // Simulating stats update with animation
        const statElements = document.querySelectorAll('.stat');
        const progressBars = document.querySelectorAll('.progress');
        
        // Apply animated transition
        statElements.forEach(stat => {
            stat.style.transition = 'opacity 0.3s ease-out';
            stat.style.opacity = '0.5';
            
            setTimeout(() => {
                // In a real app, fetch new data here
                // For demo, just set back to normal
                stat.style.opacity = '1';
            }, 500);
        });
        
        // Simulate progress bar updates
        progressBars.forEach(bar => {
            const currentWidth = parseInt(bar.style.width);
            // Random adjustment for demo
            const newWidth = Math.max(10, Math.min(100, currentWidth + (Math.random() * 20 - 10)));
            bar.style.transition = 'width 0.8s ease-in-out';
            bar.style.width = `${newWidth}%`;
            
            // Update corresponding percentage text
            const statCard = bar.closest('.stat-card');
            if (statCard) {
                const statText = statCard.querySelector('.stat');
                if (statText && !statText.querySelector('span')) {
                    setTimeout(() => {
                        statText.textContent = `${Math.round(newWidth)}%`;
                    }, 300);
                }
            }
        });
    }
    
    function showNotificationPanel() {
        // Create notification panel element
        let panel = document.querySelector('.notification-panel');
        
        if (!panel) {
            panel = document.createElement('div');
            panel.className = 'notification-panel';
            panel.innerHTML = `
                <div class="notification-header">
                    <h3>Notifications</h3>
                    <button class="close-notifications">×</button>
                </div>
                <div class="notification-list">
                    <div class="notification-item unread">
                        <div class="notification-icon"><i class="fas fa-comment"></i></div>
                        <div class="notification-content">
                            <p>Dr. Julia Chen replied to your question in JavaScript forum</p>
                            <span class="notification-time">5 minutes ago</span>
                        </div>
                    </div>
                    <div class="notification-item">
                        <div class="notification-icon"><i class="fas fa-calendar-check"></i></div>
                        <div class="notification-content">
                            <p>Reminder: Data Science study group tomorrow</p>
                            <span class="notification-time">2 hours ago</span>
                        </div>
                    </div>
                    <div class="notification-item">
                        <div class="notification-icon"><i class="fas fa-certificate"></i></div>
                        <div class="notification-content">
                            <p>You're 90% complete with UI/UX Design course</p>
                            <span class="notification-time">Yesterday</span>
                        </div>
                    </div>
                </div>
                <a href="#" class="view-all-notifications">View All Notifications</a>
            `;
            
            document.querySelector('.header-right').appendChild(panel);
            
            // Add close functionality
            panel.querySelector('.close-notifications').addEventListener('click', function() {
                panel.remove();
            });
            
            // Close when clicking outside
            document.addEventListener('click', function closeNotif(e) {
                if (!panel.contains(e.target) && !notificationBtn.contains(e.target)) {
                    panel.remove();
                    document.removeEventListener('click', closeNotif);
                }
            });
        } else {
            panel.remove();
        }
        
        // Remove notification indicator
        const indicator = document.querySelector('.notification-indicator');
        if (indicator) {
            indicator.style.display = 'none';
        }
    }
    
    function toggleUserMenu() {
        // Create user menu dropdown
        let menu = document.querySelector('.user-menu');
        
        if (!menu) {
            menu = document.createElement('div');
            menu.className = 'user-menu';
            menu.innerHTML = `
                <div class="user-menu-header">
                    <div class="user-avatar">A</div>
                    <div>
                        <p class="user-name">Alex Johnson</p>
                        <p class="user-email">alex.j@example.com</p>
                    </div>
                </div>
                <div class="user-menu-items">
                    <a href="#"><i class="fas fa-user"></i> View Profile</a>
                    <a href="#"><i class="fas fa-cog"></i> Account Settings</a>
                    <a href="#"><i class="fas fa-palette"></i> Appearance</a>
                    <a href="#"><i class="fas fa-bell"></i> Notification Preferences</a>
                    <a href="login.html"><i class="fas fa-sign-out-alt"></i> Logout</a>
                </div>
            `;
            
            document.querySelector('.header-right').appendChild(menu);
            
            // Close when clicking outside
            document.addEventListener('click', function closeMenu(e) {
                if (!menu.contains(e.target) && !userProfile.contains(e.target)) {
                    menu.remove();
                    document.removeEventListener('click', closeMenu);
                }
            });
        } else {
            menu.remove();
        }
    }
    
    function showBadgeTooltip(badgeElement, title) {
        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'badge-tooltip';
        tooltip.textContent = title;
        
        // Position tooltip
        const rect = badgeElement.getBoundingClientRect();
        tooltip.style.top = `${rect.top - 40}px`;
        tooltip.style.left = `${rect.left + (rect.width / 2)}px`;
        
        document.body.appendChild(tooltip);
        
        // Animate in
        setTimeout(() => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(0)';
        }, 10);
    }
    
    function hideBadgeTooltip() {
        const tooltip = document.querySelector('.badge-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
    
    function performSearch(query) {
        console.log(`Searching for: ${query}`);
        
        // In a real app, this would navigate to search results page or show results
        // For demo, let's create a simple search overlay
        const overlay = document.createElement('div');
        overlay.className = 'search-overlay';
        overlay.innerHTML = `
            <div class="search-results">
                <div class="search-header">
                    <h3>Search Results for "${query}"</h3>
                    <button class="close-search">×</button>
                </div>
                <div class="results-container">
                    <p>Searching courses, forums, and resources...</p>
                    <div class="loader"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Add close functionality
        overlay.querySelector('.close-search').addEventListener('click', function() {
            overlay.remove();
        });
        
        // Simulate search delay
        setTimeout(() => {
            overlay.querySelector('.results-container').innerHTML = `
                <div class="result-group">
                    <h4>Courses (2 results)</h4>
                    <div class="result-item">
                        <i class="fas fa-graduation-cap"></i>
                        <div>
                            <h5>Advanced JavaScript Patterns</h5>
                            <p>Module containing "${query}" in description</p>
                        </div>
                    </div>
                    <div class="result-item">
                        <i class="fas fa-graduation-cap"></i>
                        <div>
                            <h5>Introduction to ${query}</h5>
                            <p>Recommended course based on your interests</p>
                        </div>
                    </div>
                </div>
                
                <div class="result-group">
                    <h4>Forum Posts (3 results)</h4>
                    <div class="result-item">
                        <i class="fas fa-comments"></i>
                        <div>
                            <h5>How to implement ${query} in my project?</h5>
                            <p>Posted in Advanced JavaScript forum • 2 days ago</p>
                        </div>
                    </div>
                    <div class="result-item">
                        <i class="fas fa-comments"></i>
                        <div>
                            <h5>Best resources for learning ${query}</h5>
                            <p>Posted in Resources forum • 1 week ago</p>
                        </div>
                    </div>
                    <div class="result-item">
                        <i class="fas fa-comments"></i>
                        <div>
                            <h5>Help with ${query} implementation</h5>
                            <p>Posted in Q&A forum • 3 weeks ago</p>
                        </div>
                    </div>
                </div>
                
                <div class="no-more-results">
                    <p>End of search results for "${query}"</p>
                </div>
            `;
        }, 1500);
        
        // Allow closing by clicking outside
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }
    
    // Initialize any charts or visualizations
    function initializeCharts() {
        // This would set up any charts or visualizations that need JavaScript
        // For example, using a library like Chart.js
        // In this demo, we'll just leave this as a placeholder
    }

    // Call initialization functions
    initializeCharts();
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
loadSeparatedContent("courses/course.html", "courses/course.css", "courses/course.js", "course");

// Load the Magazine section into #magazine-section
loadSeparatedContent("magazines/magazine.html", "magazines/magazine.css", "magazines/magazine.js", "magazine");

loadSeparatedContent("dashboard/dashboard.html", "dashboard/dashboard.css", "dashboard/dashboard.js", "dashboard");

loadSeparatedContent("games/game.html", "games/game.css", "games/game.js", "game");