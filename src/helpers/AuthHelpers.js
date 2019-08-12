import jwtDecode from "jwt-decode";
import axios from "axios";

export default class AuthHelpers {
  static storeTokens({ jwt, refresh_token }) {
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("refresh_token", refresh_token);
  }

  static getToken() {
    const token = localStorage.getItem("jwt");
    const refreshToken = localStorage.getItem("refresh_token");

    if (AuthHelpers.validateToken(token) || refreshToken) {
      return { token };
    }

    return {};
  }

  static getRefreshToken() {
    return localStorage.getItem("refresh_token");
  }

  static deleteTokens() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("refresh_token");
  }

  static validateToken(token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now();
      const tokenExpiry = decoded.exp * 1000;
      const checkIfExpired = tokenExpiry - currentTime > 1;

      return checkIfExpired;
    } catch (error) {
      return false;
    }
  }

  static async refreshToken(refreshToken) {
    try {
      const { data } = await axios({
        method: "post",
        url: "https://small-project-api.herokuapp.com/access-tokens/refresh",
        data: { refresh_token: refreshToken }
      });

      localStorage.setItem("jwt", data.jwt);
      return { token: data.jwt };
    } catch (error) {
      console.error(error.response);
    }
  }
}
