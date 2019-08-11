import React, { useContext, useEffect, useState } from "react";
import styles from "./SideBar.module.scss";
import siteIcon from "./assets/IdeaPool_icon.png";
// import userAvatar from "./assets/User_ProfilePic.png";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { AuthHelpers } from "../../helpers";

const SideBar = () => {
  const [auth] = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const { token } = AuthHelpers.getToken();

  useEffect(() => {
    setLoading(true);
    async function fetchUser() {
      try {
        const { data } = await axios({
          method: "get",
          url: "https://small-project-api.herokuapp.com/me",
          headers: { "X-Access-Token": token }
        });

        setUserInfo(data);
      } catch (error) {
        console.error(error.response);
      }
    }
    if (auth) {
      fetchUser();
      setLoading(false);
    }
  }, [token, auth]);

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
          "loading...."
        ) : (
          <div className={styles.main__userSection}>
            <div className={styles.main__userSectionInfo}>
              <div className={styles.main__userSectionImg}>
                <img src={userInfo.avatar_url} alt="user profile avatar" />
              </div>
              <h2 className={styles.main__userName}>{userInfo.name}</h2>
              <p className={styles.main__logoutText}>Log out</p>
            </div>
          </div>
        ))}
    </aside>
  );
};

export default SideBar;
