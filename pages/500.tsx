import React from 'react';
import styles from '../styles/404.module.scss';
import Nav from '../components/Nav';

const NotFoundPage: React.FC = () => {
  return (
    <>
    <Nav/>
    <div className={styles.main}>
      <div className={styles.error}>
        <h1>500</h1>
        <p>Oops! An server error has occurred</p>
      </div>
    </div>
    </>
  );
};

export default NotFoundPage;

