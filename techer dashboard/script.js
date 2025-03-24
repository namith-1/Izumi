let courseData = { title: "", description: "", modules: [] };
//  courseData = {
//     title: "Introduction to Programming",
//     description: "This course covers fundamental programming concepts including variables, control structures, and functions.",
//     modules: [
//         {
//             id: 1,
//             parent_id: null,
//             number: "1",
//             title: "Getting Started",
//             description: "Introduction to programming basics.",
//             details: [
//                 { id: 101, type: "text", content: "Welcome to the course! Let's start with the basics." },
//                 { id: 102, type: "video", url: "https://example.com/intro.mp4" }
//             ]
//         },
//         {
//             id: 2,
//             parent_id: 1,
//             number: "1.1",
//             title: "Setting Up Your Environment",
//             description: "Learn how to set up your programming environment.",
//             details: [
//                 { id: 103, type: "text", content: "Install the necessary tools to start coding." },
//                 { id: 104, type: "video", url: "https://example.com/setup.mp4" }
//             ]
//         },
//         {
//             id: 3,
//             parent_id: null,
//             number: "2",
//             title: "Programming Fundamentals",
//             description: "Learn about variables, data types, and operators.",
//             details: [
//                 { id: 105, type: "text", content: "Variables store data values and can be modified." },
//                 { id: 106, type: "video", url: "https://example.com/variables.mp4" }
//             ]
//         },
//         {
//             id: 4,
//             parent_id: 3,
//             number: "2.1",
//             title: "Control Structures",
//             description: "Understanding loops and conditional statements.",
//             details: [
//                 { id: 107, type: "text", content: "Loops help in executing code multiple times." },
//                 { id: 108, type: "video", url: "https://example.com/loops.mp4" }
//             ]
//         },
//         {
//             id: 5,
//             parent_id: null,
//             number: "3",
//             title: "Functions and Modular Code",
//             description: "Learn how to write reusable code with functions.",
//             details: [
//                 { id: 109, type: "text", content: "Functions help in organizing code and reusability." },
//                 { id: 110, type: "video", url: "https://example.com/functions.mp4" }
//             ]
//         }
//     ]
// };


// Auto-expand description
document.getElementById("course-desc").addEventListener("input", function(event) {
    event.target.style.height = "auto";
    event.target.style.height = (event.target.scrollHeight) + "px";
    courseData.description = event.target.value; // Store in data
});

// Add Module
function addModule(parentId = null, parentIndex = "") {
    let moduleId = Date.now(); // Unique ID
    let moduleIndex = getNewModuleIndex(parentId, parentIndex);

    let newModule = {
        id: moduleId,
        parent_id: parentId,
        number: moduleIndex,
        title: "",
        details: []
    };

    courseData.modules.push(newModule);
    renderModules();
}




// Get New Index
function getNewModuleIndex(parentId, parentIndex) {
    let siblings = courseData.modules.filter(m => m.parent_id === parentId);
    return parentIndex ? `${parentIndex}.${siblings.length + 1}` : `${siblings.length + 1}`;
}

