import { createRouter, createWebHistory, NavigationGuard, NavigationGuardNext, RouteRecordRaw } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import { authentication, login, signinCallback } from "./plugins/auth.ts";

const authenticationGuard: NavigationGuard = (_, __, next: NavigationGuardNext) =>
    (!authentication.isAuthenticated) ? login() : next();

const routes: RouteRecordRaw[] = [
    { path: '/', component: HelloWorld, beforeEnter: authenticationGuard },
    { path: '/callback', component: { setup() { signinCallback() } } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
