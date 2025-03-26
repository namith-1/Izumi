document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');

    // Navigation menu functionality
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all nav items and sections
            navItems.forEach(navItem => navItem.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Show corresponding content section
            const sectionId = item.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Sidebar toggle functionality
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    // Notification button
    const notificationBtn = document.querySelector('.notification-btn');
    const notificationIndicator = document.querySelector('.notification-indicator');
    
    notificationBtn.addEventListener('click', () => {
        notificationIndicator.style.display = 'none';
        // TODO: Implement notification modal/dropdown
    });

    // Search functionality
    const searchInput = document.querySelector('.search-container input');
    const searchBtn = document.querySelector('.search-btn');

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // TODO: Implement actual search functionality
            alert(`Searching for: ${query}`);
        }
    }

    // Timeframe filter
    const timeframeSelect = document.getElementById('timeframe');
    timeframeSelect.addEventListener('change', (e) => {
        const selectedTimeframe = e.target.value;
        // TODO: Implement timeframe filtering for stats
        console.log(`Selected timeframe: ${selectedTimeframe}`);
    });
});