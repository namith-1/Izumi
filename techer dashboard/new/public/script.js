let modules = [];

function addModule(parent = null) {
    const title = prompt("Module Title:");
    if (!title) return;

    const mod = { title, subModules: [] };

    if (parent === null) {
        modules.push(mod);
    } else {
        parent.subModules.push(mod);
    }

    renderModules();
}

function renderModules(parent = null, parentElement = document.getElementById("modules")) {
    parentElement.innerHTML = "";

    const list = parent ? parent.subModules : modules;
    
    list.forEach((mod) => {
        const li = document.createElement("li");
        li.textContent = mod.title;

        const btn = document.createElement("button");
        btn.textContent = "Add Sub-Module";
        btn.onclick = () => addModule(mod);

        li.appendChild(btn);
        const subList = document.createElement("ul");
        li.appendChild(subList);
        parentElement.appendChild(li);
        
        renderModules(mod, subList);
    });
}

function saveCourse() {
    fetch("/save-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: document.getElementById("courseTitle").value, modules })
    }).then(res => res.json()).then(alert);
}

function loadCourse() {
    const courseId = prompt("Enter Course ID:");
    fetch(`/course/${courseId}`).then(res => res.json()).then(data => {
        document.getElementById("courseTitle").value = data.title;
        modules = data.modules;
        renderModules();
    });
}

function fetchSavedCourses() {
    fetch("/courses").then(res => res.json()).then(courses => {
        const savedCoursesList = document.getElementById("savedCourses");
        savedCoursesList.innerHTML = "";

        courses.forEach(course => {
            const li = document.createElement("li");
            const link = document.createElement("a");
            link.href = "#";
            link.textContent = course.title;
            link.onclick = () => loadCourseById(course.id);
            li.appendChild(link);
            savedCoursesList.appendChild(li);
        });
    });
}

function loadCourseById(courseId) {
    fetch(`/course/${courseId}`).then(res => res.json()).then(data => {
        document.getElementById("courseTitle").value = data.title;
        modules = data.modules;
        renderModules();
    });
}
