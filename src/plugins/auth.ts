import { reactive } from "vue";
import { User, UserManager, UserManagerSettings } from "oidc-client-ts";
import { router } from "../router.ts";

const oidcConfig: UserManagerSettings = {
    authority: "http://localhost:8080",
    client_id: "test-client",
    redirect_uri: "http://localhost:3000/callback",
    scope: "user.read"
}

let userManager: UserManager | null = null;

export const authentication = reactive({
    isAuthenticated: false,
    accessToken: "",
    parsedAccessToken: {},
});

export const auth = {
    install: () => {
        console.debug("Initialize authentication");
        userManager = new UserManager(oidcConfig);
    }
};

const parseToken = (token: string | undefined) => {
    if (!token) return {};
    const [ _, payload ] = token.split(".");
    return JSON.parse(atob(payload));
};

export const login = () => userManager?.signinRedirect();

export const signinCallback = () => {
    userManager?.signinCallback().then((user: User | void) => {
        console.debug(`Authenticated user: ${user ? JSON.stringify(user) : null}`)
        if (user) {
            authentication.isAuthenticated = true;
            authentication.accessToken = user.access_token || "";
            authentication.parsedAccessToken = parseToken(user.access_token);
            router.push("/")
        }
    });
};
