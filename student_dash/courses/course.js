    // Course continue buttons
    const continueBtns = document.querySelectorAll('.continue-btn');
    continueBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const courseTitle = this.closest('.course-card').querySelector('.course-title').textContent;
            console.log(`Continuing course: ${courseTitle}`);
            // In a real app, this would navigate to the course content page
            // window.location.href = `/course/${courseId}`;
        });
    });

        // Course Card Click Event
        if (courseCards.length) {
            courseCards.forEach(card => {
                card.addEventListener('click', function() {
                    alert('Opening course content...');
                });
            });
        }