    // Game Play Button Event
    if (gameCtas.length) {
        gameCtas.forEach(cta => {
            cta.addEventListener('click', function() {
                alert('Loading game...');
            });
        });
    }