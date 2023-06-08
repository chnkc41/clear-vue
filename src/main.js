import { createApp } from "vue";
import App from "./App.vue";
import router from "./routers/router";
import axios from "axios";
import withUUID from "vue-uuid";

import "@mdi/font/css/materialdesignicons.css";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
loadFonts();

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.use(withUUID);
app.config.globalProperties.$axios = axios;
app.mount("#app");
