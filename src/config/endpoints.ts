const backend_base_url = "http://localhost:3000/api"; //process.env.REACT_APP_BACKEND_URL_BASE;
const WithBaseURL = (path: string) => new URL(`${backend_base_url}${path}`)
export const AuthCheckEndpoint = WithBaseURL("/private/check");
export const AuthLoginEndpoint = WithBaseURL("/login");
export const AuthLoginCallbackEndpoint = WithBaseURL("/callback");
export const AuthLogoutEndpoint = WithBaseURL("/private/logout");

export const UserProfileEndpoint = WithBaseURL("/private/user/profile");
