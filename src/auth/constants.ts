export const AUTH_API_PREFIX = "/api/auth";
export const AUTH_SIGN_IN_PATH = "/sign-in";
export const AUTH_REGISTER_PATH = "/register";
export const AUTH_ERROR_PATH = "/error";
export const AUTH_FORGOT_PASSWORD_PATH = "/forgot-password";
export const AUTH_RESET_PASSWORD_PATH = "/reset-password";
export const AUTH_VERIFY_EMAIL_PATH = "/verify-email";

export const DEFAULT_SIGN_IN_REDIRECT = "/";

export const AUTH_ROUTES = [
  AUTH_SIGN_IN_PATH,
  AUTH_REGISTER_PATH,
  AUTH_ERROR_PATH,
  AUTH_FORGOT_PASSWORD_PATH,
  AUTH_RESET_PASSWORD_PATH,
];

export const AUTH_PUBLIC_ROUTES = [AUTH_VERIFY_EMAIL_PATH];
