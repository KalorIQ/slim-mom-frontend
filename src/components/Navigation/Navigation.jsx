import style from './Navigation.module.css';
import Logo from '../Logo/Logo.jsx';
import {useNavigate, NavLink, useLocation } from 'react-router';
import vektor from '../../assets/svg/utils/vektor.svg';
import slimMomLogoMobile from '../../assets/svg/logo/slimMomLogoMobile.svg';
import { useSelector } from 'react-redux';
import  {selectIsLoggedIn, selectUserName }  from '../../redux/auth/authSelectors.js';
import { logoutUser } from '../../redux/auth/authOperation.js';
import { useDispatch } from 'react-redux';
import Settings from '../Settings/Settings';
import { FaUser, FaCalculator, FaBook, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

const Navigation = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const navigate = useNavigate();
    const location = useLocation();
    const isDiaryOrCalculator = location.pathname === '/diary' || location.pathname === '/calculator';
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isSmallMobile, setIsSmallMobile] = useState(false);

    // Safety check for userName
    const safeUserName = userName || '';

    // Check screen size
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 1024);
            setIsSmallMobile(window.innerWidth <= 425);
            if (window.innerWidth > 1024) {
                setIsMenuOpen(false);
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handleLogout = () => {
        dispatch(logoutUser())
            .unwrap()
            .then(() => {
                navigate('/');
            });
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };
    
    return (
        <header className={style.header}>
            <div className={style.leftSection}>
                <div className={style.logoContainer}>
                    {isSmallMobile ? (
                        <img src={slimMomLogoMobile} alt="SlimMom Mobile Logo" className={style.mobileLogoImg} />
                    ) : (
                        <>
                            <Logo />
                            <img src={vektor} alt="logo" className={style.logo} />
                        </>
                    )}
                </div>
                <div className={style.mainNav}>
                    {isLoggedIn && !isSmallMobile ? (
                        <div className={style.navLinks}>
                            <NavLink 
                                to='/diary' 
                                className={({isActive}) => isActive ? `${style.navLink} ${style.active}` : style.navLink}
                                onClick={closeMenu}
                            >
                                <FaBook className={style.navIcon} />
                                {t('navigation.diary')}
                            </NavLink>
                            <NavLink 
                                to='/calculator' 
                                className={({isActive}) => isActive ? `${style.navLink} ${style.active}` : style.navLink}
                                onClick={closeMenu}
                            >
                                <FaCalculator className={style.navIcon} />
                                {t('navigation.calculator')}
                            </NavLink>
                        </div>
                    ) : !isLoggedIn && !isSmallMobile ? (
                        <div className={style.authLinks}>
                            <NavLink 
                                to='/register' 
                                className={({isActive}) => isActive ? `${style.navLink} ${style.active}` : style.navLink}
                                onClick={closeMenu}
                            >
                                {t('navigation.registration')}
                            </NavLink>
                            <NavLink 
                                to='/login' 
                                className={({isActive}) => isActive ? `${style.navLink} ${style.active}` : style.navLink}
                                onClick={closeMenu}
                            >
                                {t('navigation.login')}
                            </NavLink>
                        </div>
                    ) : null}
                </div>
            </div>
            
            <div className={style.rightSection}>
                {/* Desktop User Info */}
                {!isMobile && (isLoggedIn || isDiaryOrCalculator || location.pathname === '/profile') && safeUserName && (
                    <div className={style.userInfo}>
                        <NavLink 
                            to='/profile' 
                            className={({isActive}) => isActive ? `${style.profileLink} ${style.active}` : style.profileLink}
                        >
                            <FaUser className={style.profileIcon} />
                            {t('navigation.profile')}
                        </NavLink>
                        <p className={style.userName}>{safeUserName}</p>
                        <button onClick={handleLogout} className={style.logout}>
                            <FaSignOutAlt className={style.logoutIcon} />
                            {t('navigation.logout')}
                        </button>
                    </div>
                )}

                {/* Desktop Settings */}
                {!isMobile && (
                    <div className={style.settingsContainer}>
                        <Settings />
                    </div>
                )}

                {/* Mobile Hamburger Menu */}
                {isSmallMobile || (isMobile && (isLoggedIn || isDiaryOrCalculator || location.pathname === '/profile') && safeUserName) ? (
                    <>
                        <button 
                            className={style.hamburgerButton}
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                        >
                            <FaBars />
                        </button>

                        {/* Mobile Menu Overlay */}
                        {isMenuOpen && (
                            <div className={style.menuOverlay} onClick={closeMenu}>
                                <div className={style.mobileMenu} onClick={(e) => e.stopPropagation()}>
                                    <div className={style.mobileMenuHeader}>
                                        <button 
                                            className={style.closeButton}
                                            onClick={closeMenu}
                                            aria-label="Close menu"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                    
                                    <div className={style.mobileMenuContent}>
                                        {safeUserName && (
                                            <div className={style.mobileUserInfo}>
                                                <div className={style.mobileUserAvatar}>
                                                    <FaUser />
                                                </div>
                                                <p className={style.mobileUserName}>{safeUserName}</p>
                                            </div>
                                        )}

                                        <div className={style.mobileMenuItems}>
                                            {/* Add Diary and Calculator for small mobile */}
                                            {isSmallMobile && isLoggedIn && (
                                                <>
                                                    <NavLink 
                                                        to='/diary' 
                                                        className={({isActive}) => isActive ? `${style.mobileMenuItem} ${style.active}` : style.mobileMenuItem}
                                                        onClick={closeMenu}
                                                    >
                                                        <FaBook className={style.mobileMenuIcon} />
                                                        {t('navigation.diary')}
                                                    </NavLink>
                                                    <NavLink 
                                                        to='/calculator' 
                                                        className={({isActive}) => isActive ? `${style.mobileMenuItem} ${style.active}` : style.mobileMenuItem}
                                                        onClick={closeMenu}
                                                    >
                                                        <FaCalculator className={style.mobileMenuIcon} />
                                                        {t('navigation.calculator')}
                                                    </NavLink>
                                                </>
                                            )}

                                            {/* Auth links for small mobile when not logged in */}
                                            {isSmallMobile && !isLoggedIn && (
                                                <>
                                                    <NavLink 
                                                        to='/register' 
                                                        className={({isActive}) => isActive ? `${style.mobileMenuItem} ${style.active}` : style.mobileMenuItem}
                                                        onClick={closeMenu}
                                                    >
                                                        {t('navigation.registration')}
                                                    </NavLink>
                                                    <NavLink 
                                                        to='/login' 
                                                        className={({isActive}) => isActive ? `${style.mobileMenuItem} ${style.active}` : style.mobileMenuItem}
                                                        onClick={closeMenu}
                                                    >
                                                        {t('navigation.login')}
                                                    </NavLink>
                                                </>
                                            )}

                                            {safeUserName && (
                                                <NavLink 
                                                    to='/profile' 
                                                    className={({isActive}) => isActive ? `${style.mobileMenuItem} ${style.active}` : style.mobileMenuItem}
                                                    onClick={closeMenu}
                                                >
                                                    <FaUser className={style.mobileMenuIcon} />
                                                    {t('navigation.profile')}
                                                </NavLink>
                                            )}

                                            <div className={`${style.mobileMenuItem} ${style.mobileSettingsContainer}`}>
                                                <Settings />
                                            </div>
                                        </div>

                                        {safeUserName && (
                                            <div className={style.mobileMenuFooter}>
                                                <button 
                                                    onClick={handleLogout} 
                                                    className={style.mobileLogout}
                                                >
                                                    <FaSignOutAlt className={style.mobileMenuIcon} />
                                                    {t('navigation.logout')}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                ) : null}

                {/* Mobile Settings for non-logged in users */}
                {isMobile && !safeUserName && !isSmallMobile && (
                    <div className={style.mobileOnlySettings}>
                        <Settings />
                    </div>
                )}
            </div>
        </header>
    );
}

export default Navigation;