import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.scss';
import createIcon from './assets/btn_addanidea.png';
import bulbIcon from './assets/bulb.png';
import IdeaTable from '../../components/IdeaTable';

const Dashboard = () => {
  const [content, setContent] = useState(['sdsd']);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setContent(['sdsd']);
  //   }, 3000);
  // }, []);

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard__header}>
        <h2 className={styles.dashboard__headerText}>My Ideas</h2>
        <div className={styles.dashboard__headerIcon}>
          <img src={createIcon} alt="create icon" />
        </div>
      </div>

      {content.length < 1 ? (
        <div className={styles.dashboard__noIdeaSection}>
          <div className={styles.dashboard__bulbIcon}>
            <img src={bulbIcon} alt="bulb icon" />
          </div>
          <p>Got Ideas?</p>
        </div>
      ) : (
        <IdeaTable />
      )}
    </div>
  );
};

export default Dashboard;
