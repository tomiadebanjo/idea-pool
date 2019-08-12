import React, { useState, useContext } from "react";
import styles from "./SignUp.module.scss";
import { Link, navigate } from "@reach/router";
import axios from "axios";
import { RequestHelpers, AuthHelpers } from "../../helpers";
import AuthContext from "../../context/AuthContext";
import loadingIcon from "../../assets/download.svg";
import warningIcon from "../../assets/exclamation-mark.svg";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    setDisplayMessage("");
    setLoading(true);
    e.preventDefault();
    const formData = { name, email, password };

    try {
      const { data } = await axios({
        method: "post",
        url: "https://small-project-api.herokuapp.com/users",
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
        <h1 className={styles.form__headingText}>Sign Up</h1>
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
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              value={name}
              placeholder="Name"
              required
              onChange={e => setName(e.target.value)}
              onFocus={() => setDisplayMessage("")}
            />
          </label>
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
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
            onChange={e => setPassword(e.target.value)}
            onFocus={() => setDisplayMessage("")}
          />
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
            <span className={styles.button__text}>SIGN UP</span>
          </button>
          <p>
            Already Have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
