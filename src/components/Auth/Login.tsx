import { redirect } from "react-router-dom";
import { AuthCheckEndpoint, AuthLoginEndpoint, AuthLogoutEndpoint, AuthLoginCallbackEndpoint } from "../../config/endpoints";

export const checkAuthenticated = async () => {
    const response = await fetch(AuthCheckEndpoint, {
        method: "GET",
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error(`${JSON.stringify(await response.json())}`)
    }
}

export const loginCallback = async () => {
    const callbackURL = new URL(AuthLoginCallbackEndpoint);
    callbackURL.search = new URL(window.location.href).search
    const response = await fetch(callbackURL, {
        method: "GET",
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error(`${JSON.stringify(await response.json())}`)
    }
}

export const login = async () => {
    interface Response {
        login_url: string
    }
    const response = await fetch(AuthLoginEndpoint, {
        method: "GET",
        credentials: "include",
    });
    const data: Response = await response.json() as Response;
    //console.debug("login response: ", data)
    window.location.href = data.login_url;
}

export const logout = async () => {
    const response = await fetch(AuthLogoutEndpoint, {
        method: "GET",
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error(`${JSON.stringify(await response.json())}`)
    }
    redirect("/")
}


