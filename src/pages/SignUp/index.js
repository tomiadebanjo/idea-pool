import React from 'react';
import styles from './SignUp.module.scss';
import { Link } from '@reach/router';

const SignUp = () => {
  return (
    <div className={styles.form__container}>
      <form className={styles.form__body}>
        <h1 className={styles.form__headingText}>Sign Up</h1>
        <div className={styles.form__group}>
          <input type="text" name="name" id="name" placeholder="Jane doe" />
          <label htmlFor="name">Name</label>
        </div>

        <div className={styles.form__group}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="tom@email.com"
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className={styles.form__group}>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="enter password"
          />
          <label htmlFor="password">Password</label>
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
