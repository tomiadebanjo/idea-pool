import React, { useContext, useEffect, useCallback } from "react";
import SideBar from "../SideBar";

import styles from "./WrapperContainer.module.scss";
import { AuthHelpers } from "../../helpers";
import AuthContext from "../../context/AuthContext";

const WrapperContainer = ({ children }) => {
  const [auth, setAuth] = useContext(AuthContext);

  const autoLogin = useCallback(() => {
    const { token } = AuthHelpers.getToken();
    if (!auth && token) {
      setAuth(true);
    }
  }, [auth, setAuth]);

  useEffect(() => {
    autoLogin();
  }, [autoLogin]);

  return (
    <div className={styles.content}>
      <SideBar />
      <main className={styles.content__body}>
        <div className={styles.content__container}>{children}</div>
      </main>
    </div>
  );
};

export default WrapperContainer;
