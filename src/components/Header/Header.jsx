import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/authOperation';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/authSelectors';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import Logo from '../Logo/Logo';
import styles from './Header.module.css';

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Logo />
          
          <nav className={styles.desktopNav}>
            {isLoggedIn && (
              <>
                <NavLink to="/diary" className={styles.navLink}>
                  Diary
                </NavLink>
                <NavLink to="/calculator" className={styles.navLink}>
                  Calculator
                </NavLink>
              </>
            )}
          </nav>
        </div>

        <div className={styles.rightSection}>
          <ThemeSwitcher />
          
          <div className={styles.desktopNav}>
            {isLoggedIn ? (
              <div className={styles.userSection}>
                <span className={styles.username}>{user?.username}</span>
                <button className={styles.logoutButton} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <nav className={styles.authNav}>
                <NavLink to="/login" className={styles.navLink}>
                  Login
                </NavLink>
                <NavLink to="/register" className={styles.navLink}>
                  Register
                </NavLink>
              </nav>
            )}
          </div>

          <div className={styles.mobileNav}>
            <HamburgerMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 