function renderModules() {
    let courseContent = document.getElementById("course-content");
    courseContent.innerHTML = "";

    function renderRecursive(modules, parentElement, parentIndex = "") {
        modules.forEach(module => {
            let moduleDiv = document.createElement("div");
            moduleDiv.classList.add("module");

            moduleDiv.innerHTML = `
                <div class="module-header">
                    <span class="module-number">${module.number}</span>
                    <input type="text" value="${module.title}" placeholder="Module Title" oninput="updateModuleTitle(${module.id}, this.value)">
                    <button onclick="toggleModule(this)">-</button>
                    <button onclick="removeModule(${module.id})">Remove</button>
                </div>
                <div class="module-body" id="module-body-${module.id}">
                    <button onclick="addModule(${module.id}, '${module.number}')">Add Sub-Module</button>
                    <button onclick="addTextBlock(${module.id})">Add Text Block</button>
                    <button onclick="addVideo(${module.id})">Upload Video</button>
                </div>
                <div class="module-details" id="module-details-${module.id}"></div>
            `;

            parentElement.appendChild(moduleDiv);
            
            let moduleDetails = document.getElementById(`module-details-${module.id}`);
            module.details.forEach((detail, index) => {
                let detailElement = document.createElement("div");
                detailElement.classList.add("module-detail");

                if (detail.type === "text") {
                    detailElement.innerHTML = `
                        <textarea placeholder="Enter text..." oninput="updateTextBlock(${module.id}, ${index}, this.value)">${detail.content}</textarea>
                        <button onclick="removeDetail(${module.id}, ${index})">Remove</button>
                    `;
                } else if (detail.type === "video") {
                    detailElement.innerHTML = `
                        <input type="text" value="${detail.url}" placeholder="Video URL" oninput="updateVideoBlock(${module.id}, ${index}, this.value)">
                        <button onclick="removeDetail(${module.id}, ${index})">Remove</button>
                    `;
                }

                moduleDetails.appendChild(detailElement);
            });

            let moduleBody = document.getElementById(`module-body-${module.id}`);
            renderRecursive(courseData.modules.filter(m => m.parent_id === module.id), moduleBody);
        });
    }

    renderRecursive(courseData.modules.filter(m => !m.parent_id), courseContent);
}

// Update Text Block Content
function updateTextBlock(moduleId, detailIndex, newText) {
    let module = courseData.modules.find(m => m.id === moduleId);
    if (module) module.details[detailIndex].content = newText;
}

// Update Video Block URL
function updateVideoBlock(moduleId, detailIndex, newUrl) {
    let module = courseData.modules.find(m => m.id === moduleId);
    if (module) module.details[detailIndex].url = newUrl;
}

// Remove Text/Video Block
function removeDetail(moduleId, detailIndex) {
    let module = courseData.modules.find(m => m.id === moduleId);
    if (module) {
        module.details.splice(detailIndex, 1);
        renderModules();
    }
}

// Update Module Title
function updateModuleTitle(moduleId, newTitle) {
    let module = courseData.modules.find(m => m.id === moduleId);
    if (module) module.title = newTitle;
}

// Remove Module
function removeModule(moduleId) {
    courseData.modules = courseData.modules.filter(m => m.id !== moduleId && m.parent_id !== moduleId);
    renderModules();
}

// Add Text Block
function addTextBlock(parentId) {
    let parentModule = courseData.modules.find(m => m.id === parentId);
    if (parentModule) {
        parentModule.details.push({ type: "text", content: "" });
        renderModules();
    }
}

// Add Video Block
function addVideo(parentId) {
    let parentModule = courseData.modules.find(m => m.id === parentId);
    if (parentModule) {
        parentModule.details.push({ type: "video", url: "" });
        renderModules();
    }
}

// Save Course
function saveCourse() {
    fetch("http://localhost:5000/save-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData)
    })
    .then(res => res.json())
    .then(data => alert("Course saved successfully!"))
    .catch(err => console.error("Error:", err));
    renderModules();
    console.log(courseData);
}


async function fetchCourseData(courseId) {
    try {
        let response = await fetch(`http://localhost:5000/course/${courseId}`);
        let courseData_db = await response.json();

        console.log("Reconstructed Course Data:", courseData_db);
        courseData = courseData_db;
        document.getElementById("course-title").value = courseData.title;
        document.getElementById("course-desc").value = courseData.description;
        renderModules(); // Re-render the UI with retrieved data
    } catch (error) {
        console.error("Error fetching course data:", error);
    }
}

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

window.onload = function () {
    const courseID = getQueryParam("courseID");
    if (courseID) {
        fetchCourseData(courseID);
    } else {
        console.error("No courseID provided in the URL.");
    }
};