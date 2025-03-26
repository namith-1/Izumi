
    // Magazine Read Button Event
    if (magazineCtas.length) {
        magazineCtas.forEach(cta => {
            cta.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Opening magazine reader...');
            });
        });
    }