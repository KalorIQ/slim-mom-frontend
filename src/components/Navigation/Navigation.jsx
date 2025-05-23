import style from './Navigation.module.css';
import Logo from '../Logo/Logo.jsx';
import {useNavigate, NavLink } from 'react-router';
import vektor from '../../assets/svg/utils/vektor.svg';
import { useSelector } from 'react-redux';
import  {selectIsLoggedIn, selectUserName }  from '../../redux/auth/authSelectors.js';
import { logoutUser } from '../../redux/auth/authOperation.js';
import { useDispatch } from 'react-redux';


const Navigation = () => {
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('Logout button clicked');
        dispatch(logoutUser())
            .unwrap()
            .then(() => {
                navigate('/');
            });
            console.log('Logout function called');
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
                            <NavLink to='/diary' className={style.navLink}>Diary</NavLink>
                            <NavLink to='/calculator' className={style.navLink}>Calculator</NavLink>
                        </div>
                    ) : (
                        <div className={style.authLinks}>
                            <NavLink to='/register' className={style.navLink}>REGISTRATION</NavLink>
                            <NavLink to='/login' className={style.navLink}>LOG IN</NavLink>
                        </div>
                    )}
                </div>
            </div>
            
            {isLoggedIn && (
                <div className={style.userInfo}>
                    <p className={style.userName}>{userName}</p>
                    <button onClick={handleLogout} className={style.logout}>Logout</button>
                </div>
            )}
        </header>
    )
}

export default Navigation;