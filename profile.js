document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const darkModeToggle = document.getElementById('dark-mode');
    
    // Profile Edit Variables
    const profileEditForm = document.getElementById('profile-edit-form');
    const avatarEdit = document.getElementById('avatar-edit');
    const profilePictureUpload = document.getElementById('profile-picture-upload');
    const profilePicture = document.getElementById('profile-picture');
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    
    // Image Crop Modal Variables
    const imageCropModal = document.getElementById('image-crop-modal');
    const imageCropperContainer = document.getElementById('image-cropper-container');
    const cropSaveBtn = document.getElementById('crop-save');
    const cropCancelBtn = document.getElementById('crop-cancel');
    let cropper = null;

    // Dark Mode Toggle
    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');

            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));

            // Add active class to current tab and content
            tab.classList.add('active');
            document.getElementById(tabId).classList.add('active');

            // Populate edit form when Edit Profile tab is opened
            if (tabId === 'edit-profile') {
                document.getElementById('edit-name').value = profileName.textContent;
                document.getElementById('edit-email').value = profileEmail.textContent;
            }
        });
    });

    // Profile Picture Upload
    avatarEdit.addEventListener('click', () => {
        profilePictureUpload.click();
    });

    profilePictureUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                // Clear previous cropper if exists
                if (cropper) {
                    cropper.destroy();
                }

                // Set up image in modal
                imageCropperContainer.innerHTML = `<img src="${event.target.result}" id="image-to-crop">`;
                const imageToCrop = document.getElementById('image-to-crop');

                // Initialize Cropper
                cropper = new Cropper(imageToCrop, {
                    aspectRatio: 1,
                    viewMode: 1,
                    dragMode: 'move',
                    guides: true,
                    background: false
                });

                // Show modal
                imageCropModal.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Crop Save Button
    cropSaveBtn.addEventListener('click', () => {
        // Get cropped image
        const croppedCanvas = cropper.getCroppedCanvas({
            width: 150,
            height: 150
        });

        // Convert to data URL and set as profile picture
        profilePicture.src = croppedCanvas.toDataURL('image/jpeg');

        // Close modal and destroy cropper
        imageCropModal.style.display = 'none';
        cropper.destroy();
        cropper = null;
    });

    // Crop Cancel Button
    cropCancelBtn.addEventListener('click', () => {
        imageCropModal.style.display = 'none';
        if (cropper) {
            cropper.destroy();
            cropper = null;
        }
    });

    // Profile Edit Form Submission
    profileEditForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const newName = document.getElementById('edit-name').value;
        const newEmail = document.getElementById('edit-email').value;
        const newBio = document.getElementById('edit-bio').value;
        const skills = Array.from(document.getElementById('edit-interests').selectedOptions)
            .map(option => option.value);

        // Update profile
        profileName.textContent = newName;
        profileEmail.textContent = newEmail;

        // In a real application, you would send this data to a backend
        console.log('Profile Updated:', {
            name: newName,
            email: newEmail,
            bio: newBio,
            skills: skills,
            profilePicture: profilePicture.src
        });

        // Switch back to Achievements tab
        tabs.forEach(t => {
            if (t.getAttribute('data-tab') === 'achievements') {
                t.click();
            }
        });

        // Optional: Show success message
        alert('Profile updated successfully!');
    });

    // Cancel Edit
    document.querySelector('.btn-cancel').addEventListener('click', () => {
        // Switch back to Achievements tab
        tabs.forEach(t => {
            if (t.getAttribute('data-tab') === 'achievements') {
                t.click();
            }
        });
    });
});