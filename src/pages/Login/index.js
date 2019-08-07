import React from 'react';
import styles from './Login.module.scss';
import { Link } from '@reach/router';

const Login = () => {
  return (
    <div className={styles.form__container}>
      <form className={styles.form__body}>
        <h1 className={styles.form__headingText}>Log In</h1>
        <div className={styles.form__group}>
          <label htmlFor="email" />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="password" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>

        <div className={styles.form__actionSection}>
          <button>LOG IN</button>
          <p>
            Don't have an account? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
