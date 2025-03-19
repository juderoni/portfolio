<template>
    <b-navbar toggleable="lg" :class="['navbar', currentTheme]" fixed="top">
        <b-navbar-brand to="/">JS Resume</b-navbar-brand>

        <b-navbar-nav class="ml-auto">
            <!-- Settings Dropdown -->
            <b-dropdown
                id="theme-dropdown"
                class="no-bg"
                variant="custom"
                toggle-class="btn-custom"
            >
                <template #button-content>
                    <span class="btn-custom-text">{{ themeIcon }}</span>
                </template>
                <b-dropdown-item
                    v-for="option in themeOptions"
                    :key="option"
                    @click="setTheme(option)"
                >
                    {{ option.charAt(0).toUpperCase() + option.slice(1) }}
                </b-dropdown-item>
            </b-dropdown>

            <b-nav-item to="/login" class="btn-custom btn-custom-text"
                >👤</b-nav-item
            >
        </b-navbar-nav>
    </b-navbar>
</template>

<script setup>
import { ref, watchEffect, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
    BNavbar,
    BNavbarBrand,
    BNavbarNav,
    BNavItem,
    BDropdown,
    BDropdownItem,
} from "bootstrap-vue-next";

const router = useRouter();
const themeOptions = ["light", "dark", "system"];
const currentTheme = ref(localStorage.getItem("theme") || "system");
const themeIcon = ref("🌞"); // Default to Sun for light mode

const setTheme = (mode) => {
    if (mode === "system") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
        mode = prefersDark.matches ? "dark" : "light";
    }
    localStorage.setItem("theme", mode);
    currentTheme.value = mode;
    updateThemeIcon(mode);
    document.documentElement.classList.toggle("dark-mode", mode === "dark");
};

const updateThemeIcon = (mode) => {
    if (mode === "dark") {
        themeIcon.value = "🌜"; // Moon for dark mode
    } else if (mode === "light") {
        themeIcon.value = "🌞"; // Sun for light mode
    } else {
        themeIcon.value = "⚙️"; // Gear for system mode
    }
};

onMounted(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    if (currentTheme.value === "system") {
        const theme = prefersDark.matches ? "dark" : "light";
        setTheme(theme);

        prefersDark.addEventListener("change", (e) => {
            if (localStorage.getItem("theme") === "system") {
                setTheme(e.matches ? "dark" : "light");
            }
        });
    } else {
        updateThemeIcon(currentTheme.value);
    }
});

watchEffect(() => {
    document.documentElement.classList.toggle(
        "dark-mode",
        currentTheme.value === "dark"
    );
});
</script>

<style scoped>
.btn-custom {
    background-color: transparent;
    border: none;
    color: inherit;
    padding: 0rem 0.6rem; /* Adjust as needed */
    border-radius: 0.25rem;
    font-size: 1.5rem;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

.btn-custom-text {
    font-size: inherit; /* Inherit font-size from parent */
}

.btn-custom.no-bg:hover,
.btn-custom.no-bg:focus {
    background-color: rgba(0, 0, 0, 0.1);
    box-shadow: none;
}

#theme-dropdown .dropdown-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border: 1px solid transparent;
    border-radius: 50%;
}

#theme-dropdown .dropdown-menu {
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    padding: 0.5rem;
}

#theme-dropdown .dropdown-item {
    padding: 0.5rem 1rem;
}

#theme-dropdown .dropdown-item:hover {
    background-color: #f8f9fa;
}
</style>
