import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // ✅ Import Vue Router

// ✅ Import Bootstrap and BootstrapVueNext properly
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// ✅ Import BootstrapVueNext correctly
import * as BootstrapVueNext from "bootstrap-vue-next";

const app = createApp(App);
app.use(router); // ✅ Register Vue Router

app.use(BootstrapVueNext); // ✅ Use BootstrapVueNext correctly
app.mount("#app");
