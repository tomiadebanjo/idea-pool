import React from 'react';
import styles from './SideBar.module.scss';
import siteIcon from './assets/IdeaPool_icon.png';
import userAvatar from './assets/User_ProfilePic.png';

const SideBar = () => {
  return (
    <aside className={styles.main}>
      <div className={styles.main__logoSection}>
        <div className={styles.main__logoImg}>
          <img src={siteIcon} alt="site logo" />
        </div>
        <h1 className={styles.main__logoText}>The Idea Pool</h1>
      </div>
      <div className={styles.main__userSection}>
        <div>
          <div className={styles.main__userSectionImg}>
            <img src={userAvatar} alt="user profile avatar" />
          </div>
          <h2 className={styles.main__userName}>Joyce Lee</h2>
          <p className={styles.main__logoutText}>Log out</p>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
