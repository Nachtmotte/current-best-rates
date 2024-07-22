export const HOME_PATH = "/"

export const AUTH_API_PREFIX = "/api/auth";
export const AUTH_LOGIN_PATH = "/sign-in";
export const AUTH_REGISTER_PATH = "/register";
export const AUTH_ERROR_PATH = "/error";

export const SETTINGS_PATH = "/settings";
export const PROPERTIES_PATH = "/properties";
export const PROPERTY_PATH = "/properties/[shortname]"

export const DEFAULT_SIGN_IN_REDIRECT = PROPERTIES_PATH;

export const AUTH_ROUTES = [
  AUTH_LOGIN_PATH,
  AUTH_REGISTER_PATH,
  AUTH_ERROR_PATH,
];

export const AUTH_PUBLIC_ROUTES = [HOME_PATH];
