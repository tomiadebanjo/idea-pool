import React, { useState, useContext } from "react";
import { Link, navigate } from "@reach/router";
import axios from "axios";

import { RequestHelpers, AuthHelpers } from "../../helpers";
import styles from "./Login.module.scss";

import AuthContext from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");

  const [auth, setAuth] = useContext(AuthContext);

  const handleSubmit = async e => {
    setDisplayMessage("");
    e.preventDefault();
    const formData = { email, password };

    try {
      const { data } = await axios({
        method: "post",
        url: "https://small-project-api.herokuapp.com/access-tokens",
        data: formData
      });

      console.log(data, "+++ login response +++");
      AuthHelpers.storeTokens(data);
      setDisplayMessage("Login successfully! redirecting...");
      setAuth(true);
      setTimeout(() => {
        navigate("./");
      }, 2000);
    } catch (error) {
      RequestHelpers.errorHandler(error, setDisplayMessage);
    }
  };

  return (
    <div className={styles.form__container}>
      <form className={styles.form__body} onSubmit={handleSubmit}>
        <h1 className={styles.form__headingText}>Log In</h1>
        <div className="display__message">
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
          <button>LOG IN</button>
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
