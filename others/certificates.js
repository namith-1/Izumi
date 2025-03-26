document.addEventListener('DOMContentLoaded', () => {
    const certificateCards = document.querySelectorAll('.certificate-card');

    certificateCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        });
    });

    // Optional: Add functionality to certificate view buttons
    const viewCertificateButtons = document.querySelectorAll('.btn-primary');
    viewCertificateButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Certificate view functionality to be implemented');
        });
    });
});