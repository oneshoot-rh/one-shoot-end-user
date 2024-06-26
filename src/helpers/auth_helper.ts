import { UserManager } from "oidc-client";




const settings = {
    authority: "http://oneshoot.local:9999/realms/OneShoot",
    client_id: "frontend_client",
    redirect_uri: window.location.origin+"/signin-callback.html",
    response_type: "code",
    scope: "openid profile uploads.read",
    post_logout_redirect_uri: window.location.origin,
    onload: "login-required",
    refreshTokenAllowedScope: "offline_access",
    automaticSilentRenew: true
};

const userManager = new UserManager(settings);


export const getUser = () => {
    return userManager.getUser();
}


export const login = () => {
    return userManager.signinRedirect();
}

export const logout = () => {
    return userManager.signoutRedirect();
}