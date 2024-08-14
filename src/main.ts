import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { auth } from "./plugins/auth.ts";
import { router } from "./router.ts";

createApp(App).use(auth).use(router).mount('#app')
