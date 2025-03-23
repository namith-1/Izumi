document.addEventListener('DOMContentLoaded', () => {
    // Show/hide course form
    const dashboard = document.getElementById("dashboard");
    const courseForm = document.getElementById("courseForm");
    const addCourseBtn = document.getElementById("addCourseBtn");
    const cancelCourseBtn = document.getElementById("cancelCourse");

    addCourseBtn.addEventListener("click", function() {
        dashboard.style.display = "none";
        courseForm.style.display = "block";
    });

    cancelCourseBtn.addEventListener("click", function() {
        dashboard.style.display = "block";
        courseForm.style.display = "none";
    });

    // Dropdown functionality for module and subtopic sections
    const setupDropdownListeners = () => {
        const dropdownToggle = document.querySelectorAll('.dropdown-icon');
        
        dropdownToggle.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const parent = this.parentElement;
                
                if (this.textContent === '▼') {
                    this.textContent = '△';
                    
                    // If it's a subtopic heading (h4)
                    if (parent.tagName === 'H4') {
                        const subtopicSection = parent.parentElement;
                        const contents = subtopicSection.querySelectorAll('.description-section, .upload-sections');
                        contents.forEach(content => content.style.display = 'none');
                    } 
                    // If it's a module heading (h3)
                    else if (parent.tagName === 'H3') {
                        const moduleSection = parent.parentElement;
                        const moduleTitle = moduleSection.querySelector('.module-title-row');
                        const subtopics = moduleSection.querySelectorAll('.subtopic-section');
                        
                        if (moduleTitle) moduleTitle.style.display = 'none';
                        subtopics.forEach(subtopic => subtopic.style.display = 'none');
                    }
                    // For the main heading (h2)
                    else if (parent.tagName === 'H2') {
                        const formContent = parent.parentElement.querySelectorAll('.form-row, .module-section');
                        formContent.forEach(content => content.style.display = 'none');
                    }
                } else {
                    this.textContent = '▼';
                    
                    // If it's a subtopic heading (h4)
                    if (parent.tagName === 'H4') {
                        const subtopicSection = parent.parentElement;
                        const contents = subtopicSection.querySelectorAll('.description-section, .upload-sections');
                        contents.forEach(content => content.style.display = 'block');
                    } 
                    // If it's a module heading (h3)
                    else if (parent.tagName === 'H3') {
                        const moduleSection = parent.parentElement;
                        const moduleTitle = moduleSection.querySelector('.module-title-row');
                        const subtopics = moduleSection.querySelectorAll('.subtopic-section');
                        
                        if (moduleTitle) moduleTitle.style.display = 'block';
                        subtopics.forEach(subtopic => subtopic.style.display = 'block');
                    }
                    // For the main heading (h2)
                    else if (parent.tagName === 'H2') {
                        const formContent = parent.parentElement.querySelectorAll('.form-row, .module-section');
                        formContent.forEach(content => content.style.display = 'block');
                    }
                }
            });
        });
    };
    
    setupDropdownListeners();

    // Add functionality for 'Add one' buttons
    const setupAddOneListeners = () => {
        const addOneButtons = document.querySelectorAll('.add-one-btn');
        
        addOneButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent triggering dropdown
                
                const parentHeader = this.parentElement;
                const isModule = parentHeader.tagName === 'H3';
                
                if (isModule) {
                    // Get all existing modules
                    const moduleSection = parentHeader.closest('.module-section');
                    const moduleContainer = moduleSection.parentElement;
                    const allModules = moduleContainer.querySelectorAll('.module-section');
                    const moduleCount = allModules.length + 1;
                    
                    // Create new module HTML
                    const newModuleHTML = `
                        <div class="module-section">
                            <h3><span class="dropdown-icon">▼</span> Module ${moduleCount}
                                <button class="add-one-btn">Add one</button>
                            </h3>
                            
                            <div class="module-title-row">
                                <label>Module title:</label>
                                <input type="text" placeholder="Enter module title">
                            </div>
                            
                            <div class="subtopic-section">
                                <h4><span class="dropdown-icon">△</span> Subtopic 1
                                    <button class="add-one-btn">Add one</button>
                                </h4>
                                
                                <div class="description-section">
                                    <label>Topic description:</label>
                                    <textarea placeholder="Enter topic description"></textarea>
                                </div>
                                
                                <div class="upload-sections">
                                    <div class="upload-row">
                                        <div class="upload-section">
                                            <button class="upload-btn">Upload Videos</button>
                                            <div class="video-url-container">
                                                <input type="text" class="video-url" placeholder="Enter video URL">
                                            </div>
                                        </div>
                                        
                                        <div class="upload-section">
                                            <button class="upload-btn">Upload docs</button>
                                            <div class="doc-url-container">
                                                <input type="text" class="doc-url" placeholder="Enter document URL">
                                            </div>
                                            <div class="upload-placeholder"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    // Insert new module
                    moduleContainer.insertAdjacentHTML('beforeend', newModuleHTML);
                    
                } else {
                    // Get all existing subtopics in the current module
                    const subtopicSection = parentHeader.closest('.subtopic-section');
                    const moduleSection = subtopicSection.parentElement;
                    const allSubtopics = moduleSection.querySelectorAll('.subtopic-section');
                    const subtopicCount = allSubtopics.length + 1;
                    
                    // Create new subtopic HTML
                    const newSubtopicHTML = `
                        <div class="subtopic-section">
                            <h4><span class="dropdown-icon">△</span> Subtopic ${subtopicCount}
                                <button class="add-one-btn">Add one</button>
                            </h4>
                            
                            <div class="description-section">
                                <label>Topic description:</label>
                                <textarea placeholder="Enter topic description"></textarea>
                            </div>
                            
                            <div class="upload-sections">
                                <div class="upload-row">
                                    <div class="upload-section">
                                        <button class="upload-btn">Upload Videos</button>
                                        <div class="video-url-container">
                                            <input type="text" class="video-url" placeholder="Enter video URL">
                                        </div>
                                    </div>
                                    
                                    <div class="upload-section">
                                        <button class="upload-btn">Upload docs</button>
                                        <div class="doc-url-container">
                                            <input type="text" class="doc-url" placeholder="Enter document URL">
                                        </div>
                                        <div class="upload-placeholder"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    // Insert new subtopic
                    moduleSection.insertAdjacentHTML('beforeend', newSubtopicHTML);
                }
                
                // Set up event listeners for new elements
                setupDropdownListeners();
                setupAddOneListeners();
                setupUploadListeners();
            });
        });
    };
    
    setupAddOneListeners();

    // File upload simulation
    const setupUploadListeners = () => {
        const uploadButtons = document.querySelectorAll('.upload-btn');
        
        uploadButtons.forEach(button => {
            button.addEventListener('click', function() {
                const text = this.textContent.trim();
                if (text === "Upload Videos") {
                    // Toggle the visibility of the video URL input field
                    const videoUrlContainer = this.nextElementSibling;
                    videoUrlContainer.style.display = videoUrlContainer.style.display === 'none' ? 'block' : 'none';
                } else if (text === "Upload docs") {
                    // Toggle the visibility of the document URL input field
                    const docUrlContainer = this.nextElementSibling;
                    docUrlContainer.style.display = docUrlContainer.style.display === 'none' ? 'block' : 'none';
                } else {
                    alert('File upload dialog would open here');
                }
            });
        });

        // Add event listener for video URL inputs
        const videoUrlInputs = document.querySelectorAll('.video-url');
        videoUrlInputs.forEach(input => {
            input.addEventListener('keyup', function(e) {
                if (e.key === 'Enter') {
                    alert(`Video URL saved: ${this.value}`);
                    this.value = '';
                }
            });
        });

        // Add event listener for document URL inputs
        const docUrlInputs = document.querySelectorAll('.doc-url');
        docUrlInputs.forEach(input => {
            input.addEventListener('keyup', function(e) {
                if (e.key === 'Enter') {
                    alert(`Document URL saved: ${this.value}`);
                    this.value = '';
                }
            });
        });
    };
    
    setupUploadListeners();
});