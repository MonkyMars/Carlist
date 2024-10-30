import React from 'react';
import styles from '../styles/404.module.scss';
import Nav from '../components/Nav';

const NotFoundPage: React.FC = () => {
  return (
    <>
    <Nav/>
    <div className={styles.main}>
      <div className={styles.error}>
        <h1>404</h1>
        <p>Oops! The page you are looking for does not exist.</p>
      </div>

      <div className={styles.loading}>
        {"It seems like you're lost. Let us help you get back on track."}
      </div>

      <div className={styles.inputs}>
        <button onClick={() => window.location.href = '/'}>
          Go Home
        </button>
      </div>
    </div>
    </>
  );
};

export default NotFoundPage;
