import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li><Link to="/" className={styles.link}>Overall Analysis</Link></li>
        <li><Link to="/physics" className={styles.link}>Physics</Link></li>
        <li><Link to="/chemistry" className={styles.link}>Chemistry</Link></li>
        <li><Link to="/biology" className={styles.link}>Biology</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
