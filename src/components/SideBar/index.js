import React, { useContext, useEffect, useState } from "react";
import { navigate } from "@reach/router";
import styles from "./SideBar.module.scss";
import siteIcon from "./assets/IdeaPool_icon.png";
import AuthContext from "../../context/AuthContext";
import { AuthHelpers } from "../../helpers";

import axiosInstance from "../../Services/axiosInstance";
import Spinner from "../Spinner";

const LogOutSpinner = ({ logOutLoading }) => {
  return (
    <div
      className={`${styles.LogOutSpinner} ${
        logOutLoading ? null : styles.LogOutSpinner__hide
      }`}
    >
      <Spinner />
    </div>
  );
};

const SideBar = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [logOutLoading, setLogOutLoading] = useState(false);
  const { token } = AuthHelpers.getToken();
  const refreshToken = AuthHelpers.getRefreshToken();

  useEffect(() => {
    setLoading(true);
    async function fetchUser() {
      try {
        const { data } = await axiosInstance({
          method: "get",
          url: "https://small-project-api.herokuapp.com/me",
          headers: { "X-Access-Token": token }
        });

        setUserInfo(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error.response);
      }
    }
    if (auth) {
      fetchUser();
    }
  }, [token, auth]);

  const handleLogOut = async () => {
    try {
      setLogOutLoading(true);
      await axiosInstance({
        method: "delete",
        url: "https://small-project-api.herokuapp.com/access-tokens",
        headers: { "X-Access-Token": token },
        data: { refresh_token: refreshToken }
      });

      setLogOutLoading(false);
      setAuth(false);
      AuthHelpers.deleteTokens();
      navigate("./");
    } catch (error) {
      setLogOutLoading(false);
      console.error(error.response);
    }
  };

  return (
    <aside className={styles.main}>
      <div className={styles.main__logoSection}>
        <div className={styles.main__logoImg}>
          <img src={siteIcon} alt="site logo" />
        </div>
        <h1 className={styles.main__logoText}>The Idea Pool</h1>
      </div>
      {auth &&
        (loading ? (
          <Spinner isWhite />
        ) : (
          <div className={styles.main__userSection}>
            <div className={styles.main__userSectionInfo}>
              <div className={styles.main__userSectionImg}>
                <img src={userInfo.avatar_url} alt="user profile avatar" />
              </div>
              <h2 className={styles.main__userName}>{userInfo.name}</h2>
              <button
                className={styles.main__logoutText}
                onClick={() => handleLogOut()}
              >
                Log out
              </button>
            </div>
          </div>
        ))}
      <LogOutSpinner logOutLoading={logOutLoading} />
    </aside>
  );
};

export default SideBar;
