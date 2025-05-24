import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/authOperation';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/authSelectors';
import styles from './HamburgerMenu.module.css';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Prevent scrolling when menu is open
    document.body.style.overflow = !isOpen ? 'hidden' : 'unset';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className={styles.hamburgerContainer}>
      <button 
        className={styles.menuButton} 
        onClick={toggleMenu}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <RiCloseLine /> : <RiMenu3Line />}
      </button>

      <div className={`${styles.menuOverlay} ${isOpen ? styles.show : ''}`} onClick={closeMenu}>
        <div className={styles.menuContent} onClick={e => e.stopPropagation()}>
          <nav className={styles.navigation}>
            {isLoggedIn ? (
              <>
                <div className={styles.userInfo}>
                  <span className={styles.username}>{user?.username}</span>
                </div>
                <NavLink to="/diary" className={styles.navLink} onClick={closeMenu}>
                  Diary
                </NavLink>
                <NavLink to="/calculator" className={styles.navLink} onClick={closeMenu}>
                  Calculator
                </NavLink>
                <button className={styles.logoutButton} onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={styles.navLink} onClick={closeMenu}>
                  Login
                </NavLink>
                <NavLink to="/register" className={styles.navLink} onClick={closeMenu}>
                  Register
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu; 