export default class AuthHelpers {
  static storeTokens({ jwt, refresh_token }) {
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("refresh_token", refresh_token);
  }

  static getToken() {
    const token = localStorage.getItem("jwt");
    const refreshToken = localStorage.getItem("refresh_token");

    return { token, refreshToken };
  }
}
