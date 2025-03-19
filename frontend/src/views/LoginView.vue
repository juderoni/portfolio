<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");
const loginMessage = ref("");

const handleLogin = async () => {
    try {
        const response = await axios.post("/api/login", {
            username: username.value,
            password: password.value,
        });

        if (response.status === 200) {
            loginMessage.value = "Login successful!";
            setTimeout(() => {
                router.push("/");
            }, 1000);
        }
    } catch (error) {
        loginMessage.value = "Invalid credentials";
    }
};
</script>

<template>
    <div class="container" style="padding-top: 100px">
        <h1 class="text-center">Admin Login</h1>
        <div class="login-form">
            <form @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input
                        v-model="username"
                        type="text"
                        class="form-control"
                        required
                        placeholder="Enter your admin username"
                    />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input
                        v-model="password"
                        type="password"
                        class="form-control"
                        required
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit" class="btn btn-custom w-100">
                    Sign In
                </button>
            </form>
            <p class="text-center mt-2">{{ loginMessage }}</p>
        </div>
    </div>
</template>
