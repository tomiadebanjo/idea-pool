import axios from "axios";
import { navigate } from "@reach/router";
import AuthHelpers from "../helpers/AuthHelpers";

const apiBaseUrl = "https://small-project-api.herokuapp.com/";

const refreshToken = AuthHelpers.getRefreshToken();
// const headers = { "X-Access-Token": token };

const instance = axios.create({
  baseURL: apiBaseUrl
});

instance.interceptors.response.use(
  response => response,
  async error => {
    // Reject promise if usual error
    if (error.response.status !== 401) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    if (error.config.url === "/access-tokens/refresh") {
      AuthHelpers.deleteTokens();
      navigate("/login");

      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    try {
      console.log(refreshToken, "++++++ refresh");
      const response = await instance.post("access-tokens/refresh", {
        refresh_token: refreshToken
      });
      const { jwt } = response.data;
      localStorage.setItem("jwt", jwt);
      // New request with new token
      const config = error.config;
      config.headers["X-Access-Token"] = jwt;
      return new Promise((resolve, reject) => {
        axios
          .request(config)
          .then(response_1 => {
            resolve(response_1);
          })
          .catch(error => {
            reject(error);
          });
      });
    } catch (error_1) {
      return new Promise((resolve, reject) => {
        reject(error_1);
      });
    }
  }
);

export default instance;
