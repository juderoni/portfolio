function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    let icon = document.querySelector(".theme-toggle .icon");
    if (document.body.classList.contains("dark-mode")) {
        icon.textContent = "☀️"; // Sun for light mode
    } else {
        icon.textContent = "🌙"; // Moon for dark mode
    }
}
