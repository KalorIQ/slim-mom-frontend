import style from './Navigation.module.css';
import Logo from '../Logo/Logo.jsx';
import {useNavigate, NavLink, useLocation } from 'react-router';
import vektor from '../../assets/svg/utils/vektor.svg';
import { useSelector } from 'react-redux';
import  {selectIsLoggedIn, selectUserName }  from '../../redux/auth/authSelectors.js';
import { logoutUser } from '../../redux/auth/authOperation.js';
import { useDispatch } from 'react-redux';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Navigation = () => {
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const navigate = useNavigate();
    const location = useLocation();
    const isDiaryOrCalculator = location.pathname === '/diary' || location.pathname === '/calculator';

    const handleLogout = () => {
        dispatch(logoutUser())
            .unwrap()
            .then(() => {
                navigate('/');
            });
    };
    
    return (
        <header className={style.header}>
            <div className={style.leftSection}>
                <div className={style.logoContainer}>
                    <Logo />
                    <img src={vektor} alt="logo" className={style.logo} />
                </div>
                <div className={style.mainNav}>
                    {isLoggedIn ? (
                        <div className={style.navLinks}>
                            <NavLink 
                                to='/diary' 
                                className={({isActive}) => isActive ? `${style.navLink} ${style.active}` : style.navLink}
                            >
                                Diary
                            </NavLink>
                            <NavLink 
                                to='/calculator' 
                                className={({isActive}) => isActive ? `${style.navLink} ${style.active}` : style.navLink}
                            >
                                Calculator
                            </NavLink>
                        </div>
                    ) : (
                        <div className={style.authLinks}>
                            <NavLink 
                                to='/register' 
                                className={({isActive}) => isActive ? `${style.navLink} ${style.active}` : style.navLink}
                            >
                                REGISTRATION
                            </NavLink>
                            <NavLink 
                                to='/login' 
                                className={({isActive}) => isActive ? `${style.navLink} ${style.active}` : style.navLink}
                            >
                                LOG IN
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
            
            <div className={style.rightSection}>
                {(isLoggedIn || isDiaryOrCalculator) && userName && (
                    <div className={style.userInfo}>
                        <p className={style.userName}>{userName}</p>
                        <button onClick={handleLogout} className={style.logout}>Logout</button>
                    </div>
                )}
                <div className={style.themeSwitcherContainer}>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}

export default Navigation;