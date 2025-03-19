import { createRouter, createWebHistory } from "vue-router";
import ResumeView from "./views/ResumeView.vue";
import LoginView from "./views/LoginView.vue";

const routes = [
    { path: "/", component: ResumeView },
    { path: "/login", component: LoginView },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
