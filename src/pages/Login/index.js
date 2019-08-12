import React, { useState, useContext } from "react";
import { Link, navigate } from "@reach/router";
import axios from "axios";

import { RequestHelpers, AuthHelpers } from "../../helpers";
import styles from "./Login.module.scss";
import loadingIcon from "../../assets/download.svg";
import warningIcon from "../../assets/exclamation-mark.svg";

import AuthContext from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useContext(AuthContext);

  const handleSubmit = async e => {
    setDisplayMessage("");
    setLoading(true);
    e.preventDefault();
    const formData = { email, password };

    try {
      const { data } = await axios({
        method: "post",
        url: "https://small-project-api.herokuapp.com/access-tokens",
        data: formData
      });

      AuthHelpers.storeTokens(data);
      setAuth(true);
      navigate("./");
    } catch (error) {
      setLoading(false);
      RequestHelpers.errorHandler(error, setDisplayMessage);
    }
  };

  return (
    <div className={styles.form__container}>
      <form className={styles.form__body} onSubmit={handleSubmit}>
        <h1 className={styles.form__headingText}>Log In</h1>
        <div
          className={`${styles.display__errorMessage} ${
            displayMessage.length < 1 ? styles.empty : ""
          }`}
        >
          {displayMessage.length > 1 ? (
            <span>
              <img src={warningIcon} alt="warning icon" />
            </span>
          ) : null}
          <p>{displayMessage}</p>
        </div>
        <div className={styles.form__group}>
          <label htmlFor="email">
            <input
              type="email"
              value={email}
              id="email"
              placeholder="Email"
              required
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setDisplayMessage("")}
            />
          </label>
        </div>

        <div className={styles.form__group}>
          <label htmlFor="password">
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setDisplayMessage("")}
            />
          </label>
        </div>

        <div className={styles.form__actionSection}>
          <button disabled={loading}>
            {loading ? (
              <span className={styles.spinner__wrapper}>
                <img
                  src={loadingIcon}
                  alt="button spinner"
                  className={styles.spinner}
                />
              </span>
            ) : null}
            <span className={styles.button__text}>LOG IN</span>
          </button>
          <p>
            Don{"'"}t have an account?{" "}
            <Link to="/register">Create an account</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
