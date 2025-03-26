document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.querySelector('.nav-menu');
    const navItems = navMenu.querySelectorAll('li');

    // Navigation menu active state
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
        });
    });

    // Toggle switches functionality
    const toggleSwitches = document.querySelectorAll('.switch input[type="checkbox"]');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            const toggleItem = e.target.closest('.toggle-item');
            const toggleText = toggleItem.querySelector('span');
            
            if (e.target.checked) {
                toggleText.style.color = 'var(--text-primary)';
            } else {
                toggleText.style.color = 'var(--text-tertiary)';
            }
        });
    });

    // Save and Cancel buttons
    const saveButton = document.querySelector('.btn-save');
    const cancelButton = document.querySelector('.btn-cancel');

    saveButton.addEventListener('click', () => {
        // Implement save logic here
        alert('Changes saved successfully!');
    });

    cancelButton.addEventListener('click', () => {
        // Reset form or navigate away
        window.location.reload();
    });
});