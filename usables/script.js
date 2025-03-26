let magazineList = [];
let lastLoadedId = 0; // Track last magazine ID

async function fetchMagazines() {
    try {
        const response = await fetch(`http://localhost:5000/magazines?lastId=${lastLoadedId}`);
        const magazines = await response.json();

        if (magazines.length > 0) {
            magazineList = [...magazineList, ...magazines];
            lastLoadedId = magazines[magazines.length - 1].id; // Update last loaded ID
            displayMagazines();
        } else {
            alert("No more magazines to load!");
        }
    } catch (error) {
        console.error("Error fetching magazines:", error);
    }
}

function displayMagazines() {
    const container = document.getElementById("magazineContainer");
    container.innerHTML = ""; // Clear previous content

    magazineList.forEach(magazine => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${magazine.image_url}" alt="Magazine Cover">
            <div class="card-content">
                <div class="card-title">${magazine.title}</div>
                <div class="card-desc">${magazine.description}</div>
            </div>
        `;
        container.appendChild(card);
    });
}

fetchMagazines(); // Load first batch on page load
