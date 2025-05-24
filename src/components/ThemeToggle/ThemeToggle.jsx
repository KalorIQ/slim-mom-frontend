import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { BsSun, BsMoon } from 'react-icons/bs';
import styles from './ThemeToggle.module.css';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button 
      className={styles.themeToggle} 
      onClick={toggleTheme}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? <BsSun className={styles.icon} /> : <BsMoon className={styles.icon} />}
    </button>
  );
};

export default ThemeToggle; 