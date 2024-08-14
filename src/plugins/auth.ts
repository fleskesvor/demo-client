import { reactive } from "vue";
import { User, UserManager, UserManagerSettings } from "oidc-client-ts";
import { router } from "../router.ts";

const oidcConfig: UserManagerSettings = {
    authority: "http://localhost:8080",
    client_id: "test-client",
    redirect_uri: "http://localhost:3000/callback",
    scope: "openid"
}

let userManager: UserManager | null = null;

export const authentication = reactive({
    isAuthenticated: false,
});

export const auth = {
    install: () => {
        console.debug("Initialize authentication");

        userManager = new UserManager(oidcConfig);
    }
};

export const login = () => userManager?.signinRedirect();

export const signinCallback = () => {
    userManager?.signinCallback().then((user: User | void) => {
        if (user) {
            authentication.isAuthenticated = true;
            router.push("/")
        }
    });
};
