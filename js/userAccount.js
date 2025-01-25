



function toggleEdit(fieldId) {
	
    const field = document.getElementById(fieldId);
    const isReadOnly = field.hasAttribute("readonly");
	resizeTextbox(field);
    if (isReadOnly) {
        // Remove readonly to allow editing
        field.removeAttribute("readonly");
        field.style.border = "1px solid #ccc"; // Optional: Add visual feedback
        field.focus();
    } else {
        // Reapply readonly to make the field untouchable again
        field.setAttribute("readonly", true);
        field.style.border = "none"; // Optional: Revert visual feedback
    }
	
}

//	resizeTextbox(fieldId);

// Handle toggling password edit
function togglePasswordEdit() {
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const isReadOnly = passwordInput.hasAttribute("readonly");

    if (isReadOnly) {
        // Enable editing
        passwordInput.removeAttribute("readonly");
        confirmPasswordInput.removeAttribute("readonly");
        confirmPasswordInput.style.display = "inline"; // Show the confirmation field
    } else {
        // Check if passwords match
        if (passwordInput.value !== confirmPasswordInput.value) {
            alert("Passwords aren't the same. Please correct them.");
            return; // Do not hide the confirmation field or make inputs read-only
        }

        // Disable editing if passwords match
        passwordInput.setAttribute("readonly", true);
        confirmPasswordInput.setAttribute("readonly", true);
        confirmPasswordInput.style.display = "none"; // Hide the confirmation field
    }
}


function showPassword() {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    password.type = "text";
    confirmPassword.type = "text";

    // Adjust width dynamically
    resizeTextbox(password);
    resizeTextbox(confirmPassword);
}

function hidePassword() {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    password.type = "password";
    confirmPassword.type = "password";

    // Adjust width dynamically
    resizeTextbox(password);
    resizeTextbox(confirmPassword);
}

function resizeTextbox(input) {
    if (input) {
        input.style.width = 23 + "ch"; // Dynamically resize based on content
    }
}


// Handle changing the profile picture
function changePhoto() {
    const photoInput = document.getElementById("photo");
    const profilePic = document.getElementById("profile-pic");
    const file = photoInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profilePic.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Navigation click logic
document.querySelectorAll(".navList, .bottom-link li").forEach(function (element) {
    element.addEventListener("click", function () {
        document.querySelectorAll(".navList, .bottom-link li").forEach(function (e) {
            e.classList.remove("active");
        });

        this.classList.add("active");

        document.querySelectorAll(".data-table").forEach(function (table) {
            table.style.display = "none";
        });

        const allMenuItems = document.querySelectorAll(".navList, .bottom-link li");
        const index = Array.from(allMenuItems).indexOf(this);

        const tables = document.querySelectorAll(".data-table");
        if (tables.length > index) {
            tables[index].style.display = "block";
        }

        if (this.classList.contains("active")) {
            setTimeout(() => {
                this.classList.remove("active");
            }, 1000);
        } else {
            this.classList.add("active");
        }
    });
});



///////////////////////////////////////////////////////////           CARD selecting
// Fetch favorite data when the page loads
window.addEventListener('load', () => {
    fetch('http://localhost:8080/user/favorites?id=2')
        .then(response => response.json())
        .then(data => {
            // Iterate over each card and check if it's active or inactive based on the API response
            document.querySelectorAll('.card').forEach(card => {
                const cardName = card.getAttribute('data-name');
                
                // Check if the card's data-name exists in the API response and update the filter accordingly
                if (data[cardName] === true) {
                    card.style.filter = 'grayscale(0%)'; // Active cards
                } else {
                    card.style.filter = 'grayscale(100%)'; // Inactive cards
                }
            });
        })
        .catch(error => {
            console.error('Error fetching favorite data:', error);
        });
});




document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
        // Get the current status and name of the card
        const currentStatus = card.getAttribute("data-status");
        const cardName = card.getAttribute("data-name"); // E.g., "economic", "sports", etc.

        // Determine the new status
        const newStatus = currentStatus === "active" ? false : true; // Server expects a boolean

        // Update the card status locally (visually)
        card.setAttribute("data-status", newStatus ? "active" : "deactive");

        // Apply grayscale or remove it based on the new status
        if (newStatus) {
            card.style.filter = "grayscale(0%)"; // Remove grayscale
        } else {
            card.style.filter = "grayscale(100%)"; // Apply grayscale
        }

        // Define the URL with query parameters
        const url = `http://localhost:8080/user/changeOnceFavorites?id=2&c=${encodeURIComponent(cardName)}&f=${newStatus}`;

        // Send the PUT request to the server
        fetch(url, {
            method: 'PUT',
        })
        .then(response => {
            if (response.ok) {
                console.log(`Server updated: ${cardName} is now ${newStatus ? "active" : "deactive"}`);
            } else {
                console.error("Failed to update on the server. Status:", response.status);
                // Optionally, revert the UI changes if the server update fails
                card.setAttribute("data-status", currentStatus);
                card.style.filter = currentStatus === "active" ? "grayscale(0%)" : "grayscale(100%)";
            }
        })
        .catch(error => {
            console.error("Error while updating on the server", error);
            // Optionally, revert the UI changes if there's an error
            card.setAttribute("data-status", currentStatus);
            card.style.filter = currentStatus === "active" ? "grayscale(0%)" : "grayscale(100%)";
        });
    });
});



/////////////////////////////////////////////////////////// 



//=====================================  logout alert   ===============================
// Logout confirmation logic
function confirmLogout() {
    const userConfirmed = confirm("Are you sure you want to log out?");
    if (userConfirmed) {
        // Make the API call to invalidate the session
        fetch('http://http://localhost:8080/user/logout', {
            method: 'POST',
        }).then(response => {
            if (response.status === 200) {
                window.location.href = "index.html"; // Redirect to login page after logout
            } else {
                alert("Logout failed. Please try again.");
            }
        });
    }
}

// Show the logout confirmation modal
function showLogoutModal() {
    document.getElementById("logoutModal").style.display = "flex";
}

// Close the modal
function closeLogoutModal() {
    document.getElementById("logoutModal").style.display = "none";
}

// Perform the logout action
function logout() {
    // Redirect to the logout page or perform logout logic
    window.location.href = "index.html"; // Replace with your actual logout URL or function
}

//===================================================================================================