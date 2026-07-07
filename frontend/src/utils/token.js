import { TOKEN_KEY, USERNAME_KEY } from "./constants";

export const saveToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
};

export const saveUsername = (username) => {
    localStorage.setItem(USERNAME_KEY, username);
};

export const getUsername = () => {
    return localStorage.getItem(USERNAME_KEY);
};

export const isAuthenticated = () => {
    return !!getToken();
};