import React, { useState, useContext } from "react";
import styles from "./SignUp.module.scss";
import { Link, navigate } from "@reach/router";
import axios from "axios";
import { RequestHelpers, AuthHelpers } from "../../helpers";
import AuthContext from "../../context/AuthContext";

// To-do
// Fix error display dialogue

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");
  const [auth, setAuth] = useContext(AuthContext);

  const handleSubmit = async e => {
    setDisplayMessage("");
    e.preventDefault();
    const formData = { name, email, password };

    try {
      const { data } = await axios({
        method: "post",
        url: "https://small-project-api.herokuapp.com/users",
        data: formData
      });

      AuthHelpers.storeTokens(data);

      setDisplayMessage("Sign up successfully! redirecting...");
      setAuth(true);
      navigate("./");
    } catch (error) {
      RequestHelpers.errorHandler(error, setDisplayMessage);
    }
  };

  return (
    <div className={styles.form__container}>
      <form className={styles.form__body} onSubmit={handleSubmit}>
        <h1 className={styles.form__headingText}>Sign Up</h1>
        <div className="display__message">
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
          <button>SIGN UP</button>
          <p>
            Already Have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
