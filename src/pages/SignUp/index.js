import React from 'react';
import styles from './SignUp.module.scss';
import { Link } from '@reach/router';

const SignUp = () => {
  return (
    <div className={styles.form__container}>
      <form className={styles.form__body}>
        <h1 className={styles.form__headingText}>Sign Up</h1>
        <div className={styles.form__group}>
          <label htmlFor="name" />
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            required
          />
        </div>

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
