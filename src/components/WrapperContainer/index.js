import React from 'react';
import SideBar from '../SideBar';

import styles from './WrapperContainer.module.scss';

const WrapperContainer = ({ children }) => {
  return (
    <div className={styles.content}>
      <SideBar />
      <div>{children}</div>
    </div>
  );
};

export default WrapperContainer;
