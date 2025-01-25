const signUpForm = document.getElementById("signUpForm");
const loginForm = document.getElementById("loginForm");
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

// Handle Sign-Up Form Submission
signUpForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form behavior

    const username = signUpForm.querySelector('input[name="name"]').value;
    const email = signUpForm.querySelector('input[name="email"]').value;
    const password = signUpForm.querySelector('input[name="password"]').value;

    const userDto = {
        username: username,
        email: email,
        password: password,
        favorites: {} // Add default favorites if required
    };

    try {
        const response = await fetch('http://localhost:8080/user/signUp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userDto),
        });

        if (response.ok) {
            alert("Account created successfully! Please log in.");
        } else {
            const error = await response.json(); // Parse error message
            alert(`Sign-Up failed: ${error.message || "Unexpected error occurred."}`);
            console.error("Sign-Up Error:", error);
        }
    } catch (error) {
        alert("An error occurred while signing up. Please check the console for details.");
        console.error("Network or server error:", error);
    }
});

// Handle Sign-In Form Submission
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form behavior

    const username = loginForm.querySelector('input#username').value;
    const password = loginForm.querySelector('input#password').value;

    try {
        const response = await fetch('http://localhost:8080/user/signIn', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `u=${encodeURIComponent(username)}&p=${encodeURIComponent(password)}`,
        });

        if (response.ok) {
            alert("Login successful!");
            window.location.href = "/home.html"; // Redirect to Home Page
        } else {
            const error = await response.json();
            alert(`Login failed: ${error.message || "Invalid credentials."}`);
            console.error("Login Error:", error);
        }
    } catch (error) {
        alert("An error occurred during sign-in. Please check the console for details.");
        console.error("Sign-In Error:", error);
    }
});

// Toggle Between Forms
signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});
