document.addEventListener("DOMContentLoaded", function () {
    let theme = localStorage.getItem("theme") || "system";
    setTheme(theme);
    updateCurrentThemeDisplay(theme);

    // Close dropdown when clicking outside
    window.addEventListener("click", function (event) {
        const dropdown = document.querySelector(".dropdown");
        const settingsMenu = document.getElementById("settingsMenu");
        if (dropdown && !dropdown.contains(event.target)) {
            settingsMenu.classList.remove("show");
        }
    });

    // ✅ Attach login handler only if on the login page
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }

    // ✅ Fetch and render resume only if on the index page
    if (document.body.classList.contains("resume-page")) {
        fetchResume();
    }
});

/**
 * Applies the selected theme to the page.
 * @param {string} mode - The theme mode: "light", "dark", or "system".
 */
function setTheme(mode) {
    localStorage.setItem("theme", mode);
    if (mode === "light") {
        document.body.classList.remove("dark-mode");
    } else if (mode === "dark") {
        document.body.classList.add("dark-mode");
    } else if (mode === "system") {
        if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }
    updateCurrentThemeDisplay(mode);
}

/**
 * Updates the theme display in settings dropdown.
 * @param {string} mode - The current theme mode.
 */
function updateCurrentThemeDisplay(mode) {
    const display = document.getElementById("currentThemeDisplay");
    if (display) {
        display.textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
    }
}

/**
 * Handles user login by sending credentials to the backend.
 * @param {Event} event - The form submit event.
 */
async function handleLogin(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginMessage = document.getElementById("loginMessage");

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // ✅ Ensures session-based auth works
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            loginMessage.textContent = "Login successful!";
            loginMessage.style.color = "green";

            // Redirect to home page after 1 second
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        } else {
            loginMessage.textContent = data.message || "Invalid credentials";
            loginMessage.style.color = "red";
        }
    } catch (error) {
        console.error("Error logging in:", error);
        loginMessage.textContent = "Server error. Try again later.";
        loginMessage.style.color = "red";
    }
}

/**
 * Fetches and renders resume data from the backend API.
 */
async function fetchResume() {
    try {
        const response = await fetch("/api/resume");
        const data = await response.json();
        renderResume(data);
    } catch (error) {
        console.error("Error fetching resume data:", error);
    }
}

/**
 * Renders resume data dynamically into the page.
 * @param {Object} data - Resume data from backend API.
 */
function renderResume(data) {
    const container = document.querySelector(".container");

    // Provide default values if fields are missing
    const education = data.education || [];
    const skills = data.skills || [];
    const workExperience = data.work_experience || [];
    const projects = data.projects || [];

    container.innerHTML = `
        <h1>${data.name}</h1>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${
        data.email
    }</a></p>
        <p><strong>LinkedIn:</strong> <a href="${
            data.linkedin
        }" target="_blank">View Profile</a></p>

        <h2>Education</h2>
        ${
            education.length > 0
                ? education
                      .map(
                          (edu) => `
            <p><strong>${edu.institution}</strong> - ${edu.degree} (${edu.graduation})</p>
        `
                      )
                      .join("")
                : "<p>No education data available.</p>"
        }

        <h2>Skills</h2>
        <p>${skills.length > 0 ? skills.join(", ") : "No skills available."}</p>

        <h2>Work Experience</h2>
        ${
            workExperience.length > 0
                ? workExperience
                      .map(
                          (job) => `
            <p><strong>${job.title} - ${job.company}</strong> (${job.date})</p>
            <p>${job.description}</p>
        `
                      )
                      .join("")
                : "<p>No work experience available.</p>"
        }

        <h2>Projects</h2>
        ${
            projects.length > 0
                ? projects
                      .map(
                          (project) => `
            <p><strong>${project.title}</strong> (${project.date})</p>
            <p>${project.description}</p>
        `
                      )
                      .join("")
                : "<p>No projects available.</p>"
        }
    `;
}
