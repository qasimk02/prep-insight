import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.link}>Overall Analysis</Link>
      <Link to="/physics" className={styles.link}>Physics</Link>
      <Link to="/chemistry" className={styles.link}>Chemistry</Link>
      <Link to="/biology" className={styles.link}>Biology</Link>
    </nav>
  );
};

export default Navigation;