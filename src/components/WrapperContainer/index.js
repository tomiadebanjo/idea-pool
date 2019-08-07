import React from 'react';
import SideBar from '../SideBar';

import styles from './WrapperContainer.module.scss';

const WrapperContainer = ({ children }) => {
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